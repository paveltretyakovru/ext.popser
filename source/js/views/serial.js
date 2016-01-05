'use strict';

import $ 				from 'jquery';
import _ 				from 'underscore';
import Backbone 		from 'backbone';
import TemplateSerial 	from '../../hbs/serial.hbs';
import template 		from '../modules/template';

class Serial extends Backbone.View{
	constructor( options ){
		super({
			 el : '.js-serial'
		});

		this.app 		= options.app;
		this.model 		= this.app.model;
		this.template 	= template( TemplateSerial );
	}

	render( options ){
		this.$el.html( this.template( options.model.toJSON() ) );

		return this;
	}
};

export default Serial;