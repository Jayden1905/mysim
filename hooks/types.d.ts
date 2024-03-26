type ClientMutationProps = {
  endPoint: string
  method: string
  body: unknown
  refetch?: () => void
}

type FetchQueryProps = {
  queryKey: string[]
  fetchUrl: string
  method: string
  cacheTime?: number
  staleTime?: number
  refetch?: () => void
  enable?: boolean
}
