import { AxiosCall } from '@/models/axios-call.model'
import { User } from '@/models/user.model'
import axios, { AxiosResponse } from 'axios'

export const api = axios.create({
  baseURL: 'https://wired-torus-98413.firebaseio.com',
})

export const getUsers = (): AxiosCall<any> => {
  const controller = new AbortController()

  const call: Promise<void | AxiosResponse<any>> = api
    .get('/users.json', {
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

export const postUser = ({ user }: { user: User }): AxiosCall<any> => {
  const controller = new AbortController()

  const data = JSON.stringify(user)

  const call: Promise<void | AxiosResponse<any>> = api
    .post('/users.json', data, {
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
    call: call,
    controller: controller,
  }
}

export const updateUser = ({
  id,
  user,
}: {
  id: string
  user: User
}): AxiosCall<any> => {
  const controller = new AbortController()

  const data = JSON.stringify(user)

  const call: Promise<void | AxiosResponse<any>> = api
    .put(`/users/${id}.json`, data, {
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
    controller: controller,
  }
}
