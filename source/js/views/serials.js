'use strict';

import $ 			from 'jquery';
import Backbone 	from 'backbone';
import rivets 			from 'rivets';
import rivets_backbone	from 'rivets-backbone-adapter';

import Template 	from '../../hbs/serials.hbs';
import Collection 	from '../collections/Serials';
import SerialsModel from '../models/Serials';
import SerialModel 	from '../models/Serial';

class Serials extends Backbone.View{
	constructor( options ){
		super({
			el 			: '#serials' ,
			events 		: {
				'click .js-add-new-serial'	: 'createNewSerial' ,
				'click span'	: 'selectSerial'
			} ,
			model 		: new SerialsModel() ,
		});

		// Init vars
		this.app 				= options.app;
		this.SerialsCollection 	= new Collection( this.app.User.get('catalogs') );

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