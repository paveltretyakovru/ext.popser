'use strict';

import Backbone 	from 'backbone';
import Template 	from '../../hbs/serials.hbs';
import compile 		from '../modules/compile';
import Collection 	from '../collections/Serials';

var tmpdata = [
	{ id : 1 , title : 'First title'  } ,
	{ id : 2 , title : 'Second title' } ,
	{ id : 3 , title : 'Thirds title' } ,
	{ id : 4 , title : 'Four title' } 	,
	{ id : 5 , title : 'Five title' }	,
	{ id : 6 , title : 'Ходячие мертвецы' }
];

class Serials extends Backbone.View{
	get el() 		{ return '.js-serials-list'; }
	get template()	{ return Template; }

	constructor( options ){
		super();

		this.initOptions( options );
	}

	initOptions( options ){
		this.app 		= options.app;
		this.collection = new Collection( tmpdata );
	}

	get render(){return ()=>{
		let data = {
			collection : this.collection.toJSON()
		}
		document.querySelectorAll(this.el)[0].innerHTML = compile(this.template , data );
	};}
}

export default Serials;