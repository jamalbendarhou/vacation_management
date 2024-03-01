"use client";
import React,{useState ,useEffect}  from 'react';
import BodyWrapper from '@components/BodyWrapper';
import * as yup from 'yup';
import { Formik, Form,ErrorMessage } from 'formik';
import { Button ,message,Select,Space,Alert} from 'antd';
import { useMutation,useQuery } from '@tanstack/react-query'
import {createEmployee,updateEmployee,getEmployee} from "@api/client/employees"
import {getVacations} from "@api/client/vacations"
import {  Employee,Vacation } from '@prisma/client';
import { useRouter } from 'next/navigation';
import InputField from '@components/Fields/InputField';
//import { Spin } from 'antd';

type EmployeeInput = Partial<Employee> & { confirm_password?: string };

type CreateEmployeeBody ={
    employee : EmployeeInput,
    vacations : Vacation[]
}

type UpdateEmployeeBody ={
    employee : Employee,
    vacations : Vacation[]
}


type vacationOptionsType = {
    value: string,
    label: string
}

export default function EmployeeForm({ id }:{ id? :number}) {

    const validationSchema = yup.object({
        last_name: yup.string().required('Nom requis'),
        first_name: yup.string().required('Prenom requis'),
        email: yup.string().email('Entrer un email valdie').required('Email requis'),
        password: yup.string().when('id', ([id])=>{
            return id ? yup.string() : yup.string().required('Mot de passe requis')
        }),
        confirm_password: yup.string().when('id', ([id])=>{
            return id ? yup.string() : yup.string().oneOf([yup.ref('password'), "mot de passe ne correspond pas"], 'mot de passe ne correspond pas')
        }),
        role: yup.string(),
        department: yup.string(),
    }); 
    

    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    const [vacationOptions, setVacationOptions] = useState<vacationOptionsType[]>([]);
    const [selectedVacations, setSelectedVacations] = useState<Vacation[]>([]);


    // get employeeData on edit 
    const { data : employeeData, isLoading, isError } = useQuery({
        queryKey: ["employee",id || 0],
        queryFn: getEmployee,
        enabled: !!id,
    } )


    // get vacations  list
    const { data : vacations, isLoading : vacationsIsLoading, isError : vacationsIisError } = useQuery({
        queryKey: ["vacation"],
        queryFn: getVacations,
    } )


    // Mutations

    // create Mutation
    
    const {mutate, isPending,error : createErr} = useMutation(
        {
            mutationFn : createEmployee,
            onSuccess: () => {
                messageApi.open({
                    type: 'success',
                    content: 'Employee creer avec succes',
                });
                router.push('/employees')
            },
            onError: (error) => {
                messageApi.open({
                    type: 'error',
                    content: error.message,
                });
            }
        }
    )


    // update Mutation
    const {mutate : mutateUpdate , isPending : isPendingUpdate ,error : updateErr } = useMutation(
        {
            mutationFn : updateEmployee,
            onSuccess: () => {
                messageApi.open({
                    type: 'success',
                    content: 'Employe mise a jour',
                });
                router.push('/employees')
            },
            onError: (error) => {
                console.log('error--',error);
                messageApi.open({
                    type: 'error',
                    content: error.message,
                });
            }
        }
    )

    useEffect(() => {

        if(employeeData){
            const { vacations } = employeeData;
            if(vacations){
                setSelectedVacations(vacations);
            }
        }

        if(vacations){
            setVacationOptions(vacations.map((v) => ({ value: v.id.toString(), label: "" })));
        }
    }, [vacations,employeeData]);

    const handelCreate = (values: CreateEmployeeBody,resetForm : Function ) => {
        delete values.employee.id;
        mutate(values);
        resetForm();
    }

    const handelUpdate = (values: UpdateEmployeeBody ) => {
        mutateUpdate(values);
    }



    console.log('updateErr',updateErr);


    return (
        <BodyWrapper>
             {contextHolder}
            <section className=" bg-blueGray-50">
                <div className="w-full px-4 mx-auto mt-6">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                    
                    {isLoading || vacationsIsLoading ? <div className="flex justify-center items-center absolute left-0 right-0 top-0 bottom-0 bg-slate-300 bg-opacity-7"></div> : null}

                    {
                        isError || vacationsIisError &&  <Space direction="vertical" className="w-full mb-5">
                            <Alert
                                message="An error occurred while fetching"
                                type="error"
                            />
                        </Space>
                    }

                    {
                        createErr && <Space direction="vertical" className="w-full mb-5">
                            <Alert
                                message={createErr.message}
                                type="error"
                            />
                        </Space>
                    }

                    {
                        updateErr && <Space direction="vertical" className="w-full mb-5">
                            <Alert
                                message={updateErr.message}
                                type="error"
                            />
                        </Space>
                    }

                    <Formik
                        initialValues={{
                            id: employeeData?.id || undefined,
                            last_name: employeeData?.last_name || '',
                            first_name: employeeData?.first_name || '',
                            email: employeeData?.email || '',
                            password: '',
                            confirm_password: '',   
                            role: employeeData?.role || '',
                            department: employeeData?.department || '',
                        }}
                            enableReinitialize={true}
                            validationSchema={validationSchema}
                            onSubmit={( values: EmployeeInput , { setSubmitting,resetForm }) => {

                                 
                                delete values.confirm_password;
                                if(id){
                                    const body : UpdateEmployeeBody ={
                                        employee : values as Employee,
                                        vacations : selectedVacations
                                    }
                                    handelUpdate(body as UpdateEmployeeBody);
                                    setSubmitting(false);
                                    return ;
                                }
                                const body : CreateEmployeeBody ={
                                    employee : values,
                                    vacations : selectedVacations
                                }
                                handelCreate(body,resetForm);
                                
                                setSubmitting(false);
                             
                            }}
                        >
                            {({ setFieldValue,values }) => (
                                <Form>
                                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                                        <div className="text-center flex justify-between">
                                            <h6 className="text-blueGray-700 text-xl font-bold">
                                            Creer un employe
                                            </h6>

                                            <Button type="primary" htmlType="submit" loading={isPending || isPendingUpdate} >Save</Button>
                                        
                                        </div>
                                    </div>
                                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                        Information de l employe
                                        </h6>
                                        <div className="flex flex-wrap">
                                            
                                            <div className="w-full lg:w-6/12 px-4">
                                                <InputField forId="last_name" name="last_name" type="text" placeholder="saisir Nom" label="Nom" />
                                            </div>

                                            <div className="w-full lg:w-6/12 px-4">
                                                <InputField forId="first_name" name="first_name" type="text" placeholder="Saisir Prenom" label="Prenom" />
                                            </div>
                                            
                                            <div className="w-full lg:w-12/12 px-4">
                                                <InputField forId="email" name="email" type="email" placeholder="entrer votre email" label="Email" />
                                            </div>
                                            
                                            {
                                                !id && <>
                                                    <div className="w-full lg:w-6/12 px-4">
                                                        <InputField forId="password" name="password" type="password" placeholder="entrer votre mot de passe" label="Mot de passe" />
                                                    </div>

                                                    <div className="w-full lg:w-6/12 px-4">
                                                        <InputField forId="confirm_password" name="confirm_password" type="password" placeholder="confirmer votre mot de passe" label="confirmer mot de passe" />
                                                    </div>
                                                </>
                                            }
                                            
                                            <div className="w-full lg:w-6/12 px-4">
                                                <InputField forId="role" name="role" type="text" placeholder="entrer votre role" label="Role" />
                                            </div>

                                            <div className="w-full lg:w-6/12 px-4">
                                                <InputField forId="department" name="department" type="text" placeholder="entrer votre departement" label="Departement" />
                                            </div>
                                            
                                            <div className="w-full lg:w-12/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor={"vacationTypeId"}>
                                                        Vacances
                                                    </label>
                                                    <Select
                                                        mode="multiple"
                                                        allowClear
                                                        value={selectedVacations.map((v) => v.id.toString()) || []}
                                                        style={{ width: "100%" }}
                                                        onChange={(value : string[]) => {
                                                            setSelectedVacations(vacations ? vacations.filter((v) => value.includes(v.id.toString())) : [])
                                                        }}
                                                        options={vacationOptions}
                                                    />
                                                </div>
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
