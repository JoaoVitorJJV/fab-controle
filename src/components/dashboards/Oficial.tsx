import { useEffect, useState } from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useApi } from "@app/hooks/useApi";
import { Player } from "@lottiefiles/react-lottie-player";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'FMB - Controle de Metas',
        },
    },
};

const Oficial = () => {
    const api = useApi()
    const [loading, setLoading] = useState(false)
    const [dadosChart, setDadosChart] = useState<any>([])
    const [labelsData, setLabelsData] = useState<any>([])
    const [alistadosTotais, setAlistados] = useState('')
    const [metasHoje, setMetasHoje] = useState<any>({})
    const [destaques, setDestaques] = useState({praca: '', oficial: ''})
    

    useEffect(() => {
        setLoading(true)
        const getAllMetas = async () => {
            const result = await api.getMetas()

            if (result.data.auth) {
                const helper = result.data.alistados
                setDadosChart([helper[7].alistados, helper[6].alistados, helper[5].alistados, helper[4].alistados, helper[3].alistados, helper[2].alistados, helper[1].alistados, helper[0].alistados])
                setLabelsData([helper[7].dia, helper[6].dia, helper[5].dia, helper[4].dia, helper[3].dia, helper[2].dia, helper[1].dia, helper[0].dia])
                setMetasHoje(result.data.hojeMetas)
                setAlistados(result.data.alitadosTotais)
                setDestaques({praca: result.data.pracaDestaque, oficial: result.data.oficialDestaque})
                setLoading(false)
            }

        }

     

        getAllMetas()
      
    }, [])
    const labels = labelsData;
    const data = {
        labels,
        datasets: [
            {
                label: 'Alistados',
                data: dadosChart,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    return (
        <>
            <div className="row">
                <div className="col-12 col-md-3 col-sm-3 col-lg-3">
                    <div className="info-box">
                        <span className="info-box-icon bg-info"><i className="far fa-user"></i></span>
                        <div className="info-box-content">
                            <span className="info-box-text">Alistados</span>
                            <span className="info-box-number">{alistadosTotais}</span>
                        </div>

                    </div>
                </div>
                <div className="col-12 col-md-3 col-sm-3 col-lg-3">
                    <div className="info-box">
                        <span className="info-box-icon bg-info"><i className="far fa-file"></i></span>
                        <div className="info-box-content">
                            <span className="info-box-text">Alistados hoje</span>
                            <span className="info-box-number">{metasHoje.alistadosHoje} Alistados</span>
                        </div>

                    </div>
                </div>
                <div className="col-12 col-md-3 col-sm-3 col-lg-3">
                    <div className="info-box">
                        <span className="info-box-icon bg-info">
                            <img alt="Oficial Destaque" width={55} src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${destaques.oficial}&direction=2&head_direction=3&size=l&gesture=sml&headonly=1`} />
                        </span>
                        <div className="info-box-content">
                            <span className="info-box-text">Oficial destaque</span>
                            <span className="info-box-number">{destaques.oficial}</span>
                        </div>

                    </div>
                </div>
                <div className="col-12 col-md-3 col-sm-3 col-lg-3">
                    <div className="info-box">
                        <span className="info-box-icon bg-info">
                            <img alt="Oficial Destaque" width={55} src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${destaques.praca}&direction=2&head_direction=3&size=l&gesture=sml&headonly=1`} />
                        </span>
                        <div className="info-box-content">
                            <span className="info-box-text">Praça Destaque</span>
                            <span className="info-box-number">{destaques.praca}</span>
                        </div>

                    </div>
                </div>

            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Gráfico de metas gerais</h5>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                    <i className="fas fa-minus"></i>
                                </button>
                                <button type="button" className="btn btn-tool" data-card-widget="remove">
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        </div>

                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-8">
                                    <p className="text-center">
                                        <strong>Alistados dos últimos 7 dias, com base nos registros</strong>
                                    </p>
                                    <div className="chart">
                                        {loading &&
                                            <Player
                                                autoplay
                                                loop
                                                src="https://assets2.lottiefiles.com/packages/lf20_ht6o1bdu.json"
                                                style={{ width: '120px' }}
                                            >      </Player>
                                        }

                                        {!loading &&
                                            <Line options={options} data={data} />
                                        }

                                    </div>

                                </div>

                                <div className="col-md-4">
                                    <p className="text-center">
                                        <strong>Treinamentos</strong>
                                    </p>
                                    <div className="progress-group">
                                        Treinamento Básico I
                                        <span className="float-right"><b>{metasHoje.T1Hoje}</b>/5</span>
                                        <div className="progress progress-sm">
                                            <div className="progress-bar bg-primary" style={{ width: (((metasHoje.T1Hoje * 100) / 5) + '%')} }></div>
                                        </div>
                                    </div>

                                    <div className="progress-group">
                                        Treinamento Básico II
                                        <span className="float-right"><b>{metasHoje.T1Hoje}</b>/5</span>
                                        <div className="progress progress-sm">
                                            <div className="progress-bar bg-danger" style={{ width: (((metasHoje.T2Hoje * 100) / 5) + '%') }}></div>
                                        </div>
                                    </div>

                                    

                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Oficial