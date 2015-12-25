'use strict';

// Import frameworks and plugins
import $ 			from 'jquery';
import Backbone 	from 'backbone';
// Import routes
import Home 		from '../routes/home';
// Import models
import User 		from '../models/User';
// Import functions
import { getCookie }from '../modules/functions/getcookie';
// Import constants
import { host }		from '../modules/constants';

class Desktop extends Backbone.Router {
	constructor() {
		super();
		
		this.routes = { ''	: 'home' }

		$.get( host + 'test', (json, textStatus) => {
			console.log('Result get: ' , json);

			getCookie( 'mycookie' , ( value ) => {
				if ( value ){
					console.log('Value isset' , value);
				} else {
					console.log( 'Value dont exist!' );
				}
			} );
		});

		super();
	}

	home() { new Home(); }
}

export default Desktop;