export default class MenuItem {
	id?: number;
	name?: string;
	description?: string;
	price?: number;
	menuId?: number;

	constructor(
		id?: number,
		name?: string,
		description?: string,
		price?: number,
		menuId?: number
	) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.price = price;
		this.menuId = menuId;
	}

}