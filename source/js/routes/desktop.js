import Backbone from 'backbone';

class Desktop extends Backbone.Router {
	constructor() {
		super();
		
		this.routes = {
			''	: 'home'
		}

		super();
	}

	home() {
		console.log('This is home router :)');
	}
}

export default Desktop;