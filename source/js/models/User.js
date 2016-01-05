import Backbone from 'backbone';
import { host } from '../config';

class User extends Backbone.Model {
	constructor( options ) {
		super( options );
	}

	get urlRoot() { return host + 'users' }
}

export default User;