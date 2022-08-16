import { AuthContext } from "@app/contexts/Auth/AuthContext"
import { useApi } from "@app/hooks/useApi"
import { Player } from "@lottiefiles/react-lottie-player"
import { useContext, useState } from "react"
import { toast } from "react-toastify"


const InserirOpniao = () => {
    const [loading, setLoading] = useState(false)
    const [usuario, setUsuario] = useState('')
    const [opniao, setOpniao] = useState('')
    const api = useApi()
    const logged = useContext(AuthContext)

    const handleSubmit = async () => {
        setLoading(true)

        if(usuario && opniao){
            const response = await api.setOpniao(logged.user?.nickname, usuario, opniao)

            if(response.data.auth){
                toast.success(response.data.msg)
            }else{
                toast.error(response.data.msg)
            }

            setLoading(false)
        }else{
            setLoading(false)
            toast.error('os campos precisam estar preenchidos.')
        }
    }

    return (
        <div className="row">
            <div className="col-12">
                <div className="row">
                    <div className="col-12">

                        <div className="card card-primary">
                            <div className="card-header">
                                <h3 className="card-title"><img src="/img/icons/comentarios.png" />&nbsp;Dar Opinião</h3>
                            </div>
                            <form onClick={(e) => e.preventDefault()}>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="user">Nick do usuário</label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fas fa-user"></i></span>
                                            </div>
                                            <input type="text" id="user" onChange={(e) => setUsuario(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="user">Opinião</label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fas fa-comments"></i></span>
                                            </div>
                                            <input type="text" id="talk" onChange={(e) => setOpniao(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                </div>

                                <div className="card-footer">
                                    <button type="button" onClick={() => handleSubmit()} disabled={(loading ? true : false)} className="btn btn-primary d-flex">Salvar
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

export default InserirOpniao