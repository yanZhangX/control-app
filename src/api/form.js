import request from '@/utils/request'

export function listUserFormData(params) {
  return request({
    url: '/api/v1/form/listUserFormData',
    method: 'get',
    params
  })
}
