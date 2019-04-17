/**
 * @method getDateOrTime 获取对应时间日期
 * @param {number} time 时间原始数据 必填
 * @param {string} type 获取的日期类型   year  month  date  date-hour   date-minute  date-second  不必填
 * @param {string} str - / zh 获取日期的间隔方式  例如‘-’ ‘/’ ‘年’ 不必填
 * @param {boolean} hasZero 是否用“0”补齐  默认为是  不必填
 * @return {str} dateTime 返回的目标格式
 */
export const getDateOrTime = (time, str = "-", type = "date", hasZero = true) => {
    let dateTime = "";
    if (time) {
        const sourceTime = new Date(time);
        let year = sourceTime.getFullYear();
        let month = sourceTime.getMonth() + 1;
        let day = sourceTime.getDate();
        let hour = sourceTime.getHours();
        let minute = sourceTime.getMinutes();
        let second = sourceTime.getSeconds();
        if (hasZero) {
            month = month < 10 ? ("0" + month) : month;
            day = day < 10 ? ("0" + day) : day;
            hour = hour < 10 ? ("0" + hour) : hour;
            minute = minute < 10 ? ("0" + minute) : minute;
            second = second < 10 ? ("0" + second) : second;
        }
        switch (type) {
            case "year":
                dateTime = year + "年";
                break;
            case "month":
                if (str === "zh") {
                    dateTime = year + "年" + month + "月";
                } else {
                    dateTime = year + str + month;
                }
                break;
            case "date":
                if (str === "zh") {
                    dateTime = year + "年" + month + "月" + day + "日";
                } else {
                    dateTime = year + str + month + str + day;
                }
                break;
            case "date-hour":
                if (str === "zh") {
                    dateTime = year + "年" + month + "月" + day + "日" + hour + "时";
                } else {
                    dateTime = year + str + month + str + day + " " + hour;
                }
                break;
            case "date-minute":
                if (str === "zh") {
                    dateTime = year + "年" + month + "月" + day + "日" + hour + "时" + minute + "分";
                } else {
                    dateTime = year + str + month + str + day + " " + hour + ":" + minute;
                }
                break;
            case "date-second":
                if (str === "zh") {
                    dateTime = year + "年" + month + "月" + day + "日" + hour + "时" + minute + "分" + second + "秒";
                } else {
                    dateTime = year + str + month + str + day + " " + hour + ":" + minute + ":" + second;
                }
                break;
            default:
                if (str === "zh") {
                    dateTime = year + "年" + month + "月" + day + "日";
                } else {
                    dateTime = year + str + month + str + day;
                }
                break;
        }
    }
    return dateTime;
};

export function formatNum(str){
    let newStr = "";
    let count = 0;
    str = str+"";
    if(str.indexOf(".")==-1){
        for(let i=str.length-1;i>=0;i--){
            if(count % 3 == 0 && count != 0){
                newStr = str.charAt(i) + "," + newStr;
            }else{
                newStr = str.charAt(i) + newStr;
            }
            count++;
        }
        str = newStr + ".00"; //自动补小数点后两位
    }
    else
    {
        for(let i = str.indexOf(".")-1;i>=0;i--){
            if(count % 3 == 0 && count != 0){
                newStr = str.charAt(i) + "," + newStr;
            }else{
                newStr = str.charAt(i) + newStr; //逐个字符相接起来
            }
            count++;
        }
        str = newStr + (str + "00").substr((str + "00").indexOf("."),3);
    }
    return str;
}