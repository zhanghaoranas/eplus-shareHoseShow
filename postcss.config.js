module.exports = {
	plugins: {
		'autoprefixer': {},
		'postcss-cssnext': {},
		'postcss-px-to-viewport': {
			unitToConvert: 'px',
			viewportWidth: 750,
			unitPrecision: 5,
			propList: ['*'],
			viewportUnit: 'vw',
			fontViewportUnit: 'vw',
			selectorBlackList: [],
			minPixelValue: 1,
			mediaQuery: false,
			replace: true,
			exclude: [],
			landscape: false,
			landscapeUnit: 'vw',
			landscapeWidth: 1334
		}
	}
}

// postcss-px-to-viewport 文档https://github.com/evrone/postcss-px-to-viewport/blob/HEAD/README_CN.md