import { AuthContext } from "@app/contexts/Auth/AuthContext"
import { useApi } from "@app/hooks/useApi"
import { Player } from "@lottiefiles/react-lottie-player"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"


const EditarAviso = () => {
    const [dados, setDados] = useState<any>({
        id: '',
        nome: '',
        texto: '',
        tipo: '',
        datetime: '',
        titulo: ''
    })
    const [loading, setLoading] = useState(false)
    const [nome, setNome] = useState('')
    const [txt, setTxt] = useState('')
    const [tipo, setTipo] = useState('')
    const [titulo, setTitulo] = useState('')
    const logged = useContext(AuthContext)
    const api = useApi()
    let { id } = useParams()
    const navigation = useNavigate()

    useEffect(() => {
        const getDados = async () => {
            const res = await api.getAvisoId(id)

            if (res.data.auth) {
                setDados(res.data.dados)
            } else {
                navigation('/oficiais/avisos')
            }
        }

        getDados()
    }, [])

    const handleSubmit = async () => {
        setLoading(true)
        var nomeVer = (nome ? nome : dados.nome)
        var textoVer = (txt ? txt : dados.texto)
        var tipoVer = (tipo ? tipo : dados.tipo)


        const response = await api.editAviso(dados.id, nomeVer, textoVer, tipoVer, titulo)

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
                                <h3 className="card-title"><img src="/img/icons/estrela.png" />&nbsp;Editar aviso</h3>
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
                                            <input type="text" id="user" onChange={(e) => setTxt(e.target.value)} value={(txt ? txt : dados.texto)} className="form-control" />
                                        </div>
                                    </div>
                                    {dados.tipo && dados.tipo === 'Novidades' &&

                                        <div className="form-group">
                                            <label htmlFor="user">Título do aviso</label>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fas fa-comments"></i></span>
                                                </div>
                                                <input type="text" id="user" onChange={(e) => setTitulo(e.target.value)} className="form-control" value={(titulo ? titulo : dados.titulo)} />
                                            </div>
                                        </div>
                                    }
                                    <div className="form-group">
                                        <label htmlFor="exampleInputFile">Tipo</label>
                                        <select className="custom-select" onChange={(e) => setTipo(e.target.value)} required>
                                            <option value="Global" selected={(dados.tipo === 'Global' ? true : false)}>Global</option>
                                            <option value="Novidades" selected={(dados.tipo === 'Novidades' ? true : false)}>Novidades</option>
                                        </select>
                                    </div>
                                    <label>O usuário precisa ser alistado.</label>
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

export default EditarAviso