export interface User {
  dni: string
  email: string
  genre: string
  last: string
  loanStatus: string
  name: string
}

export type Users = Map<string, User>