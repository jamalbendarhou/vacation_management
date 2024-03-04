"use client";
import React, { useState } from 'react';
import { Space, Table, message, Button } from 'antd';
import { VacationType } from '@prisma/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteVacationType, getVacationTypes } from "@api/client/vacationTypes";
import type { TableProps } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

export default function DataTable({
  vacationsTypes,
  isLoading = false,
}: {
  vacationsTypes: VacationType[];
  isLoading: boolean;
}) {

  const [messageApi, contextHolder] = message.useMessage();
  const [routerLoading, setRouterLoading] = useState<number>(0);
  const router = useRouter();
  const { refetch } = useQuery({
    queryKey: ["vacation-types"],
    queryFn: getVacationTypes,
  })

  const { mutate } = useMutation(
    {
      mutationFn: deleteVacationType,
      onSuccess: () => {
        messageApi.open({
          type: 'success',
          content: 'type de vacance supprimer avec succes',
        });
        refetch();
      },
      onError: (error) => {
        messageApi.open({
          type: 'error',
          content: error.message,
        });
      }
    }
  )


  const columns: TableProps<VacationType>['columns'] = [
    {
      title: 'Label',
      dataIndex: 'label',
      key: 'label',
      render: (text) => text,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="middle"
            onClick={() => {
              setRouterLoading(record.id);
              router.push(`vacation-types/edit/${record.id}`)
            }}
            loading={routerLoading == record.id ? true : false}
          />
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            size="middle"
            onClick={() => {
              mutate(record.id);
            }}
          />
        </Space>
      ),
    },
  ];


  return (
    <div className=" bg-white  shadow-md p-4 rounded-md mb-4">
      {contextHolder}
      <Table loading={isLoading} columns={columns} dataSource={vacationsTypes} />
    </div>
  );
}
