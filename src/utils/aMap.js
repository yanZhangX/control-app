/*
 * @Author: your name
 * @Date: 2020-11-29 22:23:18
 * @LastEditTime: 2020-11-29 23:40:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \control-app\src\utils\aMap.js
 */
export default {
  init: function() {
    const key = '6a2172f9833553f11a384c436ca1f94d'
    const AMapURL = `https://webapi.amap.com/maps?v=1.4.15&key=${key}&plugin=AMap.Geocoder`
    return new Promise(function(resolve, reject) {
      // 如果已加载直接返回
      if (typeof window.AMap !== 'undefined') {
        resolve(window.AMap)
        return true
      }
      window.onAMapCallback = function() {
        resolve(window.AMap)
      }
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = AMapURL
      script.onerror = reject
      document.head.appendChild(script)
    })
  }
}
