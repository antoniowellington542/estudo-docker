import { ModelOptions, ModelStatic } from "sequelize"

import { MeasureModel } from "@/domains/measure/models/MeasureModel"
import { BaseMeasure } from "@/domains/measure/protocols/MeasureProtocol"

class MeasureRepository {
	private model: ModelStatic<MeasureModel>

	constructor(model: ModelStatic<MeasureModel>) {
		this.model = model
	}

	async create (data: BaseMeasure, options?: ModelOptions): Promise<MeasureModel> {
		return await this.model.create(data, {
			...options
		})
	}
}

export default new MeasureRepository(MeasureModel)