import { VStack, HStack, Image, Box, Input } from "@chakra-ui/react";
import { useAuthContext } from "../AuthProvider/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { feathers } from "../shared/feathers";
import { FormEvent, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Message } from "./Message";
import { send } from "process";

export const AppPage = () => {
  const qc = useQueryClient()
  const { user } = useAuthContext()

  const { data: { data: messages } = {}, isError, error } = useQuery({
    queryKey: ['messages'],
    queryFn: () => feathers.service('messages').find({
      query: {
        $sort: { createdAt: -1 },
        $limit: 25,
      }
    }),
  })

  useEffect(() => {
    const invalidateMessages = () => qc.invalidateQueries({ queryKey: ['messages'] })

    feathers.service('messages').on('created', invalidateMessages)

    return () => {
      feathers.service('messages').off('created', invalidateMessages)
    } 
  }, [])

  const sendMessageMutation = useMutation({
    mutationFn: ({ text }) => feathers.service('messages').create({ text }),
    onError: console.error,
    onSettled: () => qc.invalidateQueries({ queryKey: ['messages'] })
  })

  if (isError) return error

  if (!user || !messages) return

  const handleMessageSend = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const text = formData.get('text')
    sendMessageMutation.mutate({ text })
    event.currentTarget.reset()
  }

  return (
    <>
      <VStack p={4} pb={10} flexDir="column-reverse">
        {messages.map((message: any) => (
          <Message key={message.id} {...message} />
        ))}
        <Box overflowAnchor="auto" height="1px" />
      </VStack>
      <Box h={8} px={4} position="fixed" bottom={0} w="full" bg="bg.subtle">
        <form onSubmit={handleMessageSend}>
          <HStack alignItems="center">
            <Image boxSize={4} borderRadius="full" src={user.avatar} />
            <Input name="text" placeholder="Type something..." size="2xs" autoComplete="off" />
            <Button type="submit" variant="subtle" size="2xs" loading={sendMessageMutation.isPending}>Send</Button>
          </HStack>
        </form>
      </Box>
    </>
  )
}
