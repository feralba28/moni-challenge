import { AxiosResponse } from 'axios'

export interface AxiosCall<T> {
  call: Promise<void | AxiosResponse<T>>
  controller?: AbortController
}
