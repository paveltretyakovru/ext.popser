'use strict';

import $ 			from 'jquery';
import { host }		from '../../modules/constants';
import { getCookie }from '../../modules/functions/getcookie';

export function checkAuth( success , error ) {

	$.get( host + 'auth/check', (json, textStatus) => {

		if( json ) {
			if ('auth' in json ){
				if ( json.auth == true ) { 
					console.log( 'User was auth' , json );
					if ( success ) { success(); }
				} else {
					console.error( 'User was not auth' , json );
					if ( error ) { error(); }
				}
			} else {
				console.error( 'Bad request for check auth' , json );
				if( error ) { error(); }
			}
		}

	});

}