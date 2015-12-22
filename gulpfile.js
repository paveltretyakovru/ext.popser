const gulp = require( 'gulp' ); 

require( './tasks/es6'	);
require( './tasks/haml' );

gulp.task( 'default' , [ 'es6' , 'haml' ] );