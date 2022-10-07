import Eleventy, { CollectionItem } from '@11ty/eleventy';
import path from 'path';

import Menu from "../models/Menu";

export default class Build {
	private _config: ApplicationConfig;

	constructor(config: ApplicationConfig) {
		this._config = config;
	}

	async execute(menus: Menu[]) {
		const eleventy = new Eleventy(
			this._config.buildDir,
			this._config.outputDir, {
			configPath: this._config.configPath,
			config: (eleventyConfig) => {
				let addPassthrough = eleventyConfig.addPassthroughCopy.bind(eleventyConfig);
				eleventyConfig.addPassthroughCopy = (file) => {
					if (typeof file === "string") {
						console.log(path.join(this._config.rootDir || "", file as string));

						const filePath = {
							[path.join(this._config.rootDir || "", file as string)]: file as string
						}
						return addPassthrough(filePath);
					}
					return addPassthrough(file);
				}
				
				eleventyConfig.addGlobalData("menus", () => {
					return menus as CollectionItem[];
				});

				return {};
			}
		});

		await eleventy.write();
	}
}