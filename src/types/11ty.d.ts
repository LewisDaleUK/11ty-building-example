declare module '@11ty/eleventy' {
	type CollectionItem = {
		[key: string]: any,
	};

	type FilterFn = (name: string, fn: (...args: any[]) => any) => void;
	type PairedFn = (name: string, fn: (content: string, ...args: any[]) => any) => void;
	type Plugin = (fn: (config: EleventyConfig) => void, options?: Object) => void;

	type CollectionApi = {
		getAll: () => CollectionItem[],
		getAllSorted: () => CollectionItem[],
		getFilteredByTag: (tagName: string) => CollectionItem[],
		getFilteredByTags: (...tagsNames: string[]) => CollectionItem[],
		getFilteredByGlob: (glob: string) => CollectionItem[],
	};

	type EleventyConfig = {
		dir: {
			input?: string = ".",
			includes?: string = "_includes",
			layouts?: string = "_includes",
			data?: string = "_data",
			output?: string = "_site",
		},
		dataTemplateEngine?: string = "liquid",
		htmlTemplateEngine?: string = "liquid",
		templateFormats?: string[] = ["html","liquid","ejs","md","hbs","mustache","haml","pug","njk","11ty.js"],
		pathPrefix?: string = "/",
		htmlOutputSuffix?: string = "-o",
		jsDataFileSuffix?: string = ".11tydata",
		transforms?: object = {},
		
		setTemplateFormats: (formats: string | string[]) => void,
		setQuietMode: (mode: boolean) => void,
		addTransform: (content: string) => string,
		addLinter: (content: string) => void,

		addLiquidFilter: FilterFn,
		addNunjucksFilter: FilterFn,
		addHandlebarsHelper: FilterFn,
		addJavascriptFunction: FilterFn,
		addFilter: FilterFn,
		addAsyncFilter: FilterFn,

		addLiquidShortcode: FilterFn,
		addNunjucksShortcode: FilterFn,
		addHandlebarsShortcode: FilterFn,
		addShortcode: FilterFn,

		addPairedLiquidShortcode: FilterFn,
		addPairedNunjucksShortcode: FilterFn,
		addPairedHandlebarsShortcode: FilterFn,
		addPairedShortcode: PairedFn;

		addCollection: (name: string, fn: (collectionApi: CollectionApi) => any[]) => void, 

		namespace: (namespace: string, fn: Plugin) => void,
		addPlugin: Plugin,
		addGlobalData: (key: string, data: any) => void,
		addPassthroughCopy: (file: string | Object) => void,
	};

	type EleventyBuildOptions = {
		quietMode?: boolean = false,
		configPath?: string = ".eleventy.js",
		config?: (eleventyConfig: EleventyConfig) => void,
	};

	export default class Eleventy {
		constructor(input: String = ".", output: String = "_site", options: EleventyBuildOptions = {});
		async write(): Promise<void>;
	}
}

