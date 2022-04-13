import { AxiosCall } from '@/models/axios-call.model'
import { User } from '@/models/user.model'
import axios, { AxiosResponse } from 'axios'

export const api = axios.create({
  baseURL: 'https://wired-torus-98413.firebaseio.com',
})

export const getUsers = (): AxiosCall<any> => {
  const controller = new AbortController()

  const call: Promise<AxiosResponse<any>> = api
    .get('/users.json', {
      signal: controller.signal,
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error(error.message)
    })

  return {
    call: call,
    controller,
  }
}

export const postUser = ({ user }: { user: User }): AxiosCall<any> => {
  const controller = new AbortController()

  const data = JSON.stringify({
    dni: user.dni,
    email: user.email,
    genre: user.genre,
    last: user.last,
    loanStatus: user.loanStatus,
    name: user.name,
  })

  const call: Promise<AxiosResponse<any>> = api
    .post('/users.json', data, {
      signal: controller.signal,
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error(error.message)
    })

  return {
    call: call,
    controller,
  }
}

export const deleteUser = ({ id }: { id: string }): AxiosCall<any> => {
  const controller = new AbortController()

  const call: Promise<void | AxiosResponse<any>> = api
    .delete(`/users/${id}.json`, {
      signal: controller.signal,
    })
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.error(error.message)
    })

  return {
    call: call as Promise<AxiosResponse<any>>,
    controller: controller,
  }
}
