import { feathers } from "./feathers"

export interface Credentials {
  email: string,
  password: string,
}

export const login = async (credentials?: Credentials) => {
  if (!credentials) {
    return feathers.reAuthenticate()
  } else {
    return feathers.authenticate({
      strategy: 'local',
      ...credentials,
    })
  }
}
