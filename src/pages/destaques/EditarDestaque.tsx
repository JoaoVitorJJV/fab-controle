import { AuthContext } from "@app/contexts/Auth/AuthContext"
import { useApi } from "@app/hooks/useApi"
import { Player } from "@lottiefiles/react-lottie-player"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"


const EditarDestaque = () => {
    const [dados, setDados] = useState<any>({
        nome: '',
        data: '',
        motivo: '',
        patente: '',
        tipo: ''
    })
    const [loading, setLoading] = useState(false)
    const [nome, setNome] = useState('')
    const [motivo, setMotivo] = useState('')
    const [datetime, setDatetime] = useState('')
    const [tipo, setTipo] = useState('')
    const logged = useContext(AuthContext)
    const api = useApi()
    let { nick } = useParams()
    const navigation = useNavigate()

    useEffect(() => {
        const getDados = async () => {
            const res = await api.getDestaqueNome(nick)

            if (res.data.auth) {
                setDados(res.data.dados)
            } else {
                navigation('/oficiais/destaques')
            }
        }

        getDados()
    }, [])

    const handleSubmit = async () => {
        setLoading(true)
        var nomeVer = (nome ? nome : dados.nome)
        var motivoVer = (motivo ? motivo : dados.motivo)
        var datetimeVer = (datetime ? datetime : dados.data)
        var tipoVer = (tipo ? tipo : dados.tipo)


        const response = await api.editDestaque(dados.id, nomeVer, logged.user?.nickname, datetimeVer, tipoVer, motivoVer)

        if (response.data.auth) {
            toast.success(response.data.msg)
        } else {
            toast.error(response.data.msg)
        }

        setLoading(false)

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
                                            <input type="text" id="user" onChange={(e) => setNome(e.target.value)} value={(nome ? nome : dados.nome)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="user">Motivo</label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fas fa-comments"></i></span>
                                            </div>
                                            <input type="text" id="user" onChange={(e) => setMotivo(e.target.value)} value={(motivo ? motivo : dados.motivo)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="user">Data (dia e hora)</label>
                                        <input type="date" id="user" className="form-control pull-right" onChange={(e) => setDatetime(e.target.value)} value={(datetime ? datetime : dados.data)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputFile">Tipo</label>
                                        <select className="custom-select" onChange={(e) => setTipo(e.target.value)} required>
                                            <option value="praca" selected={(dados.tipo === 'praca' ? true : false)}>Praça</option>
                                            <option value="oficial" selected={(dados.tipo === 'oficial' ? true : false)}>Oficial</option>
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

export default EditarDestaque