import $ 		from 'jquery';
import Backbone from 'backbone';
import Desktop 	from './controllers/desktop';

class Application {
  constructor() {
    this.controller = new Desktop();

    Backbone.history.start();
  }

}

window.app = new Application();