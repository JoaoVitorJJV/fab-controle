import { useApi } from "@app/hooks/useApi"
import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


const Slides = () => {
    const navigate = useNavigate()
    const api = useApi()
    const [verTabela, setVerTabela] = useState(true)
    const [slides, setSlides] = useState([])
    const [atualizarDOOM, setAtualizarDOOM] = useState(false)

    useEffect(() => {
        const slides = async () => {
            const res = await api.getSlides()

            if (res.data.auth) {
                setSlides(res.data.slides)
                setVerTabela(true)
            }
        }

        slides()

    }, [atualizarDOOM])

    const trocar = async (pos: string, id: any, ordem: string) => {
        const res = await api.trocarSlide(ordem, pos, id)

        if(res.data.auth){
            setAtualizarDOOM(!atualizarDOOM)
        }
    }

    const excluirSlide = async (id: any) => {
        const res = await api.excluirSlide(id)

        if(res.data.auth){
            toast.success(res.data.msg)
            setAtualizarDOOM(!atualizarDOOM)
        }else{
            toast.error(res.data.msg)
        }
    }

    return (
        <div className="row">

            <div className="col-12">
                <div className="add mt-2 mb-2">
                    <Button variant="success" onClick={() => navigate('/oficiais/slides/criar')}>
                        <i className="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;
                        Novo
                    </Button>
                </div>

                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title"><img alt="estrela" src="/img/icons/estrela.png" />&nbsp;Slides site</h3>
                    </div>
                    <div className="card-body">
                        {verTabela &&
                            <Table striped bordered hover size="md" responsive>
                                <thead>
                                    <tr>
                                        <th>Slide</th>
                                        <th>URL da imagem</th>
                                        <th>Título da imagem</th>
                                        <th>URL direção</th>
                                        <th>Ordem</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {slides.map((slide: any) => (
                                        <tr key={slide.id}>
                                            <td>
                                                <img alt="Slide" style={{ maxWidth: '90px' }} src={slide.slide_url} />
                                            </td>
                                            <td >
                                                <a href={slide.slide_url} target="blank">{(slide.slide_url.length > 50 ? slide.slide_url.substr(0, 20) + '...' : slide.slide_url)}</a>
                                            </td>
                                            <td>{slide.slide_alt}</td>
                                            <td>
                                                <a href={slide.slide_url_a} target="blank">{(slide.slide_url_a > 50 ? slide.slide_url_a.substr(0, 20) + '...' : slide.slide_url_a)}</a>
                                            </td>
                                            <td>{slide.slide_ordem}
                                                &nbsp;&nbsp;
                                                <button type="button" title="Acima" onClick={() => trocar('Abaixo', slide.id, slide.slide_ordem)} className='btn btn-sm btn-info'><i className="fa fa-arrow-up"></i></button>&nbsp;
                                                <button type="button" title="Abaixo" onClick={() => trocar('Acima', slide.id, slide.slide_ordem)} className='btn btn-sm btn-info'><i className="fa fa-arrow-down"></i></button>&nbsp;
                                            </td>
                                            <td>
                                                <button type="button" title="Editar" onClick={() => navigate(`/oficiais/slides/editar/${slide.id}`)} className='btn btn-sm btn-warning'><i className="fa fa-pen"></i></button>&nbsp;
                                                <button type="button" title="Apagar" onClick={() => excluirSlide(slide.id)} className='btn btn-sm btn-danger'><i className="fa fa-trash"></i></button>&nbsp;
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </Table>
                        }

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Slides