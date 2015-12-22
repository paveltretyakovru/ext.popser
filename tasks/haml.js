const gulp = require( 'gulp' 			);
const haml = require( 'gulp-ruby-haml'	);

gulp.task ( 'haml' , () => {
	console.log('HAML task');

	return gulp.src( 'source/haml/**/*.haml' )
		.pipe( haml() )
		.pipe( gulp.dest( 'public/html' ) );
});