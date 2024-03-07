"use client";
import React, { useState } from 'react';
import { Space, Table, message, Button } from 'antd';
import { Employee, Vacation } from '@prisma/client'; //importation des tables employee et vacances 
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteEmployee, getEmployees } from "@api/client/employees"; //importation des fonctions pour afficher et pour effacer 
import type { TableProps } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';//importation des icons effacer et modifier 
import { useRouter } from 'next/navigation';

// pour afficher la liste des employes dans un tableau
export default function DataTable({
  employees,
  isLoading = false,
}: {
  employees: Employee[];
  isLoading: boolean;
}) {

  // pour les messages d'alerte
  const [messageApi, contextHolder] = message.useMessage();
  const [routerLoading, setRouterLoading] = useState<number>(0);
  const router = useRouter();

  // recuperation des donnees
  const { refetch } = useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });

  // pour la suppression d un employe
  const { mutate } = useMutation(
    {
      mutationFn: deleteEmployee,
      onSuccess: () => {
        messageApi.open({
          type: 'success',
          content: 'employe supprimer avec succes',
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
  );

  // Colonnes du tableau
  const columns: TableProps<Employee>['columns'] = [
    {
      title: 'prenom',
      dataIndex: 'first_name',
      key: 'first_name',
      render: (text) => text,
    },
    {
      title: 'Nom',
      dataIndex: 'last_name',
      key: 'last_name',
      render: (text) => text,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => text,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (text) => text,
    },
    {
      title: 'Département',
      dataIndex: 'department',
      key: 'department',
      render: (text) => text,
    },
    {
      title: 'Conges',
      dataIndex: 'vacations',
      key: 'vacations',
      render: (vacations: Vacation[]) => vacationContent(vacations),
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
              router.push(`/dashboard/employees/edit/${record.id}`)
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

  // Affichage du composant DataTable
  return (
    <div className=" bg-white  shadow-md p-4 rounded-md mb-4">
      {contextHolder}
      <Table loading={isLoading} columns={columns} dataSource={employees} />
    </div>
  );
}

// Contenu des vacances 
const vacationContent = (vacations: Vacation[]) => {
  if (vacations.length === 0) return <div>Aucun congé</div>;

  return (
    <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      {vacations.map((vacation: Vacation, index: number) => (
        <li key={index} className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
          <h5 className="text-lg text-slate-200">{vacation.title}</h5>
          <p className="ms-2">date debut :</p>
          <h5 className="text-lg text-slate-200">{formatDate(vacation.start_at)}</h5>
          <p className="ms-2">date fin :</p>
          <h5 className="text-lg text-slate-200">{formatDate(vacation.end_at)}</h5>
          <p className="ms-2">Statut :</p>
          <span>
            {vacation.status === "APPROVED" ? "Approuvé" :
              vacation.status === "REJECTED" ? "Rejeté" : "En attente"}
          </span>
        </li>
      ))}
    </ul>
  );
};

// Fonction pour formater les dates
const formatDate = (date: Date) => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};
