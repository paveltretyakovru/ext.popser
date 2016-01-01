'use strict';
import $ from 'jquery';

/**
 * Расширение функционала используемых библиотек и фреймворков
 * При подключении, функция автоматически выполняется
 */

export var FrameworksExtender = (function(){

	/**
	 * Jquery по умолчанию не хочет отправлять ajax с ajax заголовками!
	 * Принудительно для каждого Ajax запроса, добавляем XMLHttpRequest
	 * @return {void}
	 */
	$(document).ajaxSend(function (event, request, settings) {
	    request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	});

	/**
	 * Преобразует данные формы в JSON объект
	 * @return {json}
	 * @url https://github.com/hongymagic/jQuery.serializeObject
	 */
	$.fn.serializeObject = function () {
		var a = {}, b = function (b, c) {
			var d = a[c.name];
			"undefined" != typeof d && d !== null ? $.isArray(d) ? d.push(c.value) : a[c.name] = [d, c.value] : a[c.name] = c.value
		};
		return $.each(this.serializeArray(), b), a
	};
	
})();