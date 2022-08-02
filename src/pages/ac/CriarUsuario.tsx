import { AuthContext } from "@app/contexts/Auth/AuthContext"
import { useApi } from "@app/hooks/useApi"
import { Player } from "@lottiefiles/react-lottie-player"
import { useContext, useEffect, useState } from "react"
import { PatentesType } from "@app/types/Patentes"
import { toast } from "react-toastify"


const CriarUsuario = () => {
    const [loading, setLoading] = useState(true)
    const [patentes, setPatentes] = useState([])
    const [tipo, setTipo] = useState('')
    const api = useApi()
    const logged = useContext(AuthContext)
    const [nome, setNome] = useState('')
    const [senha, setSenha] = useState('')
    const [pat, setPat] = useState('')
    

    useEffect(() => {
        const getPatentesAc = async () => {
            const result = await api.getPatentes('fab', logged.user?.pat_id)

            if(result.data.auth){
                setPatentes(result.data.patentes)
                setLoading(false)
            }

        }
        getPatentesAc()

    }, [])

    const handleSubmit = async () => {
        setLoading(true)

        if(nome && senha && pat && logged.user){
            const response = await api.createUsuario(nome, senha, pat, logged.user.id, tipo)
            if(response.data.auth){
                toast.success(response.data.msg)
            }else{
                toast.error(response.data.msg)
            }
            setLoading(false)
        }
    }

    return (
        <div className="row">
            <div className="col-12">
                <div className="row">
                    <div className="col-12">

                        <div className="card card-primary">
                            <div className="card-header">
                                <h3 className="card-title"><img src="/img/icons/criar_usuarios_icon.png" alt="Criar usuario"/>&nbsp;Criar Usuário</h3>
                            </div>
                            <form onClick={(e) => e.preventDefault()}>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="user">Nick do usuário</label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fas fa-user"></i></span>
                                            </div>
                                            <input type="text" id="user" onChange={(e) => setNome(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="user">Senha</label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fas fa-key"></i></span>
                                            </div>
                                            <input type="password" id="user" onChange={(e) => setSenha(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputFile">Patente</label>
                                        <select className="custom-select" onChange={(e) => setPat(e.target.value)} required>
                                            {patentes.map((patente: PatentesType) => (<option key={patente.id} value={patente.id}>{patente.nome_sem_estrela}</option>))}                                            
                                        </select>
                                    </div>    
                                    <div className="form-group">
                                        <label htmlFor="exampleInputFile">Tipo</label>
                                        <select className="custom-select" onChange={(e) => setTipo(e.target.value)} required>
                                            <option value="praca">Praça</option>   
                                            <option value="oficial">Oficial</option>                                         
                                        </select>
                                    </div>         
                                    <label>O usuário precisa ser alistado para ser criado.</label>                           
                                </div>
                                
                                <div className="card-footer">
                                    <button type="button" onClick={() => handleSubmit()} disabled={(loading ? true: false)} className="btn btn-primary d-flex">Salvar
                                    </button>
                                </div>                               
                            </form>

                        </div>
                        {loading &&
                            <Player
                                autoplay
                                loop
                                src="https://assets2.lottiefiles.com/packages/lf20_ht6o1bdu.json"
                                style={{ width: '120px' }}
                            >

                            </Player>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CriarUsuario