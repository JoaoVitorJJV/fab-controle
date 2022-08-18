import { useApi } from "@app/hooks/useApi"
import { Player } from "@lottiefiles/react-lottie-player"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"


const EditarSlides = () => {
    const [dados, setDados] = useState<any>({
        id: '',
        slide_url: '',
        slide_alt: '',
        slide_ordem: '',
        slide_url_a: ''

    })
    const [loading, setLoading] = useState(false)
    const [urlImg, setUrlImg] = useState('')
    const [urlImgDirecao, setUrlImgDirecao] = useState('')
    const [titulo, setTitulo] = useState('')
    const api = useApi()
    let { id } = useParams()
    const navigation = useNavigate()

    useEffect(() => {
        const getDados = async () => {
            const res = await api.getSlideID(id)

            if (res.data.auth) {
                setDados(res.data.slide)
            } else {
                navigation('/oficiais/slides')
            }
        }

        getDados()
    }, [])

    const handleSubmit = async () => {
        setLoading(true)
        var urlImgVer = (urlImg ? urlImg : dados.slide_url)
        var urlImgDirecaoVer = (urlImgDirecao ? urlImgDirecao : dados.slide_url_a)
        var tituloVer = (titulo ? titulo : dados.slide_alt)


        const response = await api.editSlide(dados.id, tituloVer, urlImgVer, urlImgDirecaoVer)

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
                                <h3 className="card-title"><img src="/img/icons/estrela.png" />&nbsp;Editar Slide</h3>
                            </div>
                            <form onClick={(e) => e.preventDefault()}>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="user">Título da imagem</label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fas fa-comments"></i></span>
                                            </div>
                                            <input type="text" id="user" onChange={(e) => setTitulo(e.target.value)} value={(titulo ? titulo : dados.slide_alt)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="user">URL da imagem</label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fas fa-globe"></i></span>
                                            </div>
                                            <input type="text" id="user" onChange={(e) => setUrlImg(e.target.value)} value={(urlImg ? urlImg : dados.slide_url)} className="form-control" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="user">URL de direção</label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fas fa-globe"></i></span>
                                            </div>
                                            <input type="text" id="user" onChange={(e) => setUrlImgDirecao(e.target.value)} value={(urlImgDirecao ? urlImgDirecao : dados.slide_url_a)} className="form-control" />
                                        </div>
                                    </div>
                                    <label> Para a imagem funcionar, ela precisa ter a extensão na url. Exemplo: (https://imgur.com/a/imagem.png).</label>
                                </div>

                                <div className="card-footer d-flex">
                                    <button type="button" onClick={() => handleSubmit()} disabled={(loading ? true : false)} className="btn btn-primary d-flex">Salvar
                                    </button>&nbsp;
                                    <button type="button" onClick={() => navigation('/oficiais/slides')} className="btn btn-primary d-flex">Voltar
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

export default EditarSlides