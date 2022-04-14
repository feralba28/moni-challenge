import type { NextPage } from 'next'
import Head from 'next/head'

import { Formik, Form, FormikHelpers } from 'formik'

import { SelectField, TextField } from '@/components/Fields'

import Button from '@/components/Button'
import PageLayout from '@/components/PageLayout'
import { FormValues } from '@/models/form-values.model'
import { Score } from '@/models/score.model'
import { User } from '@/models/user.model'
import { userSchema } from '@/validations/user.validation'
import { postUser } from '@/services/users.service'
import { getScoring } from '@/services/scoring.service'

const initialValues: FormValues = {
  firstName: '',
  lastName: '',
  gender: '',
  email: '',
  dni: '',
}

const Prestamos: NextPage = () => {
  const onSubmit = (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    getScoring({ dni: values.dni })
      .then((response) => {
        // const status = response.data.status == 'approve' ? 'APROVED' : 'REJECTED'
        // setFormValues(values)
        // const score: Score = {
        //   status: status,
        // }
        // setScore(score)
        console.log(response)
      })
      .finally(() => {
        setSubmitting(false)
        resetForm()
      })
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
              </Form>
            )}
          </Formik>
        </main>
      </PageLayout>
    </>
  )
}

export default Prestamos
