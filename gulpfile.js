const { series, src, dest, watch } = require('gulp');

const typescript = require('gulp-typescript');
const tsProject = typescript.createProject('tsconfig.json');

function build() {
	const tsResult = tsProject.src().pipe(tsProject());
	return tsResult.js.pipe(dest('./dist'));
}

exports.default = function (cb) {
	build();
	cb();
};

exports.watch = function () {
	// You can use a single task
	watch('src/**/*', build);
};
