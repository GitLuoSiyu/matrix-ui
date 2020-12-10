module.exports = {
    // 工具链版本检查
    verson: function () {
        const currentVersion = '0.0.1';
        console.log(`Loreal Version ${currentVersion}`)
    },

    // 页面跳转
    navigate: function (url, type, success, fail, complete) {
        if (!type) {
            type = 'navigateTo';
        }
        if (!success) {
            success = function () {};
        }
        if (!fail) {
            fail = function () {};
        }
        if (!complete) {
            complete = function () {};
        }
        switch (type) {
            case 'navigateTo':
                wx.navigateTo({
                    url: url,
                    success: success,
                    fail: fail,
                    complete: complete
                });
                break;
            case 'redirectTo':
                wx.redirectTo({
                    url: url,
                    success: success,
                    fail: fail,
                    complete: complete
                });
                break;
            case 'switchTab':
                wx.switchTab({
                    url: url,
                    success: success,
                    fail: fail,
                    complete: complete
                });
                break;
            case 'reLaunch':
                wx.reLaunch({
                    url: url,
                    success: success,
                    fail: fail,
                    complete: complete
                });
                break;
        }
    },

    // 返回
    back: function (delta) {
        if (!delta) {
            delta = 1;
        }
        wx.navigateBack({
            delta: delta
        });
    },

    // --- 数据缓存 ---
    setStorage: function (data) {
        try {
            for (let k in data) {
                wx.setStorageSync(k, data[k] + '');
            }
            return true;
        } catch (e) {
            return false;
        }
    },
    getStorage: function (keyName) {
        try {
            var tmpVal = wx.getStorageSync(keyName);
            if (tmpVal == '') {
                return false;
            }
            return tmpVal;
        } catch (e) {
            return false;
        }
    },
    removeStorage: function (keyName) {
        try {
            wx.removeStorageSync(keyName);
            return true;
        } catch (e) {
            return false;
        }
    },
    clearStorage: function () {
        try {
            wx.clearStorageSync();
        } catch (e) {}
    },

    system: function () {
        try {
            var res = wx.getSystemInfoSync();
            var iPhoneXBottom = 0;
            res.model = res.model.replace(' ', '');
            res.model = res.model.toLowerCase();
            if (res.model.indexOf('iphonex') != -1 || res.model.indexOf('iphone11') != -1) {
                res.iPhoneXBottomHeightRpx = 50;
                res.iPhoneXBottomHeightPx = 25;
            } else {
                res.iPhoneXBottomHeightRpx = 0;
                res.iPhoneXBottomHeightPx = 0;
            }
            res.rpx2px = 750 / res.windowWidth;
            return res;
        } catch (e) {
            return null;
        }
    },

    // 数组合并
    arrayConcat: function () {
        var tmpArr = [];
        for (let i = 0; i < arguments.length; i++) {
            tmpArr = tmpArr.concat(arguments[i]);
        }
        return tmpArr;
    },
    arrayDrop: function (array, index, howmany) {
        if (!index) {
            index = 0;
        }
        if (!howmany) {
            howmany = 1;
        }
        array.splice(index, howmany);
        return array;
    },
    arrayIndexOf: function (arr, needFind) {
        var index = -1;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == needFind) {
                index = i;
                return i;
            }
        }
        return index;
    },
    arrayDifference: function (a, b) {
        const set = new Set(b);
        return a.filter(x => !set.has(x));
    },
    arrayShuffle: function (arr) {
        let l = arr.length;
        while (l) {
            const i = Math.floor(Math.random() * l--);
            [arr[l], arr[i]] = [arr[i], arr[l]];
            console.log(i);
        }
        return arr;
    },
    arraySum: function (arr) {
        return arr.reduce((acc, val) => acc + val, 0);
    },
    arrayAvg: function (arr) {
        return arr.reduce((acc, val) => acc + val, 0) / arr.length;
    },
    arrayEach: function (arr, fun) {
        for (let i = 0; i < arr.length; i++) {
            fun(arr[i], i);
        }
    },

    // 时间戳转 YY-mm-dd HH:ii:ss
    toDate: function (timeStamp, returnType) {
        timeStamp = parseInt(timeStamp);
        var date = new Date();
        if (timeStamp < 90000000000) {
            date.setTime(timeStamp * 1000);
        } else {
            date.setTime(timeStamp);
        }
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        if (returnType == 'str') {
            return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
        }
        return [y, m, d, h, minute, second];
    },

    // 字符串转时间戳
    toTimeStamp: function (timeStamp) {
        var reg = /^([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
        var res = timeStamp.match(reg);
        if (res == null) {
            var reg2 = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4}) ([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
            var res2 = timeStamp.match(reg2);
            if (res2 == null) {
                console.log('时间格式错误 E001');
                return false;
            }
            var year = parseInt(res2[3]);
            var month = parseInt(res2[1]);
            var day = parseInt(res2[2]);
            var h = parseInt(res2[4]);
            var i = parseInt(res2[5]);
            var s = parseInt(res2[6]);
        } else {
            var year = parseInt(res[1]);
            var month = parseInt(res[2]);
            var day = parseInt(res[3]);
            var h = parseInt(res[4]);
            var i = parseInt(res[5]);
            var s = parseInt(res[6]);
        }
        if (year < 1000) {
            console.log('时间格式错误');
            return false;
        }
        if (h < 0 || h > 24) {
            console.log('时间格式错误');
            return false;
        }
        if (i < 0 || i > 60) {
            console.log('时间格式错误');
            return false;
        }
        if (s < 0 || s > 60) {
            console.log('时间格式错误');
            return false;
        }
        return Date.parse(new Date(year, month - 1, day, h, i, s));
    },

    // 对象操作
    assign: function (obj, key, val) {
        obj[key] = val;
    },
    removeByKey: function (obj, key) {
        delete obj[key];
    },
    each: function (obj, func) {
        for (let k in obj) {
            func(k, obj[k]);
        }
    },
    isEmptyObj: function (obj) {
        return JSON.stringify(obj) === '{}';
    }
}