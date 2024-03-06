import ListContainer from '@components/vacationTypes/ListContainer';
import { QueryClient } from '@tanstack/react-query'; 
import { getVacationTypes } from '@api/client/vacationTypes';

export default async function Page({params} : {params: {id: number}}) {


  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["vacation-types"],
    queryFn: getVacationTypes,
  })

  return (
      
    <ListContainer  />
      
  )
}