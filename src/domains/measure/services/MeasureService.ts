import MeasureRepository from "@/domains/measure/repositories/MeasureRepository"
import { BaseMeasure } from "@/domains/measure/protocols/MeasureProtocol"
import { ModelOptions } from "sequelize"
import { MeasureModel } from "@/domains/measure/models/MeasureModel"

class MeasureService {
	private repository: typeof MeasureRepository

	constructor(repository: typeof MeasureRepository) {
		this.repository = repository
	}

	async create (data: BaseMeasure, options?: ModelOptions): Promise<MeasureModel> {
		return this.repository.create(data, options)
	}
}

export default new MeasureService(MeasureRepository)