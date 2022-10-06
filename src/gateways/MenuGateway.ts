import Database, { Row } from "../lib/Database";
import Menu from "../models/Menu";
import MenuItem from "../models/MenuItem";
import MenuItemGateway from "./MenuItemGateway";

export default class MenuGateway {
	private _database: Database;
	private _menuItemGateway: MenuItemGateway;

	constructor(database: Database, menuItemGateway: MenuItemGateway) {
		this._database = database;
		this._menuItemGateway = menuItemGateway;
	}

	menu_from_row(row: Row, items: Array<MenuItem> = []): Menu | undefined {
		if (!row) {
			return undefined;
		}

		return new Menu(row["id"], row["title"], row["description"], items);
	}

	async get_menu(id: number): Promise<Menu | undefined> {
		const row = await this._database.get("SELECT * FROM menus WHERE id=?", [id]);
		const items = row ? await this._menuItemGateway.get_all_for_menu(id) : [];
		return this.menu_from_row(row, items);
	}

	async list(): Promise<Menu[]> {
		const rows = await this._database.all("SELECT * FROM menus");
		return Promise.all(
			rows.map(
				async (row) =>
					this.menu_from_row(
						row,
						row && row["id"] ? await this._menuItemGateway.get_all_for_menu(row["id"]) : []
					) as Menu
			)
		);
	}
}