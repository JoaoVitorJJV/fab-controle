import { AuthContext } from "@app/contexts/Auth/AuthContext"
import { useApi } from "@app/hooks/useApi"
import { useContext, useEffect, useState } from "react"
import { PatentesType } from "@app/types/Patentes"
import { toast } from "react-toastify"
import { Player } from "@lottiefiles/react-lottie-player"
import { useParams } from "react-router-dom"

const EditarUsuario = () => {
    const [usuario, setUsuario] = useState<any>([])
    const [nome, setNome] = useState('')
    const [senha, setSenha] = useState('')
    const [pat, setPat] = useState('')
    const [patentes, setPatentes] = useState([])
    const [loading, setLoading] = useState<Boolean>(false)
    const logged = useContext(AuthContext)
    const api = useApi()
    let {user} = useParams()

    useEffect(() => {
        const getPatentesAc = async () => {
            setLoading(true)
            const result = await api.getPatentes('fab', logged.user?.pat_id)
            if(result.data.auth){
                setPatentes(result.data.patentes)
                setLoading(false)
            }

        }

        const getUsuario = async () => {
            const result = await api.getUsuarioNome(user)

            if(result.data.auth){
               
                setUsuario(result.data.usuario)
                setLoading(false)
            }
        }

        
        getPatentesAc()
        getUsuario()

    }, [])

    const editarUsuario = async () => {
        setLoading(true)
        var nomeVer = (nome ? nome : usuario.nickname)
        var novaSenha = (senha ? senha : usuario.senha)
        var novaPatente = (pat ? pat : usuario.pat_id)

        const response = await api.updateUsuario(nomeVer, novaPatente, novaSenha, logged.user?.pat_id, logged.user?.nickname)

        if(response.data.auth){
            setLoading(false)
            toast.success(response.data.msg)
        }else{
            setLoading(false)
            toast.error(response.data.msg)
        }
    }

    return (
        <div className="row">
            <div className="col-12">
                <div className="row">
                    <div className="col-12">

                        <div className="card card-primary">
                            <div className="card-header">
                                <h3 className="card-title"><img src="/img/icons/criar_usuarios_icon.png" alt="Criar usuários"/>&nbsp;Editar Usuário</h3>
                            </div>
                            <form onClick={(e) => e.preventDefault()}>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="user">Nick do usuário</label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fas fa-user"></i></span>
                                            </div>
                                            <input type="text" id="user" value={(usuario ? usuario.nickname : '')} onChange={(e) => setNome(e.target.value)} className="form-control" />
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
                                            {patentes.map((patente: PatentesType) => (<option key={patente.id} value={patente.id} selected={(usuario ? (patente.id === usuario.pat_id ? true : false) : false)}>{patente.nome_sem_estrela}</option>))}
                                        </select>
                                    </div>
                                    <label>Deixe o campo "senha" em branco caso não queira alterar a senha.</label>
                                </div>

                                <div className="card-footer">
                                    <button type="button" onClick={() => editarUsuario()} disabled={(loading ? true : false)} className="btn btn-primary d-flex">Salvar
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


export default EditarUsuario