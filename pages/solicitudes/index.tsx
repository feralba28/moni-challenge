import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'

import { useState } from 'react'
import { AxiosResponse } from 'axios'

import { formatStatus } from '@/adapters/score.adapter'
import { createUsersAdapter } from '@/adapters/user.adapter'
import { Body, Cell, Header, Item, Row, Table } from '@/components/Table'
import PageLayout from '@/components/PageLayout'
import useFetch from '@/hooks/useFetch'
import { Users } from '@/models/user.model'
import { deleteUser, getUsers } from '@/services/users.service'
import TextButton from '@/components/TextButton'

const tableColums: Array<string> = [
  'Nombre',
  'Apellido',
  'DNI',
  'Género',
  'Email',
  'Estado',
  'Acciones',
]

const Prestamos: NextPage<{ users: any }> = ({ users: usersProp }) => {
  const [users, setUsers] = useState<Users>(() => createUsersAdapter(usersProp))

  const { loading, callEndpoint: callDeleteUser } = useFetch()

  const handleDelete = async (id: string) => {
    try {
      const response = await callDeleteUser(deleteUser({ id }))
      if (response.status === 200) {
        const draft = users
        draft.delete(id)
        setUsers(draft)
        console.log('Solicitud eliminada con éxito')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdate = (id: string) => {}

  return (
    <>
      <Head>
        <title>Solicitudes</title>
      </Head>

      <PageLayout>
        <main className="container mx-auto px-5 py-8 grow">
          {loading ? (
            <div>spinner</div>
          ) : (
            <Table title="Solicitudes">
              <Header colums={tableColums} />
              <Body>
                {[...users.keys()].map((id: string) => (
                  <Row key={id}>
                    <Cell>
                      <Item label={'Nombre'} value={users.get(id)!.name} />
                    </Cell>
                    <Cell>
                      <Item label={'Apellido'} value={users.get(id)!.last} />
                    </Cell>
                    <Cell>
                      <Item label={'DNI'} value={users.get(id)!.dni} />
                    </Cell>
                    <Cell>
                      <Item label={'Género'} value={users.get(id)!.genre} />
                    </Cell>
                    <Cell>
                      <Item label={'Email'} value={users.get(id)!.email} />
                    </Cell>
                    <Cell>
                      <Item
                        label={'Estado'}
                        value={formatStatus(users.get(id)!.loanStatus)}
                      />
                    </Cell>
                    <Cell>
                      <div className="flex items-center">
                        <span className="inline-block w-1/3 lg:hidden font-bold text-sm text-gray-900">
                          Acciones
                        </span>
                        <div className="w-2/3 flex gap-4">
                          <TextButton
                            text="Editar"
                            variant="accent"
                            onClick={() => handleUpdate}
                          />
                          <TextButton
                            text="Eliminar"
                            variant="warning"
                            onClick={() => handleDelete(id)}
                          />
                        </div>
                      </div>
                    </Cell>
                  </Row>
                ))}
              </Body>
            </Table>
          )}
        </main>
      </PageLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const users = await getUsers()
    .call.then((response) => {
      return (response as AxiosResponse).data
    })
    .catch((err) => {
      console.error(err)
    })

  return {
    props: {
      users: users,
    },
  }
}

export default Prestamos
