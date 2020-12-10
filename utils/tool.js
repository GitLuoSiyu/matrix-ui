// 深度匹配
export function deepMerge(a, b) {
	let k;
	for (k in b) {
		a[k] =
			a[k] && a[k].toString() === "[object Object]" ? deepMerge(a[k], b[k]) : (a[k] = b[k]);
	}
	return a;
}

// 判断浏览器URL 特定的匹配
export function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

// 判断设备平台
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

// 字符串长度计算
export function count(str, countSpace = true) {
	if (countSpace) {
		return str.length;
	}
	return this.removeAllSpace(str).length;
}

// 去除全部空格
export function removeAllSpace(str) {
	return str.replace(/\s+/g, "");
}

// 去除首尾空格
export function trim(str) {
	return str.trim();
}

// 去除左侧空格
export function trimL(str) {
	return str.replace(/^\s+/g, "");
}

// 去除右侧空格
export function trimR(str) {
	return str.replace(/\s+$/g, "");
}

// 字符串搜索
export function search(str, kwd, caseSensitive = true) {
	if (!caseSensitive) {
		kwd = kwd.toLowerCase();
		str = str.toLowerCase();
	}
	return str.indexOf(kwd);
}

// 获取 扩展名
export function getExtension(str) {
	str = str.split('.');
	return str.pop();
}