import { type Config } from "prettier";

export default <Config> {
	useTabs: true,
	tabWidth: 4,
	printWidth: 200,
	trailingComma: "es5",

	overrides: [
		{
			files: "*.{yml,yaml}",
			options: {
				useTabs: false,
				tabWidth: 2,
			},
		},
	],
};
