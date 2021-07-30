import request from '@/utils/request'

export function interface_list(data) {
  return request({
    url: '/v1/interface/list',
    method: 'get',
    data
  })
}

export function interface_update(data) {
  return request({
    url: '/v1/interface/update',
    method: 'post',
    data
  })
}

export function interface_delete(data) {
  return request({
    url: '/v1/interface/delete',
    method: 'post',
    data
  })
}