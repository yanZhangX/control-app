/*
 * @Author: your name
 * @Date: 2020-11-11 22:30:07
 * @LastEditTime: 2020-11-15 22:57:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \control-app\src\api\form.js
 */
import request from '@/utils/request'

// 已填写表单列表
export function formListAready(params) {
  return request({
    url: '/api/v1/form/listUserFormData',
    method: 'get',
    params
  })
}
// 获取表单详情
export function getTemplate(params) {
  return request({
    url: '/api/v1/form/app/getTemplate',
    method: 'get',
    params
  })
}
// 获取模板列表
export function getTemplateList(params) {
  return request({
    url: '/api/v1/form/getTemplateList',
    method: 'get',
    params
  })
}
// 图片上传
export function fileUpload(data) {
  return request({
    url: '/api/v1/form/fileUpload',
    method: 'post',
    data
  })
}
// 保存表单数据
export function saveForm(data) {
  return request({
    url: '/api/v1/form/addData',
    method: 'post',
    data
  })
}
// 获取用户填写表单数据
export function getUserFromData(params) {
  return request({
    url: '/api/v1/form/getUserFromData',
    method: 'get',
    params
  })
}
// 修改用户填写from数据
export function updateUserFromData(data) {
  return request({
    url: '/api/v1/form/updateUserFromData',
    method: 'post',
    data
  })
}
