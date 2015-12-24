import Backbone from 'backbone';
import Home 	from '../routes/home';
import User 	from '../models/User';

class Desktop extends Backbone.Router {
	constructor() {
		super();
		
		this.routes = {
			''	: 'home'
		}

		super();
	}

	home() {
		new Home();
	}
}

export default Desktop;