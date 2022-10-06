export {}

declare global {
	interface IGateway<T> {
		async get(id: number): Promise<T | undefined>;
		async list(): Promise<T[]>;
		async add(item: T): Promise<void>;
		async update(item: T): Promise<void>;
		async save(item: T): Promise<void>;
	}

	interface IMenuGateway extends IGateway<Menu> {}

	interface IMenuItemGateway extends IGateway<MenuItem> {
		async get_by_menu(menuId: number): Promise<MenuItem[]>;
	}
}