import Database, { Row } from "../lib/Database";
import MenuItem from "../models/MenuItem";

export default class MenuItemGateway implements IMenuItemGateway {
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

	async get_by_menu(menuId: number): Promise<MenuItem[]> {
		const rows = await this._database.all("SELECT * FROM menu_items WHERE menu_id = ?", [menuId]);
		return rows.map(row => this.row_to_menu_item(row) as MenuItem);
	}

	async add(item: MenuItem): Promise<void> {
		
	}

	async list(): Promise<MenuItem[]> {
		const rows = await this._database.all("SELECT * FROM menu_items");
		return rows.map(row => this.row_to_menu_item(row) as MenuItem);
	}

	async save(item: MenuItem): Promise<void> {
		
	}

	async update(item: MenuItem): Promise<void> {
		
	}
}