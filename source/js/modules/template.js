'use strict';

import Handlebars from 'handlebars';

export default function template( value ){
	return Handlebars.compile( value );
}