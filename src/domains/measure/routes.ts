import { Router } from "express"
import MeasureController from "@/domains/measure/controllers/MeasureController"

const MeasureRoutes = Router()

MeasureRoutes.post(
	"/upload",
	MeasureController.upload
)

MeasureRoutes.get(
	"/validate-token",
	MeasureController.accessImage
)

export default MeasureRoutes