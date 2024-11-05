import { AuthenticationResult } from "@feathersjs/authentication";
import { createContext, useContext } from "react";

export const AuthContext = createContext<AuthenticationResult>({})

export const useAuthContext = () => useContext(AuthContext)
