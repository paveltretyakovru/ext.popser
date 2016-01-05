'use strict';

import $ 			from 'jquery';
import Backbone 	from 'backbone';
import Template 	from '../../hbs/serials.hbs';
import compile 		from '../modules/compile';
import Collection 	from '../collections/Serials';

var tmpdata = [
	{ id : 1 , title : 'First title' , current : false  } ,
	{ id : 2 , title : 'Second title', current : true } ,
	{ id : 3 , title : 'Thirds title', current : false } ,
	{ id : 4 , title : 'Four title', current : false } 	,
	{ id : 5 , title : 'Five title', current : false }	,
	{ id : 6 , title : 'Ходячие мертвецы', current : false }
];

class Serials extends Backbone.View{
	get template(){return Template;}

	constructor( options ){
		super({
			el 			: '.js-serials-list' ,
			events 		: {
				'click .js-add-new-serial'	: 'createNewSerial' ,
				'click .js-serials-element'	: 'selectSerial'
			}
		});

		this.initOptions( options );
	}

	initOptions( options ){
		this.app 		= options.app;
		this.collection = new Collection( tmpdata );

		this.listenTo( this.collection , 'add' , this.addModel )
	}

	render(){

		let data = {
			collection : this.collection.toJSON()
		}

		console.log('RENDER' , data );

		this.el.innerHTML = compile(this.template , data );

		return this;
	}

	selectSerial( event ){
		let $el = $( event.currentTarget ); 
		$('.js-serials-element.active').removeClass('active');

		$el.addClass('active');
	}

	addModel( model , collection , options ){
		this.render();
	}

	createNewSerial( event ){
		this.collection.add( { title : "Новый сериал" } );
	}

}

export default Serials;