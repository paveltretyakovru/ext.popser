'use strict';

import $ from 'jquery';

export let HideMessage = () => {
	let $block 		= $('.message');

	setTimeout( () => {
		$block.hide('500');
	}, 1000 );
}

export let Message = ( options ) => {
	let $block 		= $('.message');
	let class_error = 'alert alert-danger';
	
	function insertResponse( clear ){
		let messages = options.responseJSON;

		if ( clear ){ $block.empty(); }

		for( let mes in options.responseJSON ){
			$block.append( messages[ mes ] + '<br />' );
			$block.show( 500 );
		}

	}

	switch ( options.status ){
		case 422:
			$block.addClass( class_error );
			insertResponse( true );
	}
}