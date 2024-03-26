import { twentyFourHours } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function useFetchQuery(props: FetchQueryProps) {
  const [fetchError, setFetchError] = useState<Error>();

  const res = useQuery({
    enabled: props.enable,
    queryKey: props.queryKey,
    queryFn: async () => {
      const data = await fetch(props.fetchUrl, {
        method: props.method,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (!res.ok) {
          setFetchError(new Error(res.statusText));
          throw new Error(res.statusText);
        } else {
          props.refetch && void props.refetch();
        }

        const data = res.json();

        return data;
      });

      return data;
    },
    staleTime: props.staleTime ?? twentyFourHours,
    retry: false,
  });

  return {
    ...res,
    fetchError,
  };
}
