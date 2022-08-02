import { useApi } from "@app/hooks/useApi";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { BASE_URL } from "@app/services/auth";



export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const navigate = useNavigate();
    const api = useApi()
    const logged = useContext(AuthContext)
    const [times, setTimes] = useState(true)

    const validateToken = async () => {
        setTimes(false)

        const storageData = localStorage.getItem('authToken')
        if (storageData) {
           
            const data = await api.validateToken(storageData);

            if (!data.auth) {
                navigate('/login')
            }
        }

        const rotasAC = [
            `${BASE_URL}/oficiais/ac/logs`,
            `${BASE_URL}/oficiais/ac/usuarios`,
            `${BASE_URL}/oficiais/editar-usuario`
        ]

        rotasAC.map((rota: string) => {
            var rotaAtual = window.location.href
            var patente = logged.user?.pat_id

            if (patente) {
                if (rota === rotaAtual) {
                    if (patente < 14) {
                        navigate('/')
                    }
                }
            }

        })
       
    }

    useEffect(() => {
        return () => {
            setTimes(true)
        }
    }, [])

    if(times)
        validateToken()

    return children;
}