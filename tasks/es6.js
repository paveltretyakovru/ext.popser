const gulp 			= require( 'gulp' 			);
const babel 		= require( 'gulp-babel' 	);
const concat 		= require( 'gulp-concat' 	);
const sourcemaps 	= require( 'gulp-sourcemaps');

gulp.task( 'es6' , () => {
	console.log('ES6 task');

	return gulp.src('source/js/**/*.js')
		.pipe( sourcemaps.init() )
		.pipe( babel({
			presets : ['es2015']
		}))
		.pipe( concat( 'all.js' ) 		)
		.pipe( sourcemaps.write( '.' ) 	)
		.pipe( gulp.dest('public/js') 	);

});