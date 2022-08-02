import { AuthContext } from "@app/contexts/Auth/AuthContext"
import { useApi } from "@app/hooks/useApi"
import { Player } from "@lottiefiles/react-lottie-player"
import { useContext, useState } from "react"
import { toast } from "react-toastify"


const CriarDestaque = () => {
    const [loading, setLoading] = useState(false)
    const [nome, setNome] = useState('')
    const [motivo, setMotivo] = useState('')
    const [datetime, setDatetime] = useState('')
    const [tipo, setTipo] = useState('')
    const logged = useContext(AuthContext)
    const api = useApi()


    const handleSubmit = async () => {
        setLoading(true)
        if(nome && motivo && datetime){
            const response = await api.createDestaqueSite(nome, logged.user?.nickname, datetime, (tipo ? tipo : 'praca'), motivo)
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
                                <h3 className="card-title"><img alt="estrela" src="/img/icons/estrela.png" />&nbsp;Criar novo destaque</h3>
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
                                        <label htmlFor="user">Motivo</label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fas fa-comments"></i></span>
                                            </div>
                                            <input type="text" id="user" onChange={(e) => setMotivo(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="user">Data (dia e hora)</label>
                                        <input type="date" id="user" className="form-control pull-right" onChange={(e) => setDatetime(e.target.value)}/>                                        
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputFile">Tipo</label>
                                        <select className="custom-select" onChange={(e) => setTipo(e.target.value)} required>
                                            <option value="praca">Praça</option>
                                            <option value="oficial">Oficial</option>
                                        </select>
                                    </div>
                                    <label>O usuário precisa ser alistado para ser destaque.</label>
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

export default CriarDestaque