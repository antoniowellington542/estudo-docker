import jwt from "jsonwebtoken"

class EncryptService {
	private secretKey = "shopper"
	generateTemporaryToken (filePath: string, expireInSeconds: number = 5) {
		return jwt.sign({ filePath },
			this.secretKey,
			{
				expiresIn: expireInSeconds,
				algorithm: "HS256"
			})
	}

	decrypt (token: string) {
		return jwt.verify(token, this.secretKey)
	}
}

export default new EncryptService()