import { AxiosRequestConfig } from 'axios'
import type { Score } from '@/models/score.model'
import type { NextApiRequest, NextApiResponse } from 'next'
import { api } from './axios.config'

const getScore = ({ dni }: { dni: string | string[] }): AxiosRequestConfig => {
  return {
    method: 'get',
    url: `/scoring/pre-score/${dni}`,
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Score>
) {
  const { dni } = req.query

  api(getScore({ dni }))
    .then((response) => {
      res.status(200).json(response.data)
    })
    .catch((error) => {
      res.status(500).json(error.message)
    })
}
