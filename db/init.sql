CREATE TABLE IF NOT EXISTS menus (
	id INTEGER PRIMARY KEY,
	title TEXT NOT NULL,
	description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS menu_items (
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL,
	description TEXT NOT NULL,
	price REAL NOT NULL,
	menu_id INTEGER NOT NULL,
	FOREIGN KEY(menu_id) REFERENCES menus(id)
);