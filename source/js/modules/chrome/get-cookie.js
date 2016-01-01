'use strict';

import { host } from '../../config';

export function getCookie ( name , callback ){
	let url		= host;
	let result 	= '';

	chrome.cookies.get({ url : host , name : name } , ( data ) => { 
		if ( callback ){
			if ( data ){
				callback(data.value);
			}else{
				console.error('Cookie' , name , 'not exist' );
			}
		}
	});
	return result;
}