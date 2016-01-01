'use strict';
import Backbone from 'backbone';

/**
 * Прочие маршруты для одиночных страниц
 */

class Defaults extends Backbone.Router {
	
	// Маршруты приложения
	get routes() {
		return {
			''	: 'home'
		}
	}
	
	constructor() {
		super();

		super();
	}

	home() { new Home(); }
}

export default Desktop;