/**
 *
 * Copyright 2015-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import 'whatwg-fetch';
import getUrl from './UrlUtil';
import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';
let urls = "http://47.99.198.85";
const METHODS = {
    GET: 'get',
    POST: 'POST',
    PUT: 'put',
    DELETE: 'delete'
};

export const request = (url, params, headers = {}, method = METHODS.GET, mode = false) => {
    // console.log(url, params, method)
    url = urls + url;
    let options = {
        headers: {
            // 'Content-Type': jsonType ? 'application/json;charset=UTF-8' : 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            ...headers
        },
        method: method,
        credentials: 'include',
    };
    if (mode) {
        options = {...options, mode: "cors"};
        delete options.credentials;
    }
    // alert(url)
    if (method !== METHODS.GET && params) {
        let formData = new FormData();
        for (let key in params) {
            (typeof params[key]) === 'object' && key !== 'file' ? params[key] = JSON.stringify(params[key]) : params[key];
            params[key] !== undefined && formData.append(key, params[key]);
        }
        // console.log(formData.keys());
        options.body = formData;
    } else if (method === METHODS.GET && params) {
        const newParams = (~url.lastIndexOf('?') ? '&' : '?') + queryString.stringify(params);
        url += newParams;
    }
    // url = window.config.context + url;
    // alert(url)
    return checkRespStatus(getUrl(url), options);
};

export const post = (url, params, headers) => request(url, params, headers, METHODS.POST);

export const postModeCors = (url, params, headers) => request(url, params, headers, METHODS.POST, true);

const checkRespStatus = (url,options) => {
    return new Promise((resolve, reject) => {
    fetch(url,options)
          .then((response) => {
                // alert("获取成功")
              // alert(JSON.stringify(response))
                if (response.status === 200) {
                  response.json().then((res) => {
                        if(res.code === "0000"){
                             resolve(res);
                        }else{
                             reject(res);
                        }
                  })
                } else {
                  reject(response);
                }
          }).catch((response) => {
            // alert("数据获取错误")
            //     alert(JSON.stringify(response))
          })
//
//    fetch(url, options).then(()=>{
//        if (respPromise && respPromise.status === 200) {
//                        respPromise.json().then((res) => {
//                            if (res.code === "0000") {
//                                if(!res.data){
//                                    res.data=[]
//                                }
//                                resolve(res);
//                            }else {
//                                reject(res);
//                            }
//                        })
//                } else {
//                    // Message.error(respPromise.statusText);//公共catch处理
//                    reject(respPromise);//交给子组件catch处理
//                }
//    })
//        if (respPromise && respPromise.status === 200) {
//                respPromise.json().then((res) => {
//                    if (res.code === "0000") {
//                        if(!res.data){
//                            res.data=[]
//                        }
//                        resolve(res);
//                    }else {
//                        reject(res);
//                    }
//                })
//        } else {
//            // Message.error(respPromise.statusText);//公共catch处理
//            reject(respPromise);//交给子组件catch处理
//        }
    })
};

//const request = (url, method, body) => {
//  let isOk;
//  return new Promise((resolve, reject) => {
//    fetch(getUrl(url), {
//      method,
//      headers: {
//        'Content-Type': 'application/json;charset=utf-8'
//      },
//      body
//    })
//      .then((response) => {
//        if (response.code === "0000") {
//          isOk = true;
//        } else {
//          isOk = false;
//        }
//        return response.json();
//      })
//      .then((responseData) => {
//        if (isOk) {
//          resolve(responseData);
//        } else {
//          reject(responseData);
//        }
//      })
//      .catch((error) => {
//        reject(error);
//      });
//  });
//};

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
}
