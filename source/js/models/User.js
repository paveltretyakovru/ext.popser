import Backbone from 'backbone';

class User extends Backbone.Model {
	constructor() {
		super();
	}

	get defaults() {
		return {
			email 		: 'test login' ,
			name 		: '' ,
			password	: ''
		} 
	}
}

window.app.user = new User();

export default User;