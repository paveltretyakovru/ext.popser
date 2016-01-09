'use strict';

import Backbone from 'backbone';

class Serial extends Backbone.Model{
	constructor( options ){

		options['_token'] = app.token;
		super( options );
	}

	get defaults(){
		return {
			title 	: 'Сериал без названия' ,
			current : false ,
			link 	: '' ,
			season 	: 0 ,
			series 	: 0
		}
	}

	get url(){
		return 'http://back.popser.app/serial'
	}
}

export default Serial;