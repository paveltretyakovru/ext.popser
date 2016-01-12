'use strict';

export let getTab = ( callback ) => {
	return chrome.tabs.query({currentWindow: true, active: true}, ( tab ) => {
		console.log('Tab!' , tab);
		let Tab = tab[0];
		if( callback ){ return callback( Tab ); }
	});
}

export let getTabUrl = ( callback , encode ) => {
	var url = '';
	getTab( ( Tab ) => {
		if( callback ){
			if ( 'url' in Tab ){ url = Tab.url }
			return ( encode ) ? callback( encodeURIComponent( url ) ) : callback( url );
		}
	});	
}

export let getTabTitle = ( callback , encode ) => {
	var title = '';
	getTab( ( Tab ) => {
		if( callback ){
			if( 'title' in Tab ){ title = Tab.title.toLowerCase(); }
			return ( encode ) ? callback( encodeURIComponent( title ) ) : callback( title );
		}
	});	
}

export let redirectTab = ( url , callback ) => {
	getTab( ( Tab ) => {
		if( callback ) callback( Tab );
		// return chrome.tabs.update( Tab.id , { url : url });
		chrome.tabs.create({ url: url });
	}); 	
}