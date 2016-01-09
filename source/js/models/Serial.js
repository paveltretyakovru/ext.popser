'use strict';

import Backbone from 'backbone';

class Serial extends Backbone.Model{
	constructor( options ){
		super( options );
	}

	get defaults(){
		return {
			title 	: 'Сериал без названия' ,
			current : false ,
			link 	: '' ,
			season 	: 0 ,
			serie 	: 0
		}
	}

	get urlRoot(){
		return 'http://back.popser.app/serial'
	}
}

export default Serial;