'use strict';

import $ 			from 'jquery';
import Backbone 	from 'backbone';
import Template 	from '../../hbs/serials.hbs';
import template 	from '../modules/template';
import Collection 	from '../collections/Serials';
import SerialsModel from '../models/Serials';

var tmpdata = [
	{ id : 1 , title : 'First title' , current : false , season : 0 , series : 0 } ,
	{ id : 2 , title : 'Second title', current : false , season : 0 , series : 0 } ,
	{ id : 3 , title : 'Ночь живых мертвецов', current : false , season : 0 , series : 0 } ,
	{ id : 4 , title : 'Four title', current : false , season : 0 , series : 0 } 	,
	{ id : 5 , title : 'Five title', current : false , season : 0 , series : 0 }	,
	{ id : 6 , title : 'Ходячие мертвецы', current : false , season : 0 , series : 0 }
];

class Serials extends Backbone.View{
	constructor( options ){
		super({
			el 			: '.js-serials-list' ,
			events 		: {
				'click .js-add-new-serial'	: 'createNewSerial' ,
				'click .js-serials-element'	: 'selectSerial'
			} ,
			model 		: new SerialsModel() ,
		});

		// Init vars
		this.app 				= options.app;
		this.template 			= template( Template );
		this.SerialsCollection 	= new Collection( tmpdata );
		
		// Init listeners
		this.listenTo( this.SerialsCollection , 'add' , this.addModel )
	}

	render(){
		// Fill model
		this.model.set( 'collection' , this.SerialsCollection.toJSON() );
		
		this.$el.html( this.template( this.model.toJSON() ) );
		return this;
	}

	/**
	 * Снимает параметр current (текущий сериал) с текущей current модели
	 * @return {void}
	 */
	clearCurrent(){
		let model = this.SerialsCollection.findWhere({ current : true });
		if( model ){
			model.set('current' , false);
		}
	}

	selectSerial( event ){
		this.clearCurrent();

		let index 	= $( event.currentTarget ).attr('data-index'); 
		let model 	= this.SerialsCollection.at( index );

		model.set( 'current' , true );
		
		this.trigger('serialSelected' , { model : model } );
		this.render();
	}

	addModel( model , collection , options ){
		this.render();
	}

	createNewSerial( event ){
		this.SerialsCollection.add( { title : "Сериал без названия" } );
	}

}

export default Serials;