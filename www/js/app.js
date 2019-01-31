(function (Framework7, $, T7, moment, routes) {
    'use strict';
	
	T7.registerHelper('dateFormat', function (value, options) {
		//var date = new Date(value*1000);
		//return date.getDayName()+', '+date.getDate()+'.'+ (date.getMonth()+1);
		moment.locale('de');
		return moment(value).format(options.hash.format);
	});
	
    T7.registerHelper('format', function (value, options) {
		if(!value) 
			return 0;
		var re = '\\d(?=(\\d{' + (options.hash.sections || 3) + '})+' + (options.hash.decimal > 0 ? '\\.' : '$') + ')';
        return value.toFixed(Math.max(0, ~~options.hash.decimal)).replace(new RegExp(re, 'g'), '$&,');
    });
	
	// Init App
	var app = new Framework7({
		id: 'com.denki.app',
		root: '#app',
		theme: 'md',
		init: false,
		input: {
			scrollIntoViewOnFocus: true,
			scrollIntoViewCentered: true,
		},
		data: function () {
			return {
				user: JSON.parse(localStorage.getItem("user")),
			};
		},
		routes: routes,
        statusbar: {
            scrollTopClick: true,
            enabled: true,
            overlay: Framework7.device.ios ? true : 'auto',
            iosTextColor: '#000000',
            androidTextColor: '#000000',
            iosBackgroundColor: '#ffffff',
            androidBackgroundColor: '#efefef',
        },
		dialog: {
			title: 'Denki',
		},
		panel: {
            leftBreakpoint: 768,
			closeByBackdropClick: true,
		},
		toast: {
			closeTimeout: 3000,
			closeButton: true,
			position: Framework7.device.desktop ?  'center' : 'bottom',
		},
		view: {
			pushStateSeparator: '#!',
			pushState: true,
		},
		on: {
			init: function () {
                console.log("init");
			},
		}
	});
	// Init/Create main views
	app.viewMain = app.views.create('.view-main', { url: '/', main: true, });
	app.viewLeft = app.views.create('.view-left', { url: '/left', pushState: false, });
    app.init();
    var seed = JSON.parse(localStorage.getItem("seed"));
    //console.log(app.viewMain);
    if(seed)
        app.viewMain.router.navigate('/home/'+(seed.length-1));
    else
        app.viewMain.router.navigate('/home/0');
    
    app.$(document).on('deviceready', function() {
        StatusBar.overlaysWebView(true);
        StatusBar.styleDefault();
        if (cordova.platformId == 'android') {
            StatusBar.show();
        }

        if(app.device.ios) {
            Keyboard.shrinkView(true);
            Keyboard.disableScrollingInShrinkView(true);
            Keyboard.hideFormAccessoryBar(true);
        }
    });
	
	app.$(document).on('click', 'a.panel-open', function (e) {
		var url = $(this).data('url');
		if(url) {
			if($(this).data('panel') == 'right')
			{
				//Set link for view right
			} else {
				app.viewLeft.router.navigate(url);
			}
		}
	});
	
}(Framework7, Dom7, Template7, moment, routes));