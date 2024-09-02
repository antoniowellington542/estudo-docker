import { Sequelize, Options } from "sequelize"
import { MeasureModel } from "@/domains/measure/models/MeasureModel"
class Database {
	private postgres: Sequelize

	async start () {
		try {
			await this.startPostgresConnection()
			await this.testPostgresConnection()
			await this.setupPostgresModels()
		} catch (error) {
			console.error(error)
		}
	}

	async startPostgresConnection () {
		try {
			const options = this.getOptions()

			this.postgres = new Sequelize(options)
		} catch (error) {
			console.error(error)
		}
	}

	async testPostgresConnection () {
		try {
			await this.postgres.authenticate()
			console.log("Postgres connection has been established succesfully.")
		} catch (error) {
			console.error('Unable to connect to the database:', error)
		}
	}

	private setupPostgresModels (): void {
		MeasureModel.define(this.postgres)
	}

	private getOptions (): Options {
		return {
			port: 5433,
			database: "shopper",
			username: "admin",
			password: "123",
			host: "localhost",
			dialect: "postgres",
			logging: false,
			define: {
				createdAt: "created_at",
				updatedAt: "updated_at",
				timestamps: true
			}
		}
	}
}

export default Database