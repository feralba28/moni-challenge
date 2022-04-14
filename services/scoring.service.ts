import axios, { AxiosResponse } from 'axios'
import { AxiosCall } from '@/models/axios-call.model'

export const getScoring = ({ dni }: { dni: string }): AxiosCall<any> => {
  const controller = new AbortController()

  const call: Promise<void | AxiosResponse<any>> = axios
    .get(`/api/scoring?dni=${dni}`, {
      signal: controller.signal,
    })
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.error(error.message)
    })

  return {
    call: call,
    controller,
  }
}
