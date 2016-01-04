import Backbone from 'backbone';
import { host } from '../config';

class User extends Backbone.Model {
	constructor( options ) {
		super( options );
		console.log('User model' , this.urlRoot );
	}

	get urlRoot() { return host + 'users' }
}

window.user = new User();

export default User;