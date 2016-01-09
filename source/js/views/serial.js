'use strict';

import $				from 'jquery';
import 'jquery-ui';
import _ 				from 'underscore';
import bootstrap 		from 'bootstrap-browserify';
import Backbone 		from 'backbone';
import rivets 			from 'rivets';
import rivets_backbone	from 'rivets-backbone-adapter';
import TemplateSerial 	from '../../hbs/serial.hbs';

// Расширение для риветс - добавляет класс active если модель НЕ новая
rivets.binders.noactive = ( el , value ) => { if( !value ){ $( el ).addClass('active') } }

class Serial extends Backbone.View{
	constructor( options ){
		super({
			 el 	: '#serial' ,
			 events : {
			 	'click #button-save-serial-title': 'saveSerial'
			 }
		});

		this.app 		= options.app;
		this.model 		= this.app.model;
		this.$settings 	= $('.js-serial-settings');
		
		this.prepareSerialsList();
	}

	render( options ){
		this.model = options.model;


		this.$el.hide( 300 , () => {
			this.$el.html( TemplateSerial );
			if( this.model.isNew() ){ $('.js-serial-settings').css('display' , 'block'); }
			
			this.$el.show( 300 , () => {
				$( "input[name=serial-title]" ).autocomplete({ source: this.serialsList });
			});
			
			this.binding = rivets.bind( this.el , { model : this.model } );
		});
		return this;
	}

	// Событие отрабатывает по клику - Сохранить (сериал при создании)
	saveSerial( e ){

		if( !this.model.get('_token') ){ this.model.set('_token' , this.app.token ); }

		this.model.save()
			.fail( () =>{
				console.error('Ошибка запроса');
			})
			.done( () =>{
				this.render({ model : this.model });
				console.log('Created' , this.model.isNew() , this.model.toJSON() );
			});
	}

	prepareSerialsList(){
		if( this.app.Serials ){
			this.serialsList = _.map( this.app.Serials , ( obj ) => {
				return {
					label : obj.title ,
					value : obj.title
				};
			})

			console.log('SERIAL LIST' , this.serialsList );
		}
	}
};

export default Serial;