import { useQuery } from '@tanstack/react-query'

type Props = {
  queryKey: string[]
  fetchUrl: string
  method: string
  cacheTime?: number
  staleTime?: number
  refetch?: () => void
  enable?: boolean
}

export default function useFetchQuery({
  queryKey,
  fetchUrl,
  method,
  cacheTime,
  staleTime,
  refetch,
  enable,
}: Props) {
  const twentyFourHours = 1000 * 60 * 60 * 24
  const data = useQuery({
    enabled: enable,
    queryKey: queryKey,
    queryFn: async () => {
      const data = await fetch(fetchUrl, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json())
      return data
    },
    cacheTime: cacheTime ?? twentyFourHours,
    staleTime: staleTime ?? twentyFourHours,
    retry: false,
    onSuccess: () => {
      refetch && void refetch()
    },
    onError: (error) => {
      console.log(error)
    },
  })

  return {
    ...data,
  }
}
