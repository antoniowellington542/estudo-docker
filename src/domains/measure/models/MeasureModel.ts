import {
	Model,
	Sequelize,
	DataTypes
} from "sequelize"
import {
	BaseMeasure,
	MeasureParams
} from "@/domains/measure/protocols/MeasureProtocol"

export class MeasureModel extends Model<MeasureParams, BaseMeasure> implements BaseMeasure {
	id: number

	customer_code: string

	type: MeasureParams["type"]

	confirmed: boolean

	image_url: string

	image_value: number

	created_at: Date

	updated_at: Date

	deleted_at?: Date

	static define (sequelize: Sequelize): void {
		this.init({
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			type: {
				type: DataTypes.STRING,
				allowNull: false
			},
			confirmed: {
				type: DataTypes.BOOLEAN,
				allowNull: false
			},
			customer_code: {
				type: DataTypes.STRING,
				allowNull: false
			},
			image_url: {
				type: DataTypes.STRING,
				allowNull: false
			},
			image_value: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			created_at: {
				type: DataTypes.DATE,
				allowNull: false
			},
			updated_at: {
				type: DataTypes.DATE,
				allowNull: false
			},
			deleted_at: {
				type: DataTypes.DATE,
				allowNull: true
			}
		}, {
			sequelize,
			tableName: "measures"
		})
	}
}