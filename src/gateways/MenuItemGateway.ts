import Database, { Row } from "../lib/Database";
import MenuItem from "../models/MenuItem";

export default class MenuItemGateway {
	private _database: Database;

	constructor(database: Database) {
		this._database = database;
	}

	row_to_menu_item(row: Row): MenuItem | undefined {
		if (!row) {
			return undefined;
		}

		return new MenuItem(row["id"], row["name"], row["description"], row["price"], row["menu_id"]);
	}

	async get(id: number): Promise<MenuItem | undefined> {
		return this.row_to_menu_item(
			await this._database.get("SELECT * FROM menu_items WHERE id = ?", [id])
		);
	}

	async get_all_for_menu(menuId: number): Promise<Array<MenuItem>> {
		const rows = await this._database.all("SELECT * FROM menu_items WHERE menu_id = ?", [menuId]);
		return rows.map(row => this.row_to_menu_item(row) as MenuItem);
	}
}