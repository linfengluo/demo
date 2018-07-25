/**
 * Created by linfengluo@gmail.com on 2018/5/18.
 */

const tools = {
    /** 随机生成固定位数或者一定范围内的字符串数字组合
     * @param {Number} length 范围最小值
     * @param {String} charStr指定的字符串中生成组合
     * @returns {String} 返回字符串结果
     * */
    randomString(length = 4, charStr = null){
        let returnStr = "";

        //随机生成字符
        const autoGetStr = function () {
            const charFun = function () {
                let n = Math.floor(Math.random() * 62)
                if (n < 10) {
                    return n; //1-10
                }
                else if (n < 36) {
                    return String.fromCharCode(n + 55); //A-Z
                }
                else {
                    return String.fromCharCode(n + 61); //a-z
                }
            }
            while (returnStr.length < length) {
                returnStr += charFun();
            }
        };

        //根据指定的字符串中生成组合
        var accordCharStrGet = function () {
            for (var i = 0; i < length; i++) {
                var index = Math.round(Math.random() * (charStr.length - 1));
                returnStr += charStr.substring(index, index + 1);
            }
        };

        if (charStr) {
            accordCharStrGet();
        } else {
            autoGetStr();
        }

        return returnStr;
    },
}

export default tools
