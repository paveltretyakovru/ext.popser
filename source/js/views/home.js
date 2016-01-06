'use strict';

import Backbone 	from 'backbone';
import Template 	from '../../hbs/home.hbs';
import logout 		from '../modules/user/logout';
import Model		from '../models/Home';
import bodySizeUpd 	from '../modules/bodysize';
import SerialsView	from '../views/serials';
import SerialView 	from '../views/serial';

import rivets 			from 'rivets';
import rivets_backbone	from 'rivets-backbone-adapter';

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
}

export default Home;