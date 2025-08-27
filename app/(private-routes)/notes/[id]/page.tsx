<<<<<<< HEAD
import { fetchNoteById } from '@/lib/ClientApi';
=======
import { fetchNoteByIdServer } from '@/lib/ServerApi';
>>>>>>> 9f19245 (hw)
import NoteDetailsClient from "./NoteDetails.client";
import { QueryClient, HydrationBoundary, dehydrate} from "@tanstack/react-query";
import { Metadata } from "next";


type Props = {
    params: Promise<{id: string}>
    
}

export  async function generateMetadata({params}: Props): Promise<Metadata>{
  const {id} = await params;
<<<<<<< HEAD
  const response = await fetchNoteById(id)
=======
  const response = await fetchNoteByIdServer(id)
>>>>>>> 9f19245 (hw)

  return{
    title: `Note ${response.title}`,
    description: response.content.slice(0, 30),
    openGraph:{
      title: `Note ${response.title}`,
      description: response.content.slice(0, 30),
      url: `https://notehub.com/notes/${id}`,
      images: [{
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: response.title
      }]
    }
  }
}




const NoteDetails = async ({params}: Props) =>{
    const {id} = await params;
    const queryClient = new QueryClient();


    await queryClient.prefetchQuery({
        queryKey: ['note', id],
<<<<<<< HEAD
        queryFn: () => fetchNoteById(id)
=======
        queryFn: () => fetchNoteByIdServer(id)
>>>>>>> 9f19245 (hw)
    })

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient/>
        </HydrationBoundary>
    )
}


export default NoteDetails