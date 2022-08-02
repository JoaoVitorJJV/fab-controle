import { User } from "@app/types/User";
import { createContext } from "react";

export type AuthContextType = {
    user: User | null;
    signin: (nick: string, password: string) => Promise<boolean>;
    signout: () => any 
}

export const AuthContext = createContext<AuthContextType>(null!);