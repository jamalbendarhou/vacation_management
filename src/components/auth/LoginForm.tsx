"use client";
import React from 'react';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { message, Button } from 'antd';
import { signIn, SignInResponse } from "next-auth/react";
import { useRouter } from 'next/navigation';

const validationSchema = yup.object({
  email: yup.string().email().required('Email requis'),
  password: yup.string().required('Mot de passe requis'),
});

type LoginCredentials = {
  email: string,
  password: string
}

export default function LoginForm() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={async (values: LoginCredentials, { setSubmitting, resetForm }) => {
        let loginRequest: SignInResponse | undefined = await signIn("credentials", {
          ...values,
          callbackUrl: `/dashboard`,
          redirect: false,
        });
        

        if (loginRequest && loginRequest.ok) {
          resetForm();
          router.push("/dashboard");
        } else {
          setSubmitting(false);
          // Toast failed
          messageApi.open({
            type: 'error',
            content: loginRequest?.error || "Login failed",
          });
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6" >
          {contextHolder}
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Adresse email</label>
            <div className="mt-2">
              <Field id="email" name="email" placeholder="Email address" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-3 ps-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#713f12] sm:text-sm sm:leading-6" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs italic" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Mot de passe</label>
            </div>
            <div className="mt-2">
              <Field id="password" name="password" placeholder="******" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-3 ps-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#713f12] sm:text-sm sm:leading-6" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-xs italic" />
            </div>
          </div>

          <div>
            <Button type="primary" loading={isSubmitting} htmlType="submit" className="flex w-full justify-center rounded-md bg-[#713f12] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#713f1291] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#713f12]">Connexion</Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
