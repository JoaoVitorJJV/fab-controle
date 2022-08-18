import { useApi } from "@app/hooks/useApi"
import { Player } from "@lottiefiles/react-lottie-player"
import { useState } from "react"
import { toast } from "react-toastify"


const CriarSlide = () => {
    const [loading, setLoading] = useState(false)
    const [urlImg, setUrlImg] = useState('')
    const [urlImgDirecao, setUrlImgDirecao] = useState('')
    const [titulo, setTitulo] = useState('')
    const api = useApi()


    const handleSubmit = async () => {
        setLoading(true)
        if (urlImg && urlImgDirecao && titulo) {

            const response = await api.criarSlide(titulo, urlImg, urlImgDirecao)
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
                                <h3 className="card-title"><img src="/img/icons/estrela.png" />&nbsp;Criar novo Slide</h3>
                            </div>
                            <form onClick={(e) => e.preventDefault()}>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="user">Título da imagem</label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fas fa-comments"></i></span>
                                            </div>
                                            <input type="text" id="user" onChange={(e) => setTitulo(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="user">URL da imagem</label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fas fa-globe"></i></span>
                                            </div>
                                            <input type="text" id="user" onChange={(e) => setUrlImg(e.target.value)} className="form-control" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="user">URL de direção</label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fas fa-globe"></i></span>
                                            </div>
                                            <input type="text" id="user" onChange={(e) => setUrlImgDirecao(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                    <label> Para a imagem funcionar, ela precisa ter a extensão na url. Exemplo: (https://imgur.com/a/imagem.png).</label>
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

export default CriarSlide