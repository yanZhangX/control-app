/*
 * @Author: your name
 * @Date: 2020-11-11 22:30:07
 * @LastEditTime: 2020-11-11 22:57:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \control-app\src\api\form.js
 */
import request from '@/utils/request'

export function listUserFormData(params) {
  return request({
    url: '/api/v1/form/listUserFormData',
    method: 'get',
    params
  })
}
export function listUserFormDetail(params) {
  return request({
    url: '/api/v1/form/getUserFromData',
    method: 'get',
    params
  })
}
