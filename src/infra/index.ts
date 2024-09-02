import Server from "@/infra/server"
import Database from "@/infra/database"

class Infra {
	private server: Server
	static database: Database

	constructor() {
		this.server = new Server()
		Infra.database = new Database()
	}

	async boot () {
		await Infra.database.start()
		await this.server.start()
	}
}

export default new Infra()