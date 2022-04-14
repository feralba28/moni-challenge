import { FormValues } from '@/models/form-values.model'
import { Score } from '@/models/score.model'
import { User } from '@/models/user.model'

export const createPostUserAdapter = (
  values: FormValues,
  score: Score
): User => {
  const user: User = {
    dni: values.dni.toString(),
    email: values.email,
    genre: values.gender,
    last: values.lastName,
    loanStatus: score.status,
    name: values.firstName,
  }
  
  return user
}
