class RequestValidatorService {
	validate<T extends object> (body: T, requiredParams: (keyof T)[]): {
		isValid: boolean
		errors: string[]
	} {
		const errors = this.validateRequiredParams(body, requiredParams)

		return {
			isValid: errors.length === 0,
			errors
		}
	}

	validateRequiredParams <T extends object> (body: T, requiredParams: (keyof T)[]): string[] {
		const errors: string[] = []

		requiredParams.forEach(key => {
			if (body[key] === undefined || body[key] === null || body[key] === '') {
				errors.push(`Parameter ${key} was not provided.`)
			}

			if (typeof body[key] !== typeof key) {
				errors.push(`Parameter ${key} incorrect format.`)
			}
		})

		return errors
	}
}

export default new RequestValidatorService()