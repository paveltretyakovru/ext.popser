'use strict';

export let getTab = ( callback ) => {
	return chrome.tabs.query({currentWindow: true, active: true}, ( tab ) => {
		let Tab = tab[0];
		if( callback ){ return callback( Tab ); }
	});
}

export let getTabUrl = ( callback , encode ) => {
	getTab( ( Tab ) => {
		if( callback ){
			return ( encode ) ? callback( encodeURIComponent( Tab.url ) ) : callback( Tab.url );
		}
	});	
}

export let getTabTitle = ( callback , encode ) => {
	getTab( ( Tab ) => {
		if( callback ){
			return ( encode ) ? callback( encodeURIComponent( Tab.title ) ) : callback( Tab.title );
		}
	});	
}

export let redirectTab = ( url , callback ) => {
	getTab( ( Tab ) => {
		if( callback ) callback( Tab );
		return chrome.tabs.update( Tab.id , { url : url });
	}); 	
}