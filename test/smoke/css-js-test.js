const glob = require("glob-all");

describe("Checking html files", () => {
	it("必须生成的css js文件", (done) => {
		const files = glob.sync(["./dist/js/*.js", "./dist/css/*.css"]);
		if (files.length > 0) {
			done();
		} else {
			throw new Error("路径错误");
		}
	});
});
