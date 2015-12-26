'use strict';

import $ 			from 'jquery';
import { host }		from '../../libs/constants';
import { getCookie }from '../../libs/functions/getcookie';

export function checkAuth( success , unsuccess ) {

	$.get( host + 'auth/check')

		.done( (json, textStatus) => { 										// Запрос выполнен успшено
			if( json ) {													// Запрос содержит результат
				if ('auth' in json ){
					if ( json.auth == true ) { 
						console.log( 'User was auth' , json );
						if ( success ) { success(); }
					} else {
						console.error( 'User was not auth' , json );
						if ( unsuccess ) { unsuccess(); }
					}
				} else {
					console.error( 'Bad request for check auth' , json );
					if( unsuccess ) { unsuccess(); }
				}
			}
		})
		.fail( ( response ) => {
			console.log('Fail check auth' , data);
		} );

}