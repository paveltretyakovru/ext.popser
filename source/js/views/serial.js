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
			 	'click #button-save-serial-title'	: 'saveSerial' 		,
			 	'click #js-season-up'				: 'incrementSeason' , 
			 	'click #js-season-down'				: 'decrementSeason' ,
			 	'click #js-serie-up'				: 'incrementSerie' 	, 
			 	'click #js-serie-down'				: 'decrementSerie' 	, 

			 }
		});

		this.app 		= options.app;
		this.model 		= this.app.model;
		this.$settings 	= $('.js-serial-settings');

		// Подготавливаем список сериалов для автоформы
		this.prepareSerialsList();
	}

	render( options ){
		this.model = options.model;

		if( !this.model.get('_token') ){ this.model.set('_token' , this.app.token ); }

		this.$el.hide( 300 , () => {
			this.$el.html( TemplateSerial );
			if( this.model.isNew() ){ $('.js-serial-settings').css('display' , 'block'); }
			
			this.$el.show( 300 , () => {

				// Вешаем автофому на инпут с заголовком сериала
				$( "input[name=serial-title]" ).autocomplete({
					source 	: this.serialsList ,
					// Риветс не видет изменения внесенные плагином autocomplete
					select 	: ( event , ui ) => { this.model.set( 'title' , ui.item.value ); }
				});
			});
			
			this.binding = rivets.bind( this.el , { model : this.model } );
		});
		return this;
	}

	incrementSeason( e ){
		let val = parseInt( this.model.get('season') , 10 );

		this.model.set('season' , val + 1 );
		this.model.save();
	}

	decrementSeason( e ){
		let val = parseInt( this.model.get('season') , 10 );		
		
		if( val !== 0 ){
			this.model.set('season' , val - 1 );
			this.model.save();
		}
	}

	incrementSerie( e ){
		let val = parseInt( this.model.get('serie') , 10 );

		this.model.set('serie' , val + 1 );
		this.model.save();
	}

	decrementSerie( e ){
		let val = parseInt( this.model.get('serie') , 10 );		
		
		if( val !== 0 ){
			this.model.set('serie' , val - 1 );
			this.model.save();
		}
	}

	/**
	 * Событие отрабатывает по клику - Сохранить (сериал при создании)
	 * @param  {jQuery event } e standart jquery event object
	 * @return {void}   сохраняет созданный сериал в каталог пользователя
	 */
	saveSerial( e ){

		this.model.save()
			.fail( () =>{
				console.error('Ошибка запроса');
			})
			.done( () =>{
				this.render({ model : this.model });});
	}

	/**
	 * Подготавливает загруженный список сериалов к виду для autocomplete
	 * @return {void} заполняет массива this.serialsList значениями
	 */
	prepareSerialsList(){
		if( this.app.Serials ){
			this.serialsList = _.map( this.app.Serials , ( obj ) => {
				return {
					label : obj.title ,
					value : obj.title
				};
			})
		}
	}
};

export default Serial;