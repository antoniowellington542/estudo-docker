import { Response } from "express"
import { Buffer } from "buffer"

class ResponseService {
	ok (response: Response, body?: unknown): Response {
		return response.status(200).json(body)
	}
	created (response: Response, body: any) {
		return response.status(201).json(body)
	}
	badRequest (response: Response, data?: {
		error_code: string
		error_description: string
	}) {
		return response.status(400).json(data)
	}

	forbidden (response: Response, body?: unknown) {
		return response.status(403).json(body)
	}
	notFound (response: Response, body?: unknown) {
		return response.status(404).json(body)
	}

	serverError (response: Response, body?: unknown) {
		return response.status(500).json(body)
	}

	download(response: Response, fileData: Buffer, fileName: string, fileType: string): Response {
		response.writeHead(200, {
			"Content-Disposition": `attachment; filename="${fileName}"`,
			"Content-Type": fileType,
			"Content-Length": fileData.length
		});

		return response.end(fileData);
	}

	redirect (response: Response, url: string): void {
		return response.status(307).redirect(url)
	}
}

export default new ResponseService()