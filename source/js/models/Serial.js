'use strict';

import Backbone from 'backbone';

class Serial extends Backbone.Model{
	constructor( options ){
		super( options );
	}

	get defaults(){
		return {
			title 	: '' ,
			current : false
		}
	}
}

export default Serial;