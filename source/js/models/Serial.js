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
			link 	: 'Ссылка не указана'
		}
	}
}

export default Serial;