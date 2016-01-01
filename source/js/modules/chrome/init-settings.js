'use strict';

export var chromeInitSettings = function(){
	console.log( 'Chrome init settings' );

	chrome.fontSettings.setFont({
		genericFamily: 'sansserif', script: 'Cyrl', fontId: 'MS PGothic'
	});
}