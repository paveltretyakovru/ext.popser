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

gulp.task('move-popup-html' , () => {
	console.log('Move index-html task!');

	gulp.src( dest.from.html + 'popup.html' )
		.pipe( gulp.dest( dest.to.html ) );
});

gulp.task('move-app-js' , () => {
	console.log('Move app.js task');

	gulp.src( dest.from.js + 'app.js' )
		.pipe( gulp.dest( dest.to.js ) );
});

gulp.task('move-manifest-json' , () => {
	console.log('Move manifest task');

	gulp.src( dest.from.manifest )
		.pipe( gulp.dest( dest.to.manifest ) );
});

gulp.task('move-images' , () => {
	console.log('Move images task');

	gulp.src( dest.from.images + '**/*.*' )
		.pipe( gulp.dest( dest.to.images ) );
});

gulp.task('ext-chrome:watch' , () => {
	gulp.watch( dest.from.html 	+ 'popup.html' 	, [ 'move-popup-html' ] );
	gulp.watch( dest.from.js 	+ 'app.js' 		, [ 'move-app-js' ] 	);
});

gulp.task('make-ext-chrome' , ['move-popup-html' , 'move-app-js' , 'move-manifest-json' , 'move-images' ]);