'use strict';

import $ 				 from 'jquery';
import { host , routes } from '../../config';

export default function logout( options ){
	$.get( host + routes.logout )
		.done( ( response ) => {
			console.error('Успешный выход');
		})
		.fail( ( response ) => {
			console.error('Ошибка во время выхода');
		})
		.always( ( response ) => {
			if( options ){
				if( 'app' in options && 'Router' in options.app ){
					app.Router.navigate( 'auth' , { trigger : true } );
				}
			}
		});
}