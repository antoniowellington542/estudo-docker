import { Request, Response } from "express"
import { Buffer } from "buffer"

import {
	MeasureUploadBody,
	MeasureUploadResponse
} from "@/domains/measure/protocols/MeasureProtocol"

import ResponseService from "@/domains/shared/services/ResponseService"
import MeasureService from "@/domains/measure/services/MeasureService"
import RequestValidatorService from "@/domains/shared/services/RequestValidatorService"
import GeminiApiService from "@/domains/shared/services/GeminiApiService"
import FileService from "@/domains/shared/services/FileService"
import FIleUrlService from "@/domains/shared/services/FIleUrlService"
import EncryptService from "@/domains/shared/services/EncryptService"

class MeasureController {
	async upload (request: Request, response: Response): Promise<Response> {
		try {
			const measureType = request.body.measure_type
			const base64Image = request.body.image
			const customerCode = request.body.customer_code
			const measureDateTime = new Date(request.body.measure_datetime)

			const {
				isValid,
				errors
			} = RequestValidatorService.validate<MeasureUploadBody>(request.body, [
				"measure_datetime",
				"measure_type",
				"image",
				"customer_code"
			])

			if (!isValid) {
				return ResponseService.badRequest(response, {
					error_code: "INVALID_DATA",
					error_description: errors[0]
				})
			}

			const base64ImageData = FileService.getBase64ImageData(base64Image)
			const isValidBase64ImageData = FileService.validateBase64Data(base64ImageData)

			if (!isValidBase64ImageData) {
				return ResponseService.badRequest(response, {
					error_code: "INVALID_DATA",
					error_description: "base 64 not format!"
				})
			}

			const file = FileService.mountMimeTypeByBase64Image(base64Image)
			const filePath = FileService.saveFile(Buffer.from(base64ImageData), "images", file)

			const secureUrl = FIleUrlService.createSecureFileUrl({
				filePath,
				fileName: file
			})

			const imageValue = await GeminiApiService.analyzeImageBase64({
				image: base64ImageData,
				mimeType: FileService.getFileType(filePath)
			})

			const measure = await MeasureService.create({
				type: measureType,
				image_url: secureUrl,
				customer_code: customerCode,
				confirmed: false,
				image_value: imageValue
			})

			const formattedMeasure: MeasureUploadResponse = {
				measure_uuid: measure.id,
				image_url: measure.image_url,
				measure_value: imageValue
			}

			return ResponseService.created(response, formattedMeasure)
		} catch (error) {
			console.error(error)
			return ResponseService.serverError(response)
		}
	}

	async accessImage (request: Request, response: Response): Promise<Response | void> {
		try {
			const token = request.query.token as string[]

			const decoded = EncryptService.decrypt(token[0])

			// if (!decoded) {
			// 	return ResponseService.badRequest(response)
			// }

			const originalUrl = String(request.headers["x-original-uri"])

			return ResponseService.redirect(response, `/serve_image${originalUrl}`)
		} catch (error) {
			console.error(error)

			return ResponseService.serverError(response)
		}
	}
}

export default new MeasureController()