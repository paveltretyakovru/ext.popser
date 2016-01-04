import Backbone from 'backbone';
import { host } from '../config';

class User extends Backbone.Model {
	constructor( options ) {
		super( options );
		console.log('User model' , this.urlRoot );
	}

	get urlRoot() { return host + 'users' }

	get defaults(){return {
		current : "Шерлок"
	};}
}

export default User;