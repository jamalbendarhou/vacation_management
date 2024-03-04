
import React, { useState } from 'react';
import { Space, Table, message, Button } from 'antd';
import { Vacation } from '@prisma/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteVacation, getVacations } from "@api/client/vacations";
import type { TableProps } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

export default function DataTable({
  vacations,
  isLoading = false,
}: {
  vacations: Vacation[];
  isLoading: boolean;
}) {
  const [messageApi, contextHolder] = message.useMessage();
  const [routerLoading, setRouterLoading] = useState<number>(0);
  const router = useRouter();
  const { refetch } = useQuery({
    queryKey: ["vacations"],
    queryFn: getVacations,
  })

  const { mutate } = useMutation(
    {
      mutationFn: deleteVacation,
      onSuccess: () => {
        messageApi.open({
          type: 'success',
          content: 'vacance supprimer avec succes',
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

  const handleEdit = (id: number) => {
    setRouterLoading(id);
    router.push(`/vacations/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    mutate(id);
  };

  const columns: TableProps<Vacation>['columns'] = [
    {
      title: 'Titre',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Type de Vacacne',
      dataIndex: 'vacation_type',
      key: 'vacation_type',
      render: (vacation_type) => vacation_type.label,
    },
    {
      title: 'Date du debut',
      dataIndex: 'start_at',
      key: 'start_at',
      render: (text) => dayjs(text).format('DD/MM/YYYY'),
    },
    {
      title: 'Date de fin',
      dataIndex: 'end_at',
      key: 'end_at',
      render: (text) => dayjs(text).format('DD/MM/YYYY'),
    },
    {
      title: 'Statut',
      dataIndex: 'status',
      key: 'status',
      render: (text) => (
        <span style={{ color: text === "APPROUVEE" ? "#87d068" : text === "REJETEE" ? "#f50" : "#2db7f5" }}>
          {text}
        </span>
      ),
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
            onClick={() => handleEdit(record.id)}
            loading={routerLoading === record.id}
          />
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            size="middle"
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className=" bg-white shadow-md p-4 rounded-md mb-4">
      {contextHolder}
      <Table loading={isLoading} columns={columns} dataSource={vacations} />
    </div>
  );
}
