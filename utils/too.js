export function deepMerge(a, b) {
	let k;
	for (k in b) {
		a[k] =
			a[k] && a[k].toString() === "[object Object]" ? deepMerge(a[k], b[k]) : (a[k] = b[k]);
	}
	return a;
}

export function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

export function platform() {
	var agent = navigator.userAgent.toLowerCase();
	var android = agent.indexOf("android");
	var iphone = agent.indexOf("iphone");
	var ipad = agent.indexOf("ipad");

	if (android != -1) {
		return "android";
	}
	if (iphone != -1 || ipad != -1) {
		return "ios";
	}
}
