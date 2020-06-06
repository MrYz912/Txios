/**
 * 真正发送请求的文件，xhr封装
 */

import { TxiosRequestConfig, TxiosPromise, TxiosResponse } from '../types'
import { createError } from '../helpers/error'
import { parseHeaders } from '../helpers/headers'

export default function xhr(config: TxiosRequestConfig): TxiosPromise {
  return new Promise((resolve, reject) => {
    // 从用户传递的 config 中解构数据
    const { url, method, data, headers, timeout, responsetype } = config
    // 创建 XHR 实例(每一个请求都会创建一个 XHR 实例)
    const request = new XMLHttpRequest()

    // 若用户配置了这些属性，则配置到 XHR 实例中
    responsetype && (request.responseType = responsetype)
    timeout && (request.timeout = timeout)

    // 打开连接
    request.open(method!.toUpperCase(), url!, true)

    // 设置请求头
    Object.keys(headers).forEach((name) => {
      // 当数据为 null 时删除 Content-Type，由浏览器决定数据类型
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    // 发送数据
    request.send(data)

    // 处理响应
    // 处理状态码
    request.onreadystatechange = function onLoad() {
      /**
       * 0	UNSENT	代理被创建，但尚未调用 open() 方法。
       * 1	OPENED	open() 方法已经被调用。
       * 2	HEADERS_RECEIVED	send() 方法已经被调用，并且头部和状态已经可获得。
       * 3	LOADING	下载中； responseText 属性已经包含部分数据。
       * 4	DONE	下载操作已完成。
       */
      if (request.readyState === 4) {
        return
      }

      if (request.status === 0) {
        return
      }

      // 处理响应 headers 以及响应数据
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData =
        responsetype && responsetype !== 'text' ? request.response : request.responseText
      const response: TxiosResponse = {
        data: responseData,
        headers: responseHeaders,
        status: request.status,
        statusText: request.statusText,
        config,
        request,
      }
      handleResponse(response)
    }

    // 处理错误，返回 TxiosError
    request.onerror = function onError() {
      reject(createError('An error occurred during the transaction', config, null, request))
    }

    // 处理超时，返回 TxiosError
    request.ontimeout = function onTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }

    // 默认的 response 处理方法，当且仅当状态码在 [200， 300) 之间才会正确返回数据，否则返回 TxiosError
    function handleResponse(response: TxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request fail with status ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
