/**
 * Script to handle pxl notifications inside alert.xul
 */

var PXLH5NAlertWindow =
{
	PXLH5NPermissions: Components.classes['@paxal.net/html5notifications/notification-service;1']
		.getService().QueryInterface(Components.interfaces.nsIPXLNotificationService),

	notificationInfos: null,

	isPXLH5NNotification: function()
	{
		try
		{
			//dump(gAlertCookie + "\n");
			this.notificationInfos = JSON.parse(gAlertCookie);
			if('pxl' in this.notificationInfos) return this.notificationInfos['pxl'];
		}
		catch(e) { }

		return false;
	},

	prefillAlertInfo: function() { },
	notificationType: '',

	focus: function()
	{
		gAlertListener.observe(null, 'alert-focus', gAlertCookie);
		this.uClose();
	},

	close: function()
	{
		try {
			window.animateCloseAlert = this._animateCloseAlert;
			window.animateCloseAlert();
		}
		catch(e) { alert(e); }
	},

	// Close() has been invoked in alert UI
	uClose: function()
	{
		try {
			closeAlert();
		}
		catch(e) { alert(e); }
	},

	disable: function()
	{
		// Use observer to send pxl-disable event
		gAlertListener.observe(null, 'pxl-disable', gAlertCookie);
		this.uClose();
	},

	init: function()
	{
		if(this.notificationType = this.isPXLH5NNotification())
		{
      // Activate stylesheet
			document.documentElement.setAttribute('pxlalert', this.notificationType);
      // Force vertical display to have buttons below content
      gOrigin = gOrigin & ~NS_ALERT_HORIZONTAL;

			// Disable onclick by default
			// - ONCLICK var _onclick = document.documentElement.getAttribute('onclick');
			// - ONCLICK document.documentElement.setAttribute('onclick', '');
			window.addEventListener(
				'click',
				function(ev) {
					var target = ev.target;
					while(target)
					{
						// If not html : bind onclick for alertBox
						if(
                typeof(target) == 'object'
                &&
                'id' in target
                &&
                target.id == 'alertBox'
                &&
                PXLH5NAlertWindow.notificationType != 'html'
            )
						{
							PXLH5NAlertWindow.focus();
							break;
						}
						target = target.parentNode;
					}
					ev.stopPropagation();
				},
				true
			);

			// Close when we say it should close
			this._animateCloseAlert = animateCloseAlert;
			/* AMO Disable auto-close defined at chrome://global/content/alerts/alert.js */
			window.animateCloseAlert = function() { /* disable auto-close */ }

			var gIFrame;
			var gReflectionIFrame;

			this.prefillAlertInfo = function()
			{
				// Fill with host
				var host = this.notificationInfos.host;

				if(this.notificationType == 'html')
				{
					// Open new links in new tab and close window
					try
					{
						var gIFrame = document.getElementById('pxl-iframe');
						//gIFrame.setAttribute('src', this.notificationInfos['html']);
						gIFrame.loadURI(this.notificationInfos['html']);

						// Create reflection window for opener
						/*
						gReflectionIFrame = document.getElementById('pxl-iframe-reflection');
						gIFrame.contentWindow.opener = gReflectionIFrame.contentWindow;
						gReflectionIFrame.contentWindow.focus = function()
							{ 
								gAlertListener.observe(null, "alertclickcallback", gAlertCookie);
							};
						*/
					}
					catch(e) { }
				}

				var fromLabel = document.getElementById('pxl-notification-from');
				if(fromLabel) fromLabel.value += host;
				var disableMenuitem = document.getElementById('pxl-notification-disable');
				if(disableMenuitem) disableMenuitem.label += host;

				try {
				var animationTime = this.PXLH5NPermissions.Prefs_getInt('animationTime');
				} catch(e) { alert(e); }
				if(!animationTime) animationTime = 500;

				// Do setTimeout using nsITimer
				var timer = Components.classes["@mozilla.org/timer;1"]
					.createInstance(Components.interfaces.nsITimer);
				var callback = function() { gSlideIncrement = Math.ceil(gFinalSize*gSlideTime/animationTime); };
				timer.initWithCallback({'notify': callback}, 0, Components.interfaces.nsITimer.TYPE_ONE_SHOT);
			}

			// Bypass onload
			/* AMO Remove window.onload attribute to use it further */
			// ONLOAD - var _onload = document.documentElement.getAttribute('onload');
			// ONLOAD - document.documentElement.setAttribute('onload', '');

			// Use addEventListener instead of onload
			window.addEventListener(
				'load',
				function()
				{
					// Our code first
					try
					{
						PXLH5NAlertWindow.prefillAlertInfo();
					}
					catch(e) { }

					// ONLOAD - // Default code then
					// ONLOAD - if(typeof(_onload) == 'string')
					// ONLOAD - {
					// ONLOAD - 	try
					// ONLOAD - 	{
					// ONLOAD - 		/* AMO Call window.onload event written as an attribue */
					// ONLOAD - 		/* AMO See firefox view-source:chrome://global/content/alerts/alert.xul */
					// ONLOAD - 		eval(_onload);
					// ONLOAD - 	}
					// ONLOAD - 	catch(e) { }
					// ONLOAD - }
				},
				true
			);

		}
	}
}

PXLH5NAlertWindow.init();

