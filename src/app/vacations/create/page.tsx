import VacationForm from '@components/vacations/VacationForm';
import {QueryClient } from '@tanstack/react-query'; 
import { getVacationTypes } from '@api/client/vacationTypes';
export default async function Page() {

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["vacation-types"],
    queryFn: getVacationTypes,
  })


  return  <VacationForm  />
    
}