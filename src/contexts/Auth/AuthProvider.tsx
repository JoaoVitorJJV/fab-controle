import { useApi } from "@app/hooks/useApi"
import { User } from "@app/types/User"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { AuthContext } from "./AuthContext"

export const AuthProvider = ({children} : {children: JSX.Element}) => {
    const [user, setUser] = useState<User | null>(null)
    const api = useApi()
    

    useEffect(() => {
        const validateToken = async () => {
   
            const storageData = localStorage.getItem('authToken')
            if(storageData){
                const data = await api.validateToken(storageData);
                if(data.auth){
                    setUser(data.user)
                }
            }
        }

        validateToken()


        return () => {
            console.log('Exiting..')
        }
    }, [])

    const signin = async (nick: string, password: string) => {
        const data = await api.signin(nick, password)
        if(data.auth && data.tokenLogin){
            setUser(data.user)
            toast.success('Logado com sucesso!')
            setToken(data.tokenLogin)
            return true
        }

        toast.error(data.msg)
        return false
    }

    const signout = async () => {
        const storageData = localStorage.getItem('authToken')
        if(storageData){
            const response = await api.logout(user?.nickname, storageData)
            if(response.data.auth){
                setUser(null)
                return true
            }else{
                toast.error(response.data.msg)
                return false
            }                      
        }
        
    }

    const setToken = (token: string) => {
        localStorage.setItem('authToken', token)
    }


    return (
        <AuthContext.Provider value={{user, signin, signout}}>
            {children}
        </AuthContext.Provider>
    )
}