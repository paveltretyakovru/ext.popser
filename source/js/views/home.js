'use strict';

import Backbone 	from 'backbone';
import Template 	from '../../hbs/home.hbs';
import logout 		from '../modules/user/logout';
import Model		from '../models/Home';

class Home extends Backbone.View {
	get el()		{ return '#wrapper' }
	get template()	{ return this.app.compile( Template , this.model.toJSON() ); }
	
	get events(){return {
		'click .js-link-logout' : 'userLogout' , // Выход из приложения
	};}

	constructor( options ){
		super();

		this.collectModels( options );
		this.collectVariavles( options );

		this.render();
	}

	get render(){ return () => {
		document.querySelectorAll(this.el)[0].innerHTML = this.template;
	}}

	get userLogout(){return ( e ) => {
		e.preventDefault();
		logout({ app : this.app });
	};}

	/**
	 * Инициализируем переменные
	 * @param  {object} options объект параметров переданный при инициализации представления
	 * @return {void}   новые переменные передаются в текущий объект
	 */
	collectVariavles( options ){
		if( 'app' in options ){
			this.app = options.app; 
		} else { console.error( 'Не передан параметр app в представление Home' ); }
	}

	/**
	 * Инициализация моделей страницы
	 * @return {void} модели сохраняются локальнов в классе
	 */
	collectModels(){
		this.model = new Model();

		this.model.set( 'user' , app.User.toJSON() );
	}
}

export default Home;