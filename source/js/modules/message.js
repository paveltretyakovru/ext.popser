'use strict';

import $ from 'jquery';

let Message = ( options ) => {
	let $block 		= $('.message');
	let class_error = 'alert alert-danger';
	
	function insertResponse( clear ){
		let messages = options.responseJSON;

		if ( clear ){ $block.empty(); }

		for( let mes in options.responseJSON ){
			$block.append( messages[ mes ] + '<br />' );
		}

	}

	switch ( options.status ){
		case 422:
			$block.addClass( class_error );
			insertResponse( true );
	}
}

export default Message;