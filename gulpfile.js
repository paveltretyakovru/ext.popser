const gulp = require( 'gulp' );

require( './tasks/es6'				);
require( './tasks/haml'				);
require( './tasks/make-ext-chrome' 	);

gulp.task( 'default' , [ 'es6' , 'haml' ] , () => {

	// После подготовки файлов - собираем расширение для Chrome
	gulp.start( 'make-ext-chrome' );

	// Запускаем отслеживание изменения файлов
	gulp.start( 'es6:watch' );
	gulp.start( 'haml:watch' );	
	gulp.start( 'ext-chrome:watch' );
});