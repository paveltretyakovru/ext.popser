'use strict';

import Backbone from 'backbone';

class Serial extends Backbone.Model{
	constructor( options ){
		super( options );
	}

	get defaults(){
		return {
			title 	: 'Сериал без названия' ,
			current : false
		}
	}
}

export default Serial;