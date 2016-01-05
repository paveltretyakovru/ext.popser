'use strict';

import $ 				from 'jquery';
import _ 				from 'underscore';
import Backbone 		from 'backbone';
import TemplateSerial 	from '../../hbs/serial.hbs';
import template 		from '../modules/template';

class Serial extends Backbone.View{
	constructor(){
		super({
			template : template( TemplateSerial )
		});
	}

	render(){
		this.$el.html( this.template( this.model.toJSON() ) );

		return this;
	}
};

export default Serial;