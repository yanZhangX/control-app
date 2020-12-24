/*
 * @Author: xiangty
 * @Date: 2020-11-29 17:32:04
 * @LastEditTime: 2020-12-06 20:34:34
 * @LastEditors: Please set LastEditors
 * @Description: 微信config
 * @FilePath: \control-app\src\utils\wxInit.js
 */
import wx from 'weixin-js-sdk'
import { getJsapiSignature } from '@/api/form.js'
const httpUrl = window.location.href.split('#')[0]

export function wxConfig() {
  const params = { url: httpUrl }
  getJsapiSignature(params).then((res) => {
    const res_conf = res.data
    wx.config({
      debug: false,
      appId: res_conf.appId,
      timestamp: res_conf.timestamp,
      nonceStr: res_conf.nonceStr,
      signature: res_conf.signature,
      jsApiList: ['getLocation', 'openLocation'] // 'scanQRCode', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareWeibo',
    })
  })
}
export function wxShare(options, callback) {
  const share_option = {
    title: options.title, // 分享标题
    desc: options.desc, // 分享描述
    link: options.link, // 分享链接
    imgUrl: options.imgUrl, // 分享图标
    success: function() {
      callback ? callback() : ''
      // alert("分享成功")
    },
    cancel: function() {
      // alert("分享失败,您取消了分享!")
    }
  }
  wx.ready(function() {
    wx.onMenuShareTimeline(share_option)
    // 微信分享菜单测试
    wx.onMenuShareAppMessage(share_option)
    wx.onMenuShareQQ(share_option)
    wx.onMenuShareWeibo(share_option)
  })
}
export function getLocation() {
  return new Promise((resolve, reject) => {
    wx.ready(function() {
      wx.getLocation({
        type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function(res) {
          console.log('定位中')
          const params = [res.longitude, res.latitude]
          resolve(params)
        },
        fail: function(error) {
          console.log(error)
          reject(new Error('error'))
        },
        cancel: function(res) {
          alert('无法获取您的城市信息,请允许获取您的位置信息！')
        }
      })
    })
  })
}
export function openLocation(lat, lng, addr, detail, url) {
  wx.openLocation({
    latitude: parseFloat(lat), // 纬度，浮点数，范围为90 ~ -90
    longitude: parseFloat(lng), // 经度，浮点数，范围为180 ~ -180。
    name: addr, // 位置名
    address: detail, // 地址详情说明
    scale: 14, // 地图缩放级别,整形值,范围从1~28。默认为最大
    infoUrl: url // 在查看位置界面底部显示的超链接,可点击跳转
  })
}
