'use strict';

import Backbone from 'backbone';
import Link 	from '../models/Link';

class Links extends Backbone.Collection{
	constructor( options ){
		super( options );

		this.model = Link;
	}

	get url(){
		return 'http://back.popser.app/link'
	}
}

export default Links;