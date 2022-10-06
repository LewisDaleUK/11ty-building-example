import Database from './lib/Database';
import MenuGateway from "./gateways/MenuGateway";
import Sqlite3 from 'sqlite3';
import MenuItemGateway from './gateways/MenuItemGateway';

type DiFn<T> = (() => T);

const getDbInstance: DiFn<Sqlite3.Database> = () => new Sqlite3.Database('app.db');
const getDatabase: DiFn<Database> = () => new Database(getDbInstance());
const getMenuGateway: DiFn<IMenuGateway> = () => new MenuGateway(getDatabase(), getMenuItemGateway());
const getMenuItemGateway: DiFn<IMenuItemGateway> = () => new MenuItemGateway(getDatabase());

export default Object.freeze({
	getMenuGateway,
	getDatabase,
	getMenuItemGateway,
	getDbInstance
});