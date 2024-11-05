import { HStack, Image, Text, VStack } from "@chakra-ui/react"
import { useAuthContext } from "../AuthProvider/AuthContext"

interface MessageProps {
  text: string,
  createdAt: number,
  author: {
    id: number,
    avatar: string,
    email: string,
  }
  isPending: boolean,
}

export const Message = ({
  text,
  createdAt,
  author: {
    id,
    avatar,
    email
  },
  isPending,
}: MessageProps) => {
  const { user } = useAuthContext()

  const isAuthorMe = user.id === id

  return (
    <HStack
      p={2}
      border="1px solid"
      borderColor="bg.emphasized"
      bg={isAuthorMe ? 'blue.subtle' : 'bg.subtle'}
      alignSelf={isAuthorMe ? 'flex-end' : 'flex-start'}
      opacity={isPending ? 0.5 : 1}
      overflowAnchor="none"
    >
      <Image boxSize={8} borderRadius="full" src={avatar} />
      <VStack gap={0}>
        <Text fontSize="xs" w="full">
          <strong>{email}</strong> — <em>{(new Date(createdAt)).toLocaleString()}</em>
        </Text>
        <Text w="full">{text}</Text>
      </VStack>
    </HStack>
  )
}
