import { GoogleGenerativeAI } from "@google/generative-ai"
import { GoogleAIFileManager } from "@google/generative-ai/server"

import { geminiApiConfig } from "@/infra/config/geminiApiConfig"
import FileService from "@/domains/shared/services/FileService"
import {Buffer} from "buffer";

class GeminiApiService {
	private readonly genAI = new GoogleGenerativeAI(geminiApiConfig.apiKey)
	private readonly prompt = "Analyze the provided image and extract the numeric value from the meter reading. The image shows a water or gas meter. Ensure to accurately identify the measurement from the image. Provide the extracted value in the response (value in cubic meters). Very important: show only numbers)"
	private readonly googleGenerativeModel = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
	private readonly googleFileManager = new GoogleAIFileManager(geminiApiConfig.apiKey)

	async analyzeImageBase64(input: {
		image: string
		mimeType: string
	}): Promise<number> {
		try {
			const generatedContent = await this.googleGenerativeModel.generateContent([
				this.prompt,
				{
					inlineData: {
						data: input.image,
						mimeType: input.mimeType
					}
				}
			])

			const imageValue = Math.round(Number(generatedContent.response.text()))

			if (!imageValue) {
				throw new Error("The image does not contain any meter reading.")
			}

			return imageValue
		} catch (error) {
			console.error(error)

			throw Error("The service is temporarily unavailable. This may be due to maintenance, high load, or internal server issues. Please try again later or contact support if the problem persists.")
		}
	}

	async uploadImage (filePath: string, fileName: string): Promise<{
		uri: string
		mimeType: string
	}> {
		try {
			const uploadResponse = await this.googleFileManager.uploadFile(filePath, {
				mimeType: FileService.getFileType(filePath),
				name: fileName
			})

			return {
				uri: uploadResponse.file.uri,
				mimeType: uploadResponse.file.mimeType
			}
		} catch (error) {
			console.error(error)

			throw Error("The service is temporarily unavailable. This may be due to maintenance, high load, or internal server issues. Please try again later or contact support if the problem persists.")
		}
	}
}

export default new GeminiApiService()