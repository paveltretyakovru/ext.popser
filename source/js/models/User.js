import Backbone from 'backbone';

class User extends Backbone.Model {
	constructor() {
		super();
	}

	get urlRoot() { return '/users' }

	get defaults() {
		return {
			email 		: '' ,
			name 		: '' ,
			password	: ''
		} 
	}
}

window.user = new User();

export default User;