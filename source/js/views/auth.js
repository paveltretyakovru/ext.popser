'use strict';

import $ 			from 'jquery';
import Backbone 	from 'backbone';
import template 	from '../../hbs/auth.hbs';
import { host } 	from '../libs/constants';

export class Auth extends Backbone.View {
	constructor() {
		super();

		this.$html 	= $( 'html' );
		this.$body 	= $( 'body' );
		//this.$el 	= $( '#wrapper' );
	}

	get el() { return '#wrapper' }

	get events() {
		return {
			'click 	#button-submit-login' 		: 'sendLogin' ,			// Аутентификация
			'click  #button-submit-registrate' 	: 'sendRegistrate' ,	// Регистрация
			'change input[type=checkbox]'		: 'changeAccordion' 	// Событие при изменении аккордиона
		}
	}

	get render (){
		return () => { document.querySelectorAll(this.el)[0].innerHTML = template; }
	}

	/**
	 * Изменяет размер поповера после выбора пунктов аккордиона
	 * @return {void} изменяет размер
	 */
	get changeAccordion () {
		return ( e ) => {
			this.$body.height( this.$el.height() );			
			this.$html.height( this.$el.height() );
		}
	}
  
  /**
   * Срабатывает при отправке формы логина
   * @return {void} проверяет аутентификацию пользовател
   */
  get sendLogin () {
  	return ( e ) => {
  		let $form  = $( '#block-login' );
  		let $email = $form.find('input[name=email]');
  		let $pass  = $form.find('input[name=password]');
  		let data   = {
  			email 		: $email.val() ,
  			password 	: $pass.val()
  		}

  		$.post( host + 'auth/login', data)
  			.done( (data, textStatus, xhr) => {
  				console.log('data' , data , 'textStatus:' , textStatus , 'xhr:' , xhr );
  			})
			.fail( ( data ) => {
				console.error('Error send login' , data);
			} );
  	}
  }

  /**
   * Срабатывает при отправке формы регистрации
   * @return {void} регистрирует пользователя
   */
  get sendRegistrate () {
  	return ( e ) => {
  		let $form  = $( '#block-registrate' );
  		let $email = $form.find('input[name=email]');
  		let $pass  = $form.find('input[name=password]');
  		let $repass= $form.find('input[name=repassword]');
  		let data   = {
  			email 		: $email.val() 	,
  			password 	: $pass.val() 	,
  			repassword 	: $repass.val()
  		}

  		$.post( host + 'auth/registrate', data)	// Отрпавляем форму регистрации на сервер
  			.done( (data, textStatus, xhr) => {	// Запрос регистрации выполнен успешно
  				if( 'result' in data ) {
  					switch( data.result ){
  						case 'success'	:
  							console.info( 'Регистрация прошла успешно' );
  						case 'isset'	:
  							console.error( 'Такой пользователь существует' );
  						case 'error'	:
  							console.error( 'Произошла ошибка при регистрации' );
  					}
  				}
  			})
			.fail( ( data ) => {	// Ошибка во время выолнения запроса регистрации
				console.error( 'Произошла ошибка при регистрации' , data );
			} );
  	}
  }
}