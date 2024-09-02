import EncryptService from "@/domains/shared/services/EncryptService"

class FIleUrlService {
	createSecureFileUrl (input: {
		filePath: string,
		fileName: string
	}) {
		const secureFileUrl = `http://localhost:7082/${input.filePath}`

		return secureFileUrl
	}
}

export default new FIleUrlService()