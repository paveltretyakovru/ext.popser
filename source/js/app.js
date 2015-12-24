import $ 		from 'jquery';
import Backbone from 'backbone';
import Desktop 	from './routes/desktop';

class Application {
  constructor() {
    new Desktop();

    Backbone.history.start();
  }

}

new Application();