'use strict';

import Handlebars  from 'handlebars';

export default function compile( html , data ){
	let template = Handlebars.compile( html );
	return template( data );
}