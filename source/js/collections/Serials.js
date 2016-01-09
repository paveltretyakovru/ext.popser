'use strict';

import Backbone from 'backbone';
import Serial 	from '../models/Serial';

class Serials extends Backbone.Collection{
	constructor( options ){
		super( options );

		this.model = Serial;
	}

	get url(){
		return 'http://back.popser.app/serial'
	}
}

export default Serials;