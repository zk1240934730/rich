
//手机号验证
const checkPhone = (phone) => {
    if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))) {
        return false;
    }
    return true
}
const checkWxNum = (wxNumber) => {
    if(!/^[a-zA-Z][a-zA-Z\d_-]{5,19}$/.test(wxNumber)) {
        return false
    }
    return true
}
//金额格式化
/* 
        * number：要格式化的数字
        * decimals：保留几位小数
        * dec_point：小数点符号
        * thousands_sep：千分位符号
        * */
const numberFormat = (number, decimals, dec_point, thousands_sep) => {

    number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.ceil(n * k) / k;
        };

    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    var re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
        s[0] = s[0].replace(re, "$1" + sep + "$2");
    }

    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}
//获取月份
const getMonth = () => {
    return new Date().getMonth() + 1
}

const dateFormat = (date) => {
    let currentDate = new Date(),
        currentYear = currentDate.getFullYear(),
        currentMonth = currentDate.getMonth() + 1,
        currentDay = currentDate.getDate(),
        oldDate = new Date(date.replace(/-/g,"/")),
        oldYear = oldDate.getFullYear(),
        oldMonth = oldDate.getMonth() + 1,
        oldDay = oldDate.getDate(),
        formatObj = {};
    //同一天
    if(currentYear == oldYear && currentMonth == oldMonth && currentDay == oldDay) {
        formatObj = {
            day: '今天',
            hour: getDateDiff(oldDate.getTime())
        }
    } else if(currentYear == oldYear && currentMonth == oldMonth && currentDay - 1 == oldDay) {
        formatObj = {
            day: '昨天',
            hour: getDateDiff(oldDate.getTime())
        }
    } else {//不是同一天
        formatObj = {
            day: oldDay < 10 ? '0' + oldDay : oldDay,
            month: oldMonth < 10 ? '0' + oldMonth : oldMonth,
            hour: oldDate.getHours() + '点' + oldDate.getMinutes() + '分'
        }
    }
    return formatObj
}
function getDateDiff(timestamp) {
    // 时间字符串转时间戳    
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    // var halfamonth = day * 15;
    var month = day * 30;
    var year = day * 365;
    var now = new Date().getTime();
    var diffValue = now - timestamp;
    var result;
    if (diffValue < 0) {
        return;
    }
    var yearC = diffValue / year;
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    // var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    if (yearC >= 1) {
        result = "" + parseInt(yearC) + "年前";
    } else if (monthC >= 1) {
        result = "" + parseInt(monthC) + "月前";
    } else if (weekC >= 1) {
        result = "" + parseInt(weekC) + "周前";
    }
    // else if (dayC >= 1) {
    //     result = "" + parseInt(dayC) + "天前";
    // } 
    else if (hourC >= 1) {
        result = "" + parseInt(hourC) + "小时前";
    } else if (minC >= 1) {
        result = "" + parseInt(minC) + "分钟前";
    } else
        result = "刚刚";
    return result;
}
const isWeiXin = () => {
    var ua = window.navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == 'micromessenger';
} 
export default {
   checkPhone,
    numberFormat,
    getMonth,
    checkWxNum,
    dateFormat,
    isWeiXin
}