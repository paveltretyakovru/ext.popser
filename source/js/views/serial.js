'use strict';

import $				from 'jquery';
import 'jquery-ui';
import _ 				from 'underscore';
import bootstrap 		from 'bootstrap-browserify';
import Backbone 		from 'backbone';
import rivets 			from 'rivets';
import rivets_backbone	from 'rivets-backbone-adapter';

import { getTab , getTabUrl , redirectTab } from '../modules/chrome/tab';

import TemplateSerial 	from '../../hbs/serial.hbs';

// Расширение для риветс - добавляет класс active если модель НЕ новая
rivets.binders.noactive = ( el , value ) => { if( !value ){ $( el ).addClass('active') } }

class Serial extends Backbone.View{
	constructor( options ){
		super({
			 el 	: '#serial' ,
			 events : {
			 	'click #button-save-serial-title'		: 'saveSerial' 		,
			 	'click #js-season-up'					: 'incrementSeason' , 
			 	'click #js-season-down'					: 'decrementSeason' ,
			 	'click #js-serie-up'					: 'incrementSerie' 	, 
			 	'click #js-serie-down'					: 'decrementSerie' 	,
			 	'click #button-serial-delete'			: 'deleteSerial' 	,
			 	'click #button-serial-set-current-url'	: 'setCurrentUrl'	,
			 	'click #button-serial-go-to-link'		: 'openLink'		,
			 	'click #button-serial-serach-links'		: 'searchLinks'
			 }
		});

		this.app 		= options.app;
		this.$settings 	= $('.js-serial-settings');
		this.links 		= {};

		// Подготавливаем список сериалов для автоформы
		this.prepareSerialsList();
	}

	render( options ){
		if( options ){
			this.model = options.model;
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
				this.binding = rivets.bind( this.el , { model : this.model , links : this.links } );
			});	
		} else {
			this.$el.hide( 300 );
		}

		return this;
	}

	// #### Методы для обновления счетчиков сериала НАЧАЛО #### //
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
	// #### Методы для обновления счетчиков сериала КОНЕЦ #### //

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
				console.log('Model saved' , this.model.toJSON() );
				this.render({ model : this.model });});
	}

	/**
	 * Удаляет сериал из каталога пользователя
	 * @param  { JQuery event object }  Default JQuery event object
	 * @return {void}  Send request to server for delete serial, and delete model in front
	 */
	deleteSerial( ){
		this.model.destroy()
			.done( () => {
				this.trigger('serialDeleted');
			});
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

	/**
	 * Вставляет в поле ссылки текущий адрес страницы
	 * @param {JQuery event object} e обычный event объект JQuery
	 * @return {void}	вставляет ссылку в поле "ссылка"
	 */
	setCurrentUrl( e ){
		getTabUrl( ( url ) => {
			this.model.set( 'link' , url );
			this.model.save();
		});
	}

	/**
	 * Открывает страницу в текущей вкладке, указанную в поле "ссылка"
	 * @param  {JQuery event object} e Обычный event объект JQuery
	 * @return {void}   Открывает страницу
	 */
	openLink( e ){
		let link = this.model.get('link');
		console.log('openLink event' , link );
		if( link ){
			redirectTab( link );
		} else { console.error('Dont isset serial link'); }
	}

	/**
	 * Поиск ссылок для текущего сериала
	 * @param  {JQuery event object} e Обычный event объект JQuery
	 * @return {void}   Выводит список найденых ссылок
	 */
	searchLinks( e ){
		
	}
};

export default Serial;