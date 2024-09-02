import { BaseModelCreationParams } from "@/domains/shared/protocols/DatabaseProtocol"

export type BaseMeasure = {
	type: "WATER" | "GAS"
	confirmed: boolean
	customer_code: string
	image_url: string
	image_value: number
}

export type MeasureParams = BaseModelCreationParams & BaseMeasure

export type MeasureUploadBody = {
	image: string
	customer_code: string
	measure_datetime: Date
	"measure_type": BaseMeasure["type"]
	image_value: number
}

export type MeasureUploadResponse = {
	image_url: string
	measure_value: number
	measure_uuid: number
}