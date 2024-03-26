import { useMutation } from "@tanstack/react-query";

export default function useClientMutation(props: ClientMutationProps) {
  return useMutation({
    mutationFn: async () => {
      return await fetch(props.endPoint, {
        method: props.method,
        body: JSON.stringify(props.body),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
    },
    onSuccess: () => {
      props.refetch && void props.refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
