import { useApi } from "@app/hooks/useApi"
import { Player } from "@lottiefiles/react-lottie-player"
import { useState } from "react"
import { toast } from "react-toastify"


const Configuracoes = () => {
    const [loading, setLoading] = useState(false)
    const [senhaAntiga, setSenhaAntiga] = useState('')
    const [novaSenha, setNovaSenha] = useState('')
    const api = useApi()


    const handleSubmit = async () => {
        setLoading(true)
        if(senhaAntiga && novaSenha){
            const response = await api.changeSenha(novaSenha, senhaAntiga)
            if(response.data.auth){
                toast.success(response.data.msg)
            }else{
                toast.error(response.data.msg)
            }

            setLoading(false)
        }else{
            
            setLoading(false)
            toast.error('Todos os campos precisam ser preenchidos.')
        }
    }

    return (
        <div className="row">
            <div className="col-12">
                <div className="row">
                    <div className="col-11">

                        <div className="card card-primary">
                            <div className="card-header">
                                <h3 className="card-title"><img src="/img/icons/cadeado.png" alt="cadeado"/>&nbsp;Alterar senha</h3>
                            </div>
                            <form onClick={(e) => e.preventDefault()}>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="user">Senha antiga</label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fas fa-key"></i></span>
                                            </div>
                                            <input type="password" id="user" onChange={(e) => setSenhaAntiga(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="user">Nova senha</label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fas fa-key"></i></span>
                                            </div>
                                            <input type="password" id="user" onChange={(e) => setNovaSenha(e.target.value)} className="form-control" />
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

export default Configuracoes