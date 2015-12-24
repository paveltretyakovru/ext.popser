const gulp 			= require( 'gulp' 			);
const browserify 	= require( 'browserify');
const babelify 		= require( 'babelify' );
const source 		= require( 'vinyl-source-stream' );

const dest 	= {

	from: {
		js 	: 'source/js/**/*.js' ,
		app : 'source/js/app.js'
	} ,

	to 	: {
		app : 'public/js/'
	}

}

gulp.task( 'es6:compile' , () => {
	return browserify( { entries : dest.from.app , debug: true } )
    	.transform(babelify)
        .bundle()
        .pipe( source('app.js') )
        .pipe(gulp.dest( dest.to.app ));
} );

gulp.task( 'es6:watch' , () => {
	gulp.watch( dest.from.js , [ 'es6:compile']);
});

gulp.task( 'es6' , [ 'es6:compile' ] );