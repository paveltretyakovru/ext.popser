'use strict';
import $ from 'jquery';

export default function bodySize(){
	let $first = $('div:first');
	$('body').height( $first.height() );
	$('html').height( $first.height() );
}