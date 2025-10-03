import { fetchNotes } from "@/lib/api";
import { dehydrate, HydrationBoundary} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import getQueryClient from "@/utils/getQueryClient";

const Notes = async () => {
const queryClient = getQueryClient();

await queryClient.prefetchQuery({
  queryKey: ['notes', '', 1],
  queryFn: () => fetchNotes({searchValue: '', page: 1})
})
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
<NotesClient/>
    </HydrationBoundary>
  )
}

export default Notes;