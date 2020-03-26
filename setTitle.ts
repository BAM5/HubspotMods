/**
	Note: This plugin is written with typescript. To compile to javascript goto
	https://www.typescriptlang.org/play/

	Usage:
		To install this mod into the hubspot tracking script just call the
		setTitleMod method with the configuration you want to get the plugin
		function. Then take that plugin function and push it to window._hsq.
		This can be done before or after the hubspot tracking script is loaded.

		This line will install the plugin

		(window._hsq = window._hsq || []).push( setTitleMod(true) );

		Now page titles can be set like so

		window._hsq.push( ["setPath", "/user/39892358"] );
		window._hsq.push( ["setTitle", `${user.name}'s Profile`] );
		window._hsq.push( ["trackPageView"] );

		setTitle will set the title for the page when tracking a page view.
		However if setTitle is never called or set to be a falsey value
		(_hsq.push(["setTitle", undefined])) trackPageView will default back to
		document.title value like the plugin was never installed.

	autoReset:boolean
		If true then the title be cleared whenever trackPageView is called. This
		means setTitle will only set the title for the next page view tracking
		and not subsequent page views.
*/
window.setTitleMod = (autoReset:boolean = true)=>(i:any, hstc:any)=>{
	hstc.tracking.Tracker.prototype.setTitle = function(title:string){
		this.title = title;
	};

	const _getPageInfo:()=>{[key:string]:string} = hstc.tracking.Tracker.prototype._getPageInfo;
	hstc.tracking.Tracker.prototype._getPageInfo = function(){
		const info = _getPageInfo.call(this);
		if(this.title){
			info.t = this.title;
			if(autoReset) this.title = undefined;
		}
		return info;
	};
};
