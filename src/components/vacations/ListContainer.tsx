"use client";
import { useState } from 'react';
import BodyWrapper from '@components/BodyWrapper';
import Datatable from '@/components/vacations/Datatable';
import Toolbar from '@components/Toolbar';
import { useQuery } from '@tanstack/react-query'; 
import { getVacations } from '@api/client/vacations';
import { Alert, Space } from 'antd';
import { useRouter } from 'next/navigation';

export default function ListContainer() {

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);


    const { data, isLoading, isError } = useQuery({
        queryKey: ["vacations"],
        queryFn: getVacations,
    })

    return (    

        <BodyWrapper>
            <Toolbar
                title="Vacances"
                buttonTitle="Ajouter Vacance"
                handelClick={() => {
                    setLoading(true)
                    router.push('/dashboard/vacations/create')
                }}
                loading={loading}
            />
            {
                isError &&  <Space direction="vertical" className="w-full mb-5">
                    <Alert
                        message="un erreur lors du chargement"
                        type="error"
                    />
                </Space>
            }
           
            <Datatable 
                vacations={data || []}
                isLoading={isLoading}
            />
        </BodyWrapper>
      );
}