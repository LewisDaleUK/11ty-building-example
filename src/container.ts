import path from 'path';

import Database from './lib/Database';
import MenuGateway from "./gateways/MenuGateway";
import Sqlite3 from 'sqlite3';
import MenuItemGateway from './gateways/MenuItemGateway';
import Build from './usecases/Build';

type DiFn<T> = (() => T);

const getDbInstance: DiFn<Sqlite3.Database> = () => new Sqlite3.Database('app.db');
const getDatabase: DiFn<Database> = () => new Database(getDbInstance());
const getMenuGateway: DiFn<IMenuGateway> = () => new MenuGateway(getDatabase(), getMenuItemGateway());
const getMenuItemGateway: DiFn<IMenuItemGateway> = () => new MenuItemGateway(getDatabase());
const getBuilder: DiFn<Build> = () => new Build(getConfig());
const getConfig: DiFn<ApplicationConfig> = () => {

	return ({
		rootDir: process.env.ELEVENTY_ROOT_DIRECTORY || '',
		buildDir: path.join(process.env.ELEVENTY_ROOT_DIRECTORY || '', process.env.ELEVENT_SRC_DIRECTORY || "src"),
		outputDir: path.join(process.env.ELEVENTY_ROOT_DIRECTORY || '', process.env.ELEVENT_OUTPUT_DIRECTORY || "_site"),
		configPath: path.join(process.env.ELEVENTY_ROOT_DIRECTORY || '', process.env.ELEVENTY_CONFIG_FILE || ".eleventy.js")
	});
};

export default Object.freeze({
	getMenuGateway,
	getDatabase,
	getMenuItemGateway,
	getDbInstance,
	getBuilder,
	getConfig,
});