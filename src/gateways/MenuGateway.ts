import Database, { Row } from "../lib/Database";
import Menu from "../models/Menu";
import MenuItem from "../models/MenuItem";
import MenuItemGateway from "./MenuItemGateway";

export default class MenuGateway implements IMenuGateway {
	private _database: Database;
	private _menuItemGateway: IMenuItemGateway;

	constructor(database: Database, menuItemGateway: IMenuItemGateway) {
		this._database = database;
		this._menuItemGateway = menuItemGateway;
	}

	menu_from_row(row: Row, items: Array<MenuItem> = []): Menu | undefined {
		if (!row) {
			return undefined;
		}

		return new Menu(row["id"], row["title"], row["description"], items);
	}

	async get(id: number): Promise<Menu | undefined> {
		const row = await this._database.get("SELECT * FROM menus WHERE id=?", [id]);
		const items = row ? await this._menuItemGateway.get_by_menu(id) : [];
		return this.menu_from_row(row, items);
	}

	async list(): Promise<Menu[]> {
		const rows = await this._database.all("SELECT * FROM menus");
		return Promise.all(
			rows.map(
				async (row) =>
					this.menu_from_row(
						row,
						row && row["id"] ? await this._menuItemGateway.get_by_menu(row["id"]) : []
					) as Menu
			)
		);
	}

	async add(menu: Menu): Promise<void> {
		await this._database.run("INSERT INTO menus (title, description) VALUES (?, ?)", menu.title, menu.description);
	}

	async save(item: Menu): Promise<void> {
		if (!item.id) {
			await this.add(item);
		} else {
			await this.update(item);
		}
	}

	async update(item: Menu): Promise<void> {
		await this._database.run(
			"UPDATE menus SET title = ?, description = ? WHERE id = ?",
			item.title,
			item.description,
			item.id
		);
	}
}