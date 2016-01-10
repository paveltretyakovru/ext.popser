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
			 events : {}
		});
		this.collection = new Links([ { url : 'http://test.ru' } ]);
	}

	render(){
		this.$el.html( Template );
		this.binding = rivets.bind( this.el , { links : this.collection } );
		return this;
	}
}

export default LinksSearch;