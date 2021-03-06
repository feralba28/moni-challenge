import { AxiosResponse } from 'axios'
import { useEffect } from 'react'

export const useAsync = (
  asyncFn: () => Promise<AxiosResponse<any, any>>,
  successFunction: Function,
  returnFunction: Function,
  dependencies: any[] = []
) => {
  useEffect(() => {
    let isActive = true
    asyncFn().then((result) => {
      if (isActive) successFunction(result)
    })
    return () => {
      returnFunction && returnFunction()
      isActive = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}
