/*global Framework7, Dom7 */

(function (Framework7, $$) {
	'use strict';

		//'https://imochs.com/imochsapi/v1/'
		//'http://localhost/imochsapi/v1/'
	var urls = [
		'https://rec.imochs.com/v1/'
	], req, api;
	
	var api_key = 'AIzaSyCA50FSHQXYIa-TOxr6YVuDMQPm-7B9srI';
	
	var token;

	req = function (obj, endpoint, success, error, retry) {
		var self = this;
		retry = retry || 0;
		obj['key'] = api_key;
		if(token) {
			obj['token'] = token;
		}
		var sym = true;
		if(endpoint == 'authenticate') {
			sym = true;
		}
		//console.log(obj);
		return Framework7.request({
			async: sym,
			url: urls[retry % urls.length] + endpoint,
			data: obj,
			method: 'POST',
			success: success,
			error: error,
		});
	};

	api = {

		urls: urls,
		
		upload: function (imageURI,options, success, error) {
			//var ft = new FileTransfer();
			return ft.upload(imageURI, encodeURI(api.urls[0]+'/upload/?key='+api_key+'&token='+token), success, error, options);
			//return req({'email':email,'password':password},'upload', success, error);
		},
		
		getRecs: function ( success, error) {
			return req({},'getRec',success , error)
		},
		
		getRec: function (id, success, error) {
			return req({ 'id' : id },'getRec',success , error)
		},
		
		setLike: function (id, success, error) {
			return req({ 'id' : id },'setLike',success , error)
		},
		
		setReject: function (id, success, error) {
			return req({ 'id' : id },'setReject',success , error)
		},
		
		getHistory: function (page, success, error) {
			return req({ 'page' : page },'getActions',success , error)
		},
		
		login: function (email, password, success, error) {
			return req({'email':email,'password':password},'login', success, error);
		},
		
		signup: function(name,email,password,sub,terms,success,error)  {
			return req({'name':name,'password':password,'email':email,'sub':sub,'terms':terms},'signup',success,error);
		},
		
		forgot: function(mail,success,error) {
			return req({email:mail},'forgot',success,error)
		},
		
		resend: function(mail,success,error) {
			return req({email:mail},'resend',success,error)
		},
		
		updatePassword: function(pw,pw2,success,error) {
			return req({password:pw, passwordRepeat: pw2},'updatePassword',success,error)
		},
		
		checkToken: function (tk, success, error) {
			return req({'token': tk},'authenticate',success, error);
		},
		
		saveRegistrationId: function (registrationId, success, error) {
			return req({'id':registrationId},'saveRegistrationId',success , error)
		},
		
		setToken: function (tk) {
			token = tk;
		}
	};

	window.api = api;

}(Framework7, Dom7));