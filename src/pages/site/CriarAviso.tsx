import { useApi } from "@app/hooks/useApi"
import { Player } from "@lottiefiles/react-lottie-player"
import { useState } from "react"
import { toast } from "react-toastify"


const CriarAviso = () => {
    const [loading, setLoading] = useState(false)
    const [nome, setNome] = useState('')
    const [txt, setTxt] = useState('')
    const [tipo, setTipo] = useState('')
    const [titulo, setTitulo] = useState('')
    const api = useApi()


    const handleSubmit = async () => {
        setLoading(true)
        if (nome && txt) {
            console.log(tipo)
            const response = await api.createAviso(nome, txt, (tipo ? tipo : 'Global'), titulo)
            if (response.data.auth) {
                toast.success(response.data.msg)
            } else {
                toast.error(response.data.msg)
            }

            setLoading(false)
        } else {

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
                                <h3 className="card-title"><img src="/img/icons/estrela.png" />&nbsp;Criar novo Aviso</h3>
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
                                        <label htmlFor="user">Texto do aviso</label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fas fa-comments"></i></span>
                                            </div>
                                            <input type="text" id="user" onChange={(e) => setTxt(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                    {tipo && tipo === 'Novidades' &&

                                        <div className="form-group">
                                            <label htmlFor="user">Título do aviso</label>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fas fa-comments"></i></span>
                                                </div>
                                                <input type="text" id="user" onChange={(e) => setTitulo(e.target.value)} className="form-control" />
                                            </div>
                                        </div>
                                    }
                                    <div className="form-group">
                                        <label htmlFor="exampleInputFile">Tipo</label>
                                        <select className="custom-select" onChange={(e) => setTipo(e.target.value)} required>
                                            <option value="Global">Global</option>
                                            <option value="Novidades">Novidade</option>
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

export default CriarAviso