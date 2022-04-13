import { AxiosCall } from '@/models/axios-call.model'
import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

const useFetch = () => {
  const [loading, setLoading] = useState(false)
  let controller: AbortController

  const callEndpoint = async (
    axiosCall: AxiosCall<any>
  ): Promise<AxiosResponse> => {
    if (axiosCall.controller) controller = axiosCall.controller

    setLoading(true)

    const result = axiosCall.call
      .then((response) => {
        return response
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoading(false)
      })

    return result as Promise<AxiosResponse>
  }

  useEffect(() => {
    return () => {
      setLoading(false)
      controller && controller.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { loading, callEndpoint }
}

export default useFetch
