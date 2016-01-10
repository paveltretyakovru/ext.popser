'use strict';

import $				from 'jquery';
import Backbone 		from 'backbone';
import rivets 			from 'rivets';
import rivets_backbone	from 'rivets-backbone-adapter';

import Links 	from '../collections/Links';
import Template from '../../hbs/links-search-list.hbs';

class LinksSearch extends Backbone.View{
	constructor( options ){
		super({
			 el 	: '#block-links-search' ,
			 events : {
			 	'click #link-refresh-links-search'	: 'loadLinks'
			 }
		});
		this.serial 	= options.serial;
		this.model 		= new Model();
		this.collection = new Links();

		this.listenTo( this.collection , 'sync'  , this.afterSync );
		this.on( 'loadLinks'	, this.loadLinks );
	}

	render(){
		this.$el.html( Template );
		this.binding = rivets.bind( this.el , { links : this.collection , model : this.model } );
		return this;
	}

	afterSync(){
		this.render();
		this.checkResult();
	}

	loadLinks(){
		this.collection.fetch({
			data : { serial : this.serial.toJSON() }
		});
	}

	checkResult(){
		if( !this.collection.length ){
			console.log('Check result - no result!');
			this.model.set( 'noresult' , true );
		} else{
			this.model.set( 'noresult' , false );
		}
	}
}

class Model extends Backbone.Model{
	constructor( options ){
		super( options );
	}

	get deafults(){
		return {
			sync 	: false ,
			noresult: false
		}
	}
}

export default LinksSearch;