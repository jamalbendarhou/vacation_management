"use client";
import { useState } from 'react';
import BodyWrapper from '@components/BodyWrapper';
import Datatable from '@/components/vacationTypes/Datatable';
import Toolbar from '@components/Toolbar';
import { useQuery } from '@tanstack/react-query'; 
import { getVacationTypes } from '@api/client/vacationTypes';
import { Alert, Space } from 'antd';
import { useRouter } from 'next/navigation';

export default function ListContainer() {

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);


    const { data, isLoading, isError } = useQuery({
        queryKey: ["vacation-types"],
        queryFn: getVacationTypes,
    })

    return (    

        <BodyWrapper>
            <Toolbar
                title="Vacations"
                buttonTitle="Ajouter types de Vacances"
                handelClick={() => {
                    setLoading(true)
                    router.push('/dashboard/vacation-types/create')
                }}
                loading={loading}
            />
            {
                isError &&  <Space direction="vertical" className="w-full mb-5">
                    <Alert
                        message="un erreur s est produit lors du chargement"
                        type="error"
                    />
                </Space>
            }
           
            <Datatable 
                vacationsTypes={data || []}
                isLoading={isLoading}
            />
        </BodyWrapper>
      );
}