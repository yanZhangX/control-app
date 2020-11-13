/*
 * @Author: your name
 * @Date: 2020-11-11 22:30:07
 * @LastEditTime: 2020-11-14 00:46:06
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
export function fileUpload(data) {
  return request({
    url: '/api/v1/form/fileUpload',
    method: 'post',
    data
  })
}
export function saveForm(data) {
  return request({
    url: '/api/v1/form/addData',
    method: 'post',
    data
  })
}
