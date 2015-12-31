'user strict';

import $ 		from 'jquery';
import Backbone from 'backbone';
import Desktop 	from './controllers/desktop';

import adder 	from './libs/adder';

class Application {
  constructor() {
	
	chrome.fontSettings.setFont({
		genericFamily: 'sansserif', script: 'Cyrl', fontId: 'MS PGothic'
	});

    this.controller = new Desktop();

    Backbone.history.start();
  }

}

window.app = new Application();