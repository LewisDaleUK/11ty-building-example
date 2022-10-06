import MenuItem from "./MenuItem";

export default class Menu {
	id?: number;
	title?: string;
	description?: string;
	items?: Array<MenuItem>;

	constructor(
		id?: number,
		title?: string,
		description?: string,
		items: Array<MenuItem> = []
	) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.items = items;
	}
}