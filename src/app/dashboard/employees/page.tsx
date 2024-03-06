// importation de la composante ListContainer dans le fichier employees
import ListContainer from '@/components/employees/ListContainer';
import { QueryClient } from '@tanstack/react-query'; 
import { getEmployees } from '@api/client/employees';

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });

  return <ListContainer />;
}
