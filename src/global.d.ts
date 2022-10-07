export {};

declare global {
	type ApplicationConfig = {
		rootDir?: string,
		buildDir?: string,
		outputDir?: string,
		configPath?: string,
	};
}