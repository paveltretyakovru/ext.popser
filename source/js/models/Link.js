'use strict';

import Backbone from 'backbone';

class Link extends Backbone.Model{
	constructor( options ){
		super( options );
	}

	get urlRoot(){
		return 'http://back.popser.app/link'
	}
}

export default Link;