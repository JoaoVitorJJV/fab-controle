import { useApi } from "@app/hooks/useApi";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component"
import { customStyles } from "@app/styles/datatable";

const LogsUsuarios = () => {
    const [dados, setDados] = useState<any>([])
    const [colunas, setColunas] = useState<any>([])
    const api = useApi()

    type LogsType = {
        id: number;
        usuario: string;
        acao: string;
        datetime: string
    }

    useEffect(() => {
        const getLogsAc = async () => {
            const response = await api.getLogs()

            if (response.data.auth && response.data.logs.length > 0) {
                const dados = response.data.logs


                var dadosArr: any = []
                dados.map((log: LogsType, i: number) => {
                    var formatarData = new Date(log.datetime)
                    var dataFormatadaDias = formatarData.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' })
                    var dataFormatadaHoras = formatarData.toLocaleString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                    var datasJuntas = dataFormatadaDias + ' às ' + dataFormatadaHoras
                    var imgURL = `https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${log.usuario}&direction=3&head_direction=3&size=m&headonly=1`
                    dadosArr[i] = {
                        id: i,
                        userImage: <img alt="user image" src={imgURL}/>,
                        user: log.usuario,
                        acao: log.acao,
                        datetime: datasJuntas
                    }
                })
                setDados(dadosArr)

                const colunas = [
                    {
                        selector: (row: {userImage: any}) => row.userImage,
                        width: '80px', // custom width for icon button
                        style: {
                            borderBottom: '1px solid #FFFFFF',
                            marginBottom: '-1px',
                        },
                    },
                    {
                        id: 'usuario',
                        name: 'Usuário',
                        selector: (row: { user: any; }) => row.user,
                        sortable: true,
                        left: true,
                        reorder: true,
                        style: {
                            fontWeight: 'bold'
                        }
                    },
                    {
                        id: 'acao',
                        name: 'Ação',
                        selector: (row: { acao: any; }) => row.acao,
                        sortable: true,
                        left: true,
                        reorder: true,
                        wrap: true,
                    },
                    {
                        id: 'datetime',
                        name: 'Data',
                        selector: (row: { datetime: any; }) => row.datetime,
                        sortable: true,
                        left: true,
                        reorder: true,
                    },
                ];

                setColunas(colunas)
            }
        }


        getLogsAc()
    }, [])

   

    const paginationComponentOptions = {
        rowsPerPageText: 'Logs por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };
    return (
        <div className="row justify-content-center">
            <div className="col-11">
                <DataTable
                    title="Log dos usuários"
                    columns={colunas}
                    data={dados}
                    highlightOnHover
                    pagination
                    fixedHeader
                    paginationComponentOptions={paginationComponentOptions}
                    customStyles={customStyles}
                    noDataComponent="Nenhum registro encontrado"
                />
            </div>

        </div>
    )
}

export default LogsUsuarios