import { useApi } from '@app/hooks/useApi';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

const Alistados = () => {

    const api = useApi()
    const [columns, setColumns] = useState<any>([])
    const [data, setData] = useState([])
    const [pending, setPeding] = useState(true)


    useEffect(() => {
        const getAlistadosAPi = async () => {
            const response = await api.getAlistados()

            if (response.data.auth) {

                const res = response.data.alistados

                var dados: any = []

                res.map((alistados: any, i: number) => {
                    dados[i] = {
                        id: i,
                        nick: alistados.nomeAlistado,
                        patente: alistados.patente
                    }
                })

                setData(dados)
                setPeding(false)
            }
        }

        getAlistadosAPi()
        const colunas = [
            {
                cell: () => (<img alt="alistados" src="https://1.bp.blogspot.com/-9vX_KZyymlQ/X7MoU8_stMI/AAAAAAABfRk/7Uc4QPQpDLs1DlFhDrICm7ttAKC6_8LHgCPcBGAsYHg/s0/720__-55P.png" />),
                width: '56px', // custom width for icon button
                style: {
                    borderBottom: '1px solid #FFFFFF',
                    marginBottom: '-1px',
                },
            },
            {
                id: 'nick',
                name: 'Nickname',
                selector: (row: { nick: any; }) => row.nick,
                sortable: true,
                left: true,
                reorder: true,
                style: {
                    fontWeight: 'bold'
                }
            },
            {
                id: 'patente',
                name: 'Patente',
                selector: (row: { patente: any; }) => row.patente,
                sortable: true,
                left: true,
                reorder: true,
            },
        ];

        setColumns(colunas)
    }, [])

    const customStyles = {
        headRow: {
            style: {
                border: 'none',
            },
        },
        headCells: {
            style: {
                color: '#202124',
                fontSize: '16px',
                fontWeight: 'bold'
            },
        },
        rows: {
            highlightOnHoverStyle: {
                backgroundColor: 'rgb(230, 244, 244)',
                borderBottomColor: '#FFFFFF',
                borderRadius: '25px',
                outline: '1px solid #FFFFFF',
            },
        }
    }
    const paginationComponentOptions = {
        rowsPerPageText: 'Alistados por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };


    return (
        <div className="row">
            <div className="col-12">
                <DataTable
                    title="Alistados"
                    columns={columns}
                    data={data}
                    highlightOnHover
                    pagination
                    fixedHeader
                    paginationComponentOptions={paginationComponentOptions}
                    customStyles={customStyles}
                />
            </div>

        </div>

    )
}

export default Alistados