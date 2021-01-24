
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
export default {
   checkPhone,
    numberFormat,
    getMonth,
    checkWxNum
}