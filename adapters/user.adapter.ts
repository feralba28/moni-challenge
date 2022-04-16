import { FormValues } from '@/models/form-values.model'
import { User, Users } from '@/models/user.model'

export const createPostUserAdapter = (
  values: FormValues,
  status: string
): User => {
  const user: User = {
    dni: values.dni.toString(),
    email: values.email,
    genre: values.gender,
    last: values.lastName,
    loanStatus: status,
    name: values.firstName,
  }

  return user
}

export const createUsersAdapter = (users: any): Users => {
  return users
    ? new Map<string, User>(Object.entries(users))
    : new Map<string, User>()
}

export const createUserAdapter = (user: any): User => {
  return {
    dni: user.dni,
    email: user.email,
    genre: user.genre,
    last: user.last,
    loanStatus: user.loanStatus,
    name: user.name,
  }
}
