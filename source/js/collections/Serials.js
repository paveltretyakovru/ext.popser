'use strict';

import Backbone from 'backbone';
import Serial 	from '../models/Serial';

class Serials extends Backbone.Collection{
	constructor( options ){
		super( options );

		this.model = Serial;
	}
}

export default Serials;