'use strict';

import $ 			           from 'jquery';
import Backbone 	       from 'backbone';
import template 	       from '../../hbs/auth.hbs';
import { host , routes } from '../config';
import checkAuth         from '../modules/user/check-auth';
import Message           from '../modules/message';

class Auth extends Backbone.View {
	constructor( options ) {
		super();

		this.$html 	  = $( 'html' );
		this.$body 	  = $( 'body' );
    this.response = {};
    this.app      = {};
		
    if( 'app' in options ){ this.app = options.app; }

    this.render();
	}

	get el() { return '#wrapper' }

	get events() {
		return {
			'click #button-submit-login'     : 'sendLogin'       , // Аутентификация
			'click #button-submit-register'  : 'sendRegister'    , // Регистрация
			'click .js-auth-check'           : 'checkAuth'       , // Проверка авторизации
      'change input[type=checkbox]'		 : 'changeAccordion' , // Событие при изменении аккордиона
		}
	}

	get render (){ return () => {
    document.querySelectorAll(this.el)[0].innerHTML = template;
    
    // Получаем токен для защиты от csrf защиты
    if( 'token' in this.app ){
      this.token = this.app.token;
    } else {
      console.error( 'Не переданы параметры csrf защиты' , this.response );
    }
  };}

  get checkAuth () {
    return ( e ) => {
      e.preventDefault();

      checkAuth(
        ( response ) => { console.log('Checkauth SUCCESS!'); } ,
        ( response ) => { console.log('Checkauth FAILED'); }
      );

    }
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
  			password 	: $pass.val()  ,
        _token    : this.token
  		}

      $.ajax({
        url   : host + routes.login,
        data  : data ,
        type  : 'POST' ,
      })
      .done(function( response ) {
        console.log("success" , response );
        app.Router.navigate( 'home' , true );
      })
      .fail(function( response ) {
          window.res = response;
          Message( response );
      })
      .always(function( response ) {
        //console.log("complete");
      });

  	}
  }

  /**
   * Срабатывает при отправке формы регистрации
   * @return {void} регистрирует пользователя
   */
  get sendRegister () {
  	return ( e ) => {
  		let $form  = $( '#block-register' );
  		let $email = $form.find('input[name=email]');
  		let $pass  = $form.find('input[name=password]');
  		let $name  = $form.find('input[name=name]');
  		let data   = {
  			email 	 : $email.val() 	,
  			password : $pass.val() 	  ,
  			name 	   : $name.val()    ,
        _token   : this.token
  		}

  		$.post( host + 'auth/register', data)	// Отрпавляем форму регистрации на сервер
  			.done( (data, textStatus, xhr) => {	// Запрос регистрации выполнен успешно
  				if( 'result' in data ) {
  					switch( data.result ){
  						
              case 'success'	:
  							console.info( 'Регистрация прошла успешно' );
                app.Router.navigate( 'home' , true );
              break;
              
              case 'isset'  :
  							console.error( 'Такой пользователь существует' );
  						break;
              
              case 'error'	:
  							console.error( 'Произошла ошибка при регистрации' );
              break;            

              case 'dailed' :
                console.error( 'Неправильно заполнена форма регистрации' );
              break;
  					}
  				}
  			})
			.fail( ( response ) => {	// Ошибка во время выолнения запроса регистрации
				console.error( 'Произошла ошибка при регистрации' , response );
        Message( response );
			} );
  	}
  }
}

export default Auth;