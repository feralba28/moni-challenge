import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'

import { useState } from 'react'
import { AxiosResponse } from 'axios'
import { Formik, Form, FormikHelpers } from 'formik'
import ClipLoader from 'react-spinners/ClipLoader'

import { formatStatus } from '@/adapters/score.adapter'
import {
  createPostUserAdapter,
  createUserAdapter,
  createUsersAdapter,
} from '@/adapters/user.adapter'
import Button from '@/components/Button'
import CloseIcon from '@/components/CloseIcon'
import { SelectField, TextField } from '@/components/Fields'
import Modal from '@/components/Modal'
import PageLayout from '@/components/PageLayout'
import { Body, Cell, Header, Item, Row, Table } from '@/components/Table'
import TextButton from '@/components/TextButton'
import useFetch from '@/hooks/useFetch'
import { FormValues } from '@/models/form-values.model'
import { User, Users } from '@/models/user.model'
import { deleteUser, getUsers, updateUser } from '@/services/users.service'
import { userSchema } from '@/validations/user.validation'

const tableColums: Array<string> = [
  'Nombre',
  'Apellido',
  'DNI',
  'Género',
  'Email',
  'Estado',
  'Acciones',
]

const Solicitudes: NextPage<{ users: any }> = ({ users: usersProp }) => {
  const [users, setUsers] = useState<Users>(() => createUsersAdapter(usersProp))
  const [isModal, setIsModal] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<{
    id: string
    user: User
  } | null>(null)

  const { loading, callEndpoint: callDeleteUser } = useFetch()
  const { callEndpoint: callUpdateUser } = useFetch()

  const handleOnDelete = async (id: string) => {
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

  const handleOnUpdate = (id: string) => {
    setSelectedUser({ id: id, user: users.get(id)! })
    setIsModal(true)
  }

  const onSubmitUpdate = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    const {
      id,
      user: { loanStatus },
    } = selectedUser!
    const user = createPostUserAdapter(values, loanStatus)
    try {
      const response = await callUpdateUser(updateUser({ id: id, user: user }))
      if (response.status == 200) {
        const draft = users
        draft.set(id, createUserAdapter(response.data))
        setUsers(draft)
        console.log('Los datos se actualizaron correctamente', response.data)
      }
    } catch (error) {
      console.error(error)
    }
    setSubmitting(false)
    setIsModal(false)
  }

  return (
    <>
      <Head>
        <title>Solicitudes</title>
      </Head>

      <PageLayout>
        <main className="container mx-auto px-5 py-8 grow">
          {loading && (
            <div className="bg-white/80 fixed inset-0 z-50 h-full flex justify-center items-center">
              <ClipLoader loading={true} size={48} color="#5493e7" />
            </div>
          )}

          {[...users.keys()].length > 0 ? (
            <Table title="Solicitudes">
              <Header colums={tableColums} />
              <Body>
                {[...users.keys()].map((id: string) => {
                  const { name, last, dni, genre, email, loanStatus } =
                    users.get(id)!
                  return (
                    <Row key={id}>
                      <Cell>
                        <Item label="Nombre" value={name} />
                      </Cell>
                      <Cell>
                        <Item label="Apellido" value={last} />
                      </Cell>
                      <Cell>
                        <Item label="DNI" value={dni} />
                      </Cell>
                      <Cell>
                        <Item label="Género" value={genre} />
                      </Cell>
                      <Cell>
                        <Item label="Email" value={email} />
                      </Cell>
                      <Cell>
                        <Item label="Estado" value={formatStatus(loanStatus)} />
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
                              onClick={() => handleOnUpdate(id)}
                            />
                            <TextButton
                              text="Eliminar"
                              variant="warning"
                              onClick={() => handleOnDelete(id)}
                            />
                          </div>
                        </div>
                      </Cell>
                    </Row>
                  )
                })}
              </Body>
            </Table>
          ) : (
            <h1 className="text-center text-primary-dark text-xl font-bold mb-4 lg:text-2xl">
              No hay solicitudes
            </h1>
          )}

          <Modal isModal={isModal}>
            <Formik
              initialValues={{
                firstName: selectedUser?.user.name as string,
                lastName: selectedUser?.user.last as string,
                gender: selectedUser?.user.genre as string,
                email: selectedUser?.user.email as string,
                dni: selectedUser?.user.dni as string,
              }}
              validationSchema={userSchema}
              onSubmit={onSubmitUpdate}
            >
              {({ isSubmitting, errors }) => (
                <Form className="w-full bg-white rounded-lg p-8 flex flex-col gap-2 shadow-md lg:p-10">
                  <div className="flex items-center justify-between">
                    <p className="text-center text-primary-dark text-xl font-bold py-2 lg:text-2xl">
                      Editar solicitud
                    </p>
                    <button
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-md text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => setIsModal(false)}
                    >
                      <CloseIcon />
                    </button>
                  </div>

                  <TextField label="Nombre" name="firstName" type="text" />

                  <TextField label="Apellido" name="lastName" type="text" />

                  <SelectField label="Género" name="gender">
                    <option value="">Seleccione un género</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="No Binario">No Binario</option>
                  </SelectField>

                  <TextField label="Email" name="email" type="text" />

                  <TextField label="DNI" name="dni" type="number" disabled />

                  <Button
                    variant="accent"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Actualizar
                  </Button>

                  {isSubmitting && (
                    <div className="flex justify-center mt-1 lg:mt-2">
                      <ClipLoader loading={true} size={36} color="#5493e7" />
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          </Modal>
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

export default Solicitudes
