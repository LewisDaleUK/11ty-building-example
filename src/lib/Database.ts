import Sqlite3 from "sqlite3";

export type Row = {[key: string]: any} | undefined;

export default class Database {
	private _dbInstance: Sqlite3.Database;

	constructor(dbInstance: Sqlite3.Database) {
		this._dbInstance = dbInstance;
	}

	all(query: string, ...params: any[]): Promise<Array<Row>> {
		return new Promise((resolve, reject) => {
			this._dbInstance.all(query, params, (err, rows) => {
				if (err) {
					reject(err);
				} else {
					resolve(rows);
				}
			});
		});
	}

	get(query: string, ...params: any[]): Promise<Row> {
		return new Promise((resolve, reject) => {
			this._dbInstance.get(query, params, (err, row) => {
				if (err) {
					reject(err);
				} else {
					resolve(row);
				}
			});
		});
	}
}