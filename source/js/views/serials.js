'use strict';

import $ 			from 'jquery';
import Backbone 	from 'backbone';
import rivets 			from 'rivets';
import rivets_backbone	from 'rivets-backbone-adapter';

import Template 	from '../../hbs/serials.hbs';
import Collection 	from '../collections/Serials';
import SerialsModel from '../models/Serials';
import SerialModel 	from '../models/Serial';


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
		this.SerialsCollection 	= new Collection( tmpdata );

		// Init listener
		this.listenTo( this.SerialsCollection , 'add' , this.addedModelToCollection );
	}

	render(){
		this.$el.html( Template );
		this.model.set( 'collection' , this.SerialsCollection );
		this.binding = rivets.bind( this.el , { model : this.model } );
		
		return this;
	}

	/**
	 * Снимает параметр current (текущий сериал) с текущей current модели
	 * @return {void} приводит к снятию выделения со списка сериалов пользователя
	 */
	clearCurrent(){
		let model = this.SerialsCollection.findWhere({ current : true });
		if( model ){
			model.set('current' , false);
		}
	}

	selectSerial( event ){
		this.clearCurrent();

		let index 	= $( event.currentTarget ).attr('data-cid'); 
		let model 	= this.SerialsCollection.get( index );

		model.set( 'current' , true );
		this.trigger('serialSelected' , { model : model } );
	
	}

	createNewSerial( event ){
		this.SerialsCollection.add({ });
	}

	addedModelToCollection( model , collection , options ){
		this.clearCurrent();
		model.set( 'current' , true );
		this.trigger('serialSelected' , { model : model } );
	}

}

export default Serials;