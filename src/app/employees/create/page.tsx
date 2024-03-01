import EmployeeForm from '@components/employees/EmployeeForm';
import { QueryClient } from '@tanstack/react-query'; 
import { getVacations } from '@api/client/vacations';

export default async function Page() {
  const queryClient = new QueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: ["vacations"],
    queryFn: getVacations,
  });

  return <EmployeeForm />;
}
