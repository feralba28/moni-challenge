import axios, { AxiosPromise } from 'axios'

export const getScoring = ({ dni }: { dni: string }): AxiosPromise => {
  return axios
    .get(`/api/scoring?dni=${dni}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      throw new Error(error.message);
    })
}
