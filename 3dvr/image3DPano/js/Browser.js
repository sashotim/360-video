var Browser = function() {

		function version () {
				var version = 999; // we assume a sane browser
				if (navigator.appVersion.indexOf("MSIE") != -1)
				// bah, IE again, lets downgrade version number
				version = parseFloat(navigator.appVersion.split("MSIE")[1]);
				return version;
		};	

		function isIE		(){ return /*@cc_on!@*/false && version() <= 9};

		function isIOS		(){ return (navigator.platform == "iPad" || navigator.platform == "iPhone" || navigator.platform == "iPod" || navigator.platform == "iPhone Simulator" || navigator.platform == "iPad Simulator") };
		function isIPAD		(){ return (navigator.platform == "iPad" || navigator.platform == "iPad Simulator") };
		function isIPHONE	(){ return  (navigator.platform == "iPhone" || navigator.platform == "iPod" || navigator.platform == "iPhone Simulator") };
		function isFF		(){ return navigator.userAgent.toLowerCase().indexOf('firefox') > -1 };
		function isSafari	(){ return (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) };
		function isAndroid	(){ return navigator.userAgent.match(/(Android)/) };
		function isPhone		(){ return navigator.userAgent.match(/(iPhone|iPod|Android|BlackBerry)/) };
		function isDevice	(){ return isPhone() || isIPAD() };
		function isFakePhone	(){ return ( (window.location + "").indexOf( '?mobile' ) !== -1 ) || ( (window.location + "").indexOf( '&mobile' ) !== -1 ) };
		function isMobile	(){ return isPhone() || isFakePhone() };

		function VRready (){ return navigator.mozGetVRDevices || navigator.getVRDevices };

		function transformVendor (){
			var property	= "Transform",
				prefixes	= ['Moz', 'ms', 'Webkit', 'O'],
				transform	= "";

			for (var i=0, j=prefixes.length; i < j; i++) {
				if (typeof document.body.style[prefixes[i]+property] !== 'undefined') {

					transform = prefixes[i] + "Transform";
				}
			}

			if	(transform === "") transform = "msTransform";

			return transform;
		};

		function transformVendorHyph (){
			return transformVendor.replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-');
		};

		function hasInputPlaceholder (){ 
			return 'placeholder' in document.createElement('input');
		};

		return {
			isIE: isIE,
			isIPAD: isIPAD,
			isIPHONE: isIPHONE,
			isFF: isFF,
			isSafari: isSafari,
			isAndroid: isAndroid,
			isPhone: isPhone,
			isDevice: isDevice,
			isFakePhone: isFakePhone,
			isMobile: isMobile,
			VRready: VRready
		};

}();
