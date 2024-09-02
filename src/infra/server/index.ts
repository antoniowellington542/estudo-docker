import Express from "express"
import { createServer } from "http"

import MeasureRoutes from "@/domains/measure/routes"
class Server {
	private app = Express()
	private server = createServer(this.app)

	async start () {
		this.app.use(Express.json())
		this.app.use(MeasureRoutes)

		this.server.listen(3333, () => {
			console.log("Server running in Port 3333!")
		})
	}
}

export default Server