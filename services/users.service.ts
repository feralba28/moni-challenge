import { User } from '@/models/user.model'
import axios, { AxiosPromise } from 'axios'

export const api = axios.create({
  baseURL: 'https://wired-torus-98413.firebaseio.com',
})

export const getUsers = () => {
  return api
    .get('/users.json')
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error(error.message)
    })
}

export const postUser = ({ user }: { user: User }) => {
  const data = JSON.stringify({
    dni: user.dni,
    email: user.email,
    genre: user.genre,
    last: user.last,
    loanStatus: user.loanStatus,
    name: user.name,
  })

  return api
    .post('/users.json', data)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error(error.message)
    })
}

export const deleteUser = ({ id }: { id: string }) => {
  return api.delete(`/users/${id}.json`).catch((error) => {
    console.error(error.message)
  })
}
