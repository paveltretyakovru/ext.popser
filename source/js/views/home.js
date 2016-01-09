'use strict';

// Plugins
import $ 				from 'jquery';
import Backbone 		from 'backbone';
import rivets 			from 'rivets';
import rivets_backbone	from 'rivets-backbone-adapter';

// Templates
import Template 	from '../../hbs/home.hbs';

// Models
import Model		from '../models/Home';

// Views
import SerialsView	from '../views/serials';
import SerialView 	from '../views/serial';

// Modules
import logout 		from '../modules/user/logout';
import bodySizeUpd 	from '../modules/bodysize';
import { Message , HideMessage } from '../modules/message';


class Home extends Backbone.View {
	
	constructor( options ){
		super({
			el 		: '#wrapper' ,
			model 	: new Model() ,
			events 	: { 'click .js-link-logout' : 'userLogout' } , // Выход из приложения
		});

		// Init vars
		this.app = options.app;

		// Draw page
		this.render();
		
		// Инициализируем представления страницы
		this.app.SerialsListView = new SerialsView({ app : this.app });
		this.app.SerialView 	 = new SerialView({ app : this.app });
		
		// Рендерим необходимые представления страницы
		this.renderSerialsList();

		// Update body sise
		bodySizeUpd();

		// Set listeners
		// Событие отрабатывает, когда в представлении списка сриалов выбирают сериал
		this.listenTo( this.app.SerialsListView , 'serialSelected' , this.serialSelected );
		this.listenTo( this.app.SerialView , 'serialDeleted' , this.serialDeleted );
		// Прослушиваем ajax запросы и анимируем их
		this.setAjaxAction();
	}

	/* Рендериг представления страницы */
	render(){
		this.$el.html( Template );
		this.binding = rivets.bind( this.el , { model : this.model } );

		return this;
	}

	/* Рендеринг представления списка своих сериалов */
	renderSerialsList(){
		this.app.SerialsListView.render();
	}

	/* Выход из аккаунта после клика на ссылку выход */
	userLogout( e ){
		e.preventDefault();
		logout({ app : this.app });
	}

	/**
	 * Срабатывает от прослушки представления списка сериалов
	 * когда пользователь выбирает определенный сериал
	 * @param  {object} options содержит параметр model -> модель редактируемого сериала
	 * @return {void}         Отрисовывает представления для работы над выбранным сериалом
	 */
	serialSelected( options ){
		this.app.SerialView.render({ model : options.model });
	}

	serialDeleted(){
		this.app.SerialView.render();
	}

	setAjaxAction(){
		let frost 	= 'images/cat-walk-icon.png';
		let move 	= 'images/cat-walk-icon.gif'; 
		let $image 	= $('#load-image');
		let $message= $('footer>span');

		$( document ).ajaxStart(function() {
			console.log('ajax start');
			$image.attr('src' , move );
		});

		$( document ).ajaxSuccess(function( data , other ) {
			// Останавливаем изображение загрузки через секунду
			// и показываем сообщение
			setTimeout(() =>{
				$image.attr('src' , frost );
				$message.fadeIn(500);

				// Прячем сообщение через 2 секунды
				setTimeout(() => {
					$message.fadeOut( 1000 );
				}, 2000 );

			}, 1000 );
		});

		$( document ).ajaxError(function(event, xhr, settings, thrownError) {
			Message( xhr );

			setTimeout( () => {
				$image.attr('src' , frost );
				HideMessage();
			}, 1000);
		});
	}
}

export default Home;