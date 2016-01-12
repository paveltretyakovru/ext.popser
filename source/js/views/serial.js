'use strict';

import $				from 'jquery';
import 'jquery-ui';
import _ 				from 'underscore';
import bootstrap 		from 'bootstrap-browserify';
import Backbone 		from 'backbone';
import rivets 			from 'rivets';
import rivets_backbone	from 'rivets-backbone-adapter';

import { getTab , getTabUrl , getTabTitle , redirectTab } from '../modules/chrome/tab';
import { host as _HOST , routes as _ROUTES} from '../config';

import LinksSearchView 	from '../views/links-search';
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
			 	'click #button-serial-go-to-lastlink'	: 'openLastLink'	,
			 	'click #button-serial-serach-links'		: 'searchLinks'
			 }
		});

		this.app 		= options.app;
		this.$settings 	= $('.js-serial-settings');

		// Подготавливаем список сериалов для автоформы
		this.prepareSerialsList();
	}

	render( options ){
		if( options ){
			this.model = options.model;
			this.$el.hide( 300 , () => {
				this.$el.html( TemplateSerial );
				this.binding = rivets.bind( this.el , { model : this.model } );
				this.initAutocomplete();
				this.prepareLinksSearchListView();
				this.$el.show( 300 );
			});	
		} else { this.$el.hide( 300 ); }

		return this;
	}

	initAutocomplete(){
		// Вешаем автофому на инпут с заголовком сериала
		$( "input[name=serial-title]" ).autocomplete({
			source 	: this.serialsList ,
			// Риветс не видет изменения внесенные плагином autocomplete
			select 	: ( event , ui ) => { this.model.set( 'title' , ui.item.value ); }
		});
	}

	// #### Методы для обновления счетчиков сериала НАЧАЛО #### //
	incrementSeason( e ){
		let val = parseInt( this.model.get('season') , 10 );
		this.model.set('season' , val + 1 );
		this.setSerieValue( 1 );
		this.checkLink( () => { this.model.save(); });
	}
	decrementSeason( e ){
		let val = parseInt( this.model.get('season') , 10 );
		if( val !== 0 ){
			this.model.set('season' , val - 1 );
			this.setSerieValue( 1 );
			this.checkLink( () => { this.model.save(); });
		}
	}
	incrementSerie( e ){
		let val = parseInt( this.model.get('serie') , 10 );
		this.model.set('serie' , val + 1 );
		this.checkLink( () => { this.model.save(); });
	}
	decrementSerie( e ){
		let val = parseInt( this.model.get('serie') , 10 );
		if( val !== 0 ){
			this.model.set('serie' , val - 1 );
			this.checkLink( () => { this.model.save(); });
		}
	}

	setSeasonValue( num ){ this.model.set( 'season' , num ); }
	setSerieValue( num ){ this.model.set( 'serie' , num ); }
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
	 * Инициализирует представление со списком дополнительных ссылок
	 * @return {void} Создает вид в this.LinksSearvhList и рендерит его
	 */
	prepareLinksSearchListView(){
		this.LinksSearchList = new LinksSearchView({ serial : this.model });
		this.LinksSearchList.render();
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
	 * Открывает страницу в текущей вкладке, указанную в поле "ссылка"
	 * @param  {JQuery event object} e Обычный event объект JQuery
	 * @return {void}   Открывает страницу
	 */
	openLastLink( e ){
		let lastlink = this.model.get('lastlink');
		console.log('openlastlink event' , lastlink );
		if( lastlink ){
			redirectTab( lastlink );
		} else { console.error('Dont isset serial lastlink'); }
	}

	/**
	 * Поиск ссылок для текущего сериала
	 * @param  {JQuery event object} e Обычный event объект JQuery
	 * @return {void}   Выводит список найденых ссылок
	 */
	searchLinks( e ){
		this.LinksSearchList.trigger('loadLinks');
	}

	askUpdateLink(){

	}

	/**
	 * Выполнеят проверку адреса текущей вкладки. Если заголовок страницы содержит название
	 * сериала и адерс модели не совпадает с ссылкой обновляем адрес страницы в моделе
	 * @param  {Function} callback методы для работы с вкладками асинхронны, поэтому нужен callback
	 * @return {void}            выполняет заданный callback
	 */
	checkLink( callback ){
		var modeltitle = this.model.get('title');
		getTabTitle( ( title ) => {
			getTabUrl( ( url ) => {
				// Если адрес текущей вкладки не равен адресу предыдущией серии || сезона
				if( url != this.model.get('lastlink`') && url !== '' ){
					// Если заголовок страницы содержит название сериала
					if( title.indexOf( modeltitle ) !== -1 ){
						this.model.set( 'titlelink' , title );
						this.model.set( 'lastlink' , url );
					}
				}
				// В лбюмо случае выполняем callback()
				callback();
			});
		});
	}
};

export default Serial;