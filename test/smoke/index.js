const path = require("path");
const webpack = require("webpack");
const rimaraf = require("rimraf");
const Mocha = require("mocha");
const mocha = new Mocha();
// process.chdir(path.join(__dirname, "../../"));
rimaraf("./dist", () => {
	const prodConfig = require("../../webpack.config.js"); // webpack config;
	webpack(prodConfig, (err, stats) => {
		if (err) {
			console.error(err.stack || err);
			if (err.details) {
				console.error(err.details);
			}
			return;
		}

		const info = stats.toJson();

		if (stats.hasErrors()) {
			console.error(info.errors);
		}

		if (stats.hasWarnings()) {
			console.warn(info.warnings);
		}
		console.log("开始执行测试用例");
		mocha.addFile(path.join(__dirname, "html-test.js"));
		mocha.addFile(path.join(__dirname, "css-js-test.js"));
		mocha.run();
	});
});
