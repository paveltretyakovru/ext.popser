/**
 * Задачи для сборки расширения для Chrome
 * Файлы собираются в каталог: extension/chrome
 * Расширение пересобирается при изменении app.js и haml файлов
 */

const gulp = require( 'gulp' );

const dest = {
	from : {
		html 	: 'public/html/',
		js 		: 'public/js/'	,
		images 	: 'public/images/' ,
		manifest: 'source/json/manifest.json'
	} ,

	to 	: {
		html 	: 'extension/chrome/' ,
		js  	: 'extension/chrome/js/' ,
		images 	: 'extension/chrome/images/' ,
		manifest: 'extension/chrome/'
	}
}

// Задача для перемещения HTML файлов
gulp.task('move-popup-html' , () => {
	console.log('Move index-html task!');

	gulp.src( dest.from.html + 'popup.html' )
		.pipe( gulp.dest( dest.to.html ) );
});

// Задача для перемещения главного скрипта приложения
gulp.task('move-app-js' , () => {
	console.log('Move app.js task');

	gulp.src( dest.from.js + 'app.js' )
		.pipe( gulp.dest( dest.to.js ) );

	// А так же его карты
	gulp.src( dest.from.js + 'app.js.map' )
		.pipe( gulp.dest( dest.to.js ) );
});

// Задача переносит JSON файлы
gulp.task('move-manifest-json' , () => {
	console.log('Move manifest task');

	gulp.src( dest.from.manifest )
		.pipe( gulp.dest( dest.to.manifest ) );
});

// Задача переноси изображения для работы расширения
gulp.task('move-images' , () => {
	console.log('Move images task');

	gulp.src( dest.from.images + '**/*.*' )
		.pipe( gulp.dest( dest.to.images ) );
});

// Задача следит за изменниями файлов
gulp.task('ext-chrome:watch' , () => {
	gulp.watch( dest.from.html 	+ 'popup.html' 	, [ 'move-popup-html' 		] );
	gulp.watch( dest.from.js 	+ 'app.js' 		, [ 'move-app-js' 			] );
	gulp.watch( dest.from.manifest 				, [ 'move-manifest-json' 	] );
});

gulp.task('make-ext-chrome' , ['move-popup-html' , 'move-app-js' , 'move-manifest-json' , 'move-images' ]);