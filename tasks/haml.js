const gulp = require( 'gulp' 			);
const haml = require( 'gulp-ruby-haml'	);

require('./make-ext-chrome');

const dest = { from : { source : 'source/haml/**/*.haml' } , to	: { public : 'public/html' } }

gulp.task ( 'haml:compile' , () => {
	return gulp.src( dest.from.source )
		.pipe( haml() )
		.pipe( gulp.dest( dest.to.public ) );
});

gulp.task( 'haml:watch' , () => {
	gulp.watch( dest.from.source , [ 'haml:compile' ] );
});

gulp.task ( 'haml' , [ 'haml:compile' ] );