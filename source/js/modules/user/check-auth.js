'use strict';

import $ 				 	from 'jquery';
import { host , routes } 	from '../../config';
import { getCookie }		from '../chrome/get-cookie';

function checkAuth ( success , unsuccess ) {

	$.get( host + routes.checkauth)

		.done( (json, textStatus) => { 										// Запрос выполнен успшено
			if( json ) {													// Запрос содержит результат
				if ('auth' in json ){
					if ( json.auth == true ) { 
						console.log( 'User was auth' , json );
						if ( success ) { success( json ); }
					} else {
						console.error( 'User was not auth' , json );
						if ( unsuccess ) { unsuccess( json ); }
					}
				} else {
					console.error( 'Bad request for check auth' , json );
					if( unsuccess ) { unsuccess( json ); }
				}
			}
		})
		.fail( ( response ) => {
			console.log('Fail check auth' , data);
		} );

}

export default checkAuth;