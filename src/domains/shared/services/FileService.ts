import fs from "fs"
import path from "path"

import mime from "mime-types"
import { Buffer } from "buffer";
import { v4 as uuidV4 } from "uuid"

class FileService {
	saveFile (fileBuffer: Buffer, directory: string, file: string): string {
		const folderPath = path.join("tmp", directory)

		if (!fs.existsSync(folderPath)) {
			fs.mkdirSync(folderPath, { recursive: true })
		}

		const filePath = path.join(folderPath, file)

		fs.writeFile(filePath, fileBuffer, (error) => {
			if (error) {
				console.error("Failed in save file:", error)
			} else {
				console.log ("Save file with success!")
			}
		})

		return filePath
	}

	getFileType(filePath: string): string {
		const mimeType = mime.lookup(filePath)

		if (!mimeType) {
			return
		}

		return mimeType
	}

	mountMimeTypeByBase64Image (image: string) {
		const fileName = uuidV4()

		const matches = image.match(/^data:(image\/\w+);base64,/)

		if (!matches) {
			throw new Error("Invalid Base64 file")
		}

		const fileExtension = matches[1]?.split('/')[1]

		return `${fileName}.${fileExtension}`
	}

	getBase64ImageData (image: string): string {
		const base64Data = image.split(",")[1]

		return base64Data
	}

	validateBase64Data (base64Data: string): boolean {
		const base64Regex = /^[A-Za-z0-9+/]+={0,2}$/

		const isValidBase64Data = base64Regex.test(base64Data) && (base64Data.length % 4 === 0)

		return isValidBase64Data
	}
}

export default new FileService()