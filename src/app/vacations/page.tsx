import ListContainer from '@components/vacations/ListContainer';
import { QueryClient } from '@tanstack/react-query'; 
import { getVacations } from '@api/client/vacations';

export default async function Page({params} : {params: {id: number}}) {


  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["vacations"],
    queryFn: getVacations,
  })

  return (
      
    <ListContainer  />
      
  )
}