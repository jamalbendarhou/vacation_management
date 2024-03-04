"use client";
import React  from 'react';
import BodyWrapper from '@components/BodyWrapper';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import InputField from '@components/Fields/InputField';
import { Button ,message} from 'antd';
import { useMutation,useQuery } from '@tanstack/react-query'
import {createVacationType,getVacationType,updateVacationType} from "@api/client/vacationTypes"
import {  VacationType } from '@prisma/client';
import { useRouter } from 'next/navigation';
type VacationTypeInput = Partial<VacationType>;

const validationSchema = yup.object({
    label: yup.string().required('Type name is required'),
}); 

export default function VacationTypeForm({
    id 
}:{
    id? :number
}) {
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    const { data } = useQuery({
        queryKey: ["vacation-type",id || 0],
        queryFn: getVacationType,
        enabled: !!id,
    } )

    // Mutations
    const {mutate, isPending} = useMutation(
        {
            mutationFn : createVacationType,
            onSuccess: () => {
                messageApi.open({
                    type: 'success',
                    content: 'Type de vacances creer avec succes',
                });
                router.push('vacation-types')
            },
            onError: (error) => {
                messageApi.open({
                    type: 'error',
                    content: error.message,
                });
            }
        }
    )

    const {mutate : mutateUpdate , isPending : isPendingUpdate} = useMutation(
        {
            mutationFn : updateVacationType,
            onSuccess: () => {
                messageApi.open({
                    type: 'success',
                    content: 'mise a jou de type de vacance',
                });
                router.push('vacation-types')
            },
            onError: (error) => {
                messageApi.open({
                    type: 'error',
                    content: error.message,
                });
            }
        }
    )

    const handelCreate = (values: VacationTypeInput,resetForm : Function ) => {
        delete values.id;
        mutate(values);
        resetForm();
    }

    const handelUpdate = (values: VacationType ) => {
        mutateUpdate(values);
    }
    

    return (
        <BodyWrapper>
             {contextHolder}
            <section className=" bg-blueGray-50">
                <div className="w-full px-4 mx-auto mt-6">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">

                  
                    <Formik
                        initialValues={{
                            id: id || 0,
                            label: data?.label || '',
                        }}
                            enableReinitialize={true}
                            validationSchema={validationSchema}
                            onSubmit={( values: VacationTypeInput , { setSubmitting,resetForm }) => {
                                if(id){
                                    handelUpdate(values as VacationType);
                                    setSubmitting(false);
                                    return ;
                                }
                                handelCreate(values,resetForm);
                                
                                setSubmitting(false);
                             
                            }}
                        >
                            {({  }) => (
                                <Form>
                                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                                        <div className="text-center flex justify-between">
                                            <h6 className="text-blueGray-700 text-xl font-bold">
                                                 creation de type 
                                            </h6>

                                            <Button type="primary" htmlType="submit" loading={isPending && isPendingUpdate} >{ id ? "Update" : "Save" }</Button>
                                        
                                        </div>
                                    </div>
                                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                
                                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                           informations Type de vacances
                                        </h6>
                                        <div className="flex flex-wrap">
                                            {/* Input  */}
                                            <div className="w-full lg:w-12/12 px-4">
                                                <InputField forId="label" name="label" type="text" placeholder="Entrer Type de vacances" label="type de vacance" />
                                            </div>
                            
                                        </div>
                                
                                    </div>
                                </Form>
                            )}
                    </Formik>
                </div>
                
                
                </div>
            </section>
        </BodyWrapper>
    )
}