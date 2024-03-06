import VacationForm from '@components/vacations/VacationForm';
import { QueryClient } from '@tanstack/react-query'; 
import { getVacation } from '@api/client/vacations';

export default async function Page({ params }: { params: { id: number } }) {
  const queryClient = new QueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: ["vacation-type", params.id ],
    queryFn: getVacation,
  });

  return <VacationForm id={params.id} />;
}
