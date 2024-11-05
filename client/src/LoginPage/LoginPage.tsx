import { FormEvent } from "react"
import { Credentials, login } from "../shared/auth"
import { Box, Center, Input, VStack } from "@chakra-ui/react"
import { Field } from "../components/ui/field"
import { Button } from "../components/ui/button"

export const LoginPage = () => {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const credentials = {
      email: formData.get('email') || '',
      password: formData.get('password') || '',
    } as Credentials

    await login(credentials)
  }


  return (
    <Center m={8}>
      <Box py={4} px={8} borderRadius="md" bg="bg.subtle">
        <form onSubmit={handleSubmit}>
          <VStack>
            <Field label="Email">
              <Input name="email" type="email" placeholder="me@example.com" />
            </Field>
            <Field label="Password">
              <Input name="password" type="password" />
            </Field>

            <Button type="submit">Login</Button>
          </VStack>
        </form>
      </Box>
    </Center>
  )
}
