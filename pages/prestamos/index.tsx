import type { NextPage } from 'next'
import Head from 'next/head'

import { Formik, Form, FormikHelpers } from 'formik'
import ClipLoader from 'react-spinners/ClipLoader'

import { createScoreAdapter } from '@/adapters/score.adapter'
import { createPostUserAdapter } from '@/adapters/user.adapter'
import Button from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import PageLayout from '@/components/PageLayout'
import useFetch from '@/hooks/useFetch'
import { FormValues } from '@/models/form-values.model'
import { postUser } from '@/services/users.service'
import { getScoring } from '@/services/scoring.service'
import { userSchema } from '@/validations/user.validation'

const initialValues: FormValues = {
  firstName: '',
  lastName: '',
  gender: '',
  email: '',
  dni: '',
}

const Prestamos: NextPage = () => {
  const { callEndpoint: callGetScoring } = useFetch()
  const { callEndpoint: callPostUser } = useFetch()

  const onSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      const getResponse = await callGetScoring(getScoring({ dni: values.dni }))
      const score = createScoreAdapter(getResponse)
      const postResponse = await callPostUser(
        postUser({
          user: createPostUserAdapter(values, score.status),
        })
      )

      if (postResponse.status == 200) {
        console.log(
          `Solicitud enviada con éxito. El estado de su solicitud es: ${
            score.status === 'APROVED' ? 'APROBADA' : 'RECHAZADA'
          }`
        )
      }

      setSubmitting(false)
      resetForm()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Head>
        <title>Préstamos</title>
      </Head>

      <PageLayout>
        <main className="container mx-auto px-5 py-8 grow">
          <Formik
            initialValues={initialValues}
            validationSchema={userSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, errors }) => (
              <Form className="max-w-md mx-auto bg-white rounded-lg p-8 flex flex-col gap-2 shadow-md lg:max-w-lg lg:p-10">
                <h1 className="text-center text-primary-dark text-xl font-bold py-2 lg:text-2xl">
                  Solicitá tu préstamo
                </h1>

                <TextField label="Nombre" name="firstName" type="text" />

                <TextField label="Apellido" name="lastName" type="text" />

                <SelectField label="Género" name="gender">
                  <option value="">Seleccione un género</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="No Binario">No Binario</option>
                </SelectField>

                <TextField label="Email" name="email" type="text" />

                <TextField label="DNI" name="dni" type="number" />

                <Button variant="accent" type="submit" disabled={isSubmitting}>
                  Solicitar
                </Button>

                {isSubmitting && (
                  <div className="flex justify-center mt-1">
                    <ClipLoader loading={true} size={32} color="#5493e7" />
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </main>
      </PageLayout>
    </>
  )
}

export default Prestamos
