import { useCallback, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebarMenu } from '@app/store/reducers/ui';
import UserDropdown from '@app/modules/main/header/user-dropdown/UserDropdown';
import { Link } from 'react-router-dom';
import { AuthContext } from '@app/contexts/Auth/AuthContext';
import { Player } from '@lottiefiles/react-lottie-player';
import { useApi } from '@app/hooks/useApi';

const Header = () => {
  const dispatch = useDispatch();
  const navbarVariant = useSelector((state: any) => state.ui.navbarVariant);
  const headerBorder = useSelector((state: any) => state.ui.headerBorder);
  const logged = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [pesquisa, setPesquisa] = useState(''),
    [resposta, setResposta] = useState<any>({}),
    [mostrarResultado, setMostrarResultado] = useState(false),
    [vazio, setVazio] = useState(false),
    [msgError, setMsgError] = useState('')

  const api = useApi()

  const handleToggleMenuSidebar = () => {
    dispatch(toggleSidebarMenu());
  };


  const getContainerClasses = useCallback(() => {
    let classes = `main-header navbar navbar-expand ${navbarVariant}`;
    if (headerBorder) {
      classes = `${classes} border-bottom-0`;
    }
    return classes;
  }, [navbarVariant, headerBorder]);

  const fecharPesquisa = () => {
    setMostrarResultado(false)
    setVazio(false)
    setMsgError('')
    setResposta({})
    setPesquisa('')
  }

  const handleSubmit = async (key: string) => {
    if (key === 'Enter') {
      setLoading(true)
      const res = await api.pesquisaMilitar(pesquisa)

      if (res.data.auth) {
        var resultado = res.data.resultado
        var datetimeRegistro = new Date(resultado.registro)
        var registroFormatado = datetimeRegistro.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
        var datetimeUltimaPromo = new Date(resultado.ultima_promocao)
        var ultimaPromoFormatado = datetimeUltimaPromo.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })

        resultado.registro = registroFormatado
        resultado.ultima_promocao = ultimaPromoFormatado


        setResposta(resultado)
        setMostrarResultado(true)
        setLoading(false)
      } else if (res.data.error) {
        setMsgError(res.data.message)
        setMostrarResultado(true)
        setVazio(true)
        setLoading(false)
      }


    }
  }

  return (
    <>
      <nav className={getContainerClasses()}>
        <ul className="navbar-nav d-flex align-items-center">
          <li className="nav-item">
            <button
              onClick={handleToggleMenuSidebar}
              type="button"
              className="nav-link"
            >
              <i className="fas fa-bars" />
            </button>
          </li>
          {/* <li className="nav-item d-none d-sm-inline-block">
          ❝Asas que protegem o país❞
        </li> */}

          <div className="input-group input-group-sm">
            <input className="form-control" value={pesquisa} onChange={(e) => setPesquisa(e.target.value)} onKeyDown={(e) => handleSubmit(e.key)} type="search" placeholder="Pesquisar Militar" style={{ color: 'black' }} />
            <div className="input-group-append">
              <button className="btn btn-navbar" type="button" onClick={() => handleSubmit('Enter')}>
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </ul>
        <ul className="navbar-nav ml-auto">
          {/* <NotificationsDropdown /> */}
          {logged.user &&
            <>
              {logged.user.pat_id > 9 &&
                <Link to="/oficiais/central" target="_blank" className='d-flex align-items-center'>
                  <i className="fas fa-bullseye" aria-hidden="true"></i>
                </Link>
              }

            </>

          }
          &nbsp;&nbsp;
          <i className={`flag-icon flag-icon-br mr-2`} />


          {/* <LanguagesDropdown /> */}
          <UserDropdown />
          {/* <li className="nav-item">
          <Button className="nav-link" onClick={handleToggleControlSidebar}>
            <i className="fas fa-th-large" />
          </Button>
        </li> */}
        </ul>

      </nav>
      {mostrarResultado &&
        <div className={getContainerClasses()} style={{ backgroundColor: '#f4f6f9' }}>
          {loading &&

            <div className='d-flex justify-content-center w-100'>
              <div>
                <Player
                  autoplay
                  loop
                  src="https://assets2.lottiefiles.com/packages/lf20_ht6o1bdu.json"
                  style={{ width: '120px' }}
                >
                </Player>
              </div>

            </div>

          }

          {!loading &&

            <>
              {mostrarResultado && resposta && !vazio &&
                <section className="bg-info shadow-sm rounded p-3 mb-3 col-lg-12">
                  <div className="row">
                    <div className="col-sm-12 col-md-2 d-flex justify-content-center align-items-center mb-3">

                      <div className="img-circle profile-user-img resultado_img" style={{ height: " 150px", width: "150px", margin: "0px auto", background: `url(https://www.habbo.com.br/habbo-imaging/avatarimage?user=${resposta.nome}&direction=2&head_direction=3&gesture=sml&size=l) center center no-repeat`, backgroundColor: '#0e1d41' }}></div>
                    </div>

                    <div className="col-sm-11 col-md-10">
                      <h4>{resposta.nome}</h4>
                      <p className="my-0 ">
                        <b>Patente</b>: {resposta.patente}
                      </p>
                      <p className="my-0">
                        <b>Siglas</b>: {(resposta.siglas === 'Nenhuma' ? 'Não possui' : resposta.siglas)}
                      </p>
                      <p className="my-0">
                        <b>Última Promoção</b>: {resposta.ultima_promocao}
                      </p>
                      <p className="my-0">
                        <b>Promovido por</b>: {resposta.promovido_por}
                      </p>
                      <p className="my-0">
                        <b>Status</b>: {resposta.status}
                      </p>
                      <p className="my-0">
                        <b>Alistado em</b>: {resposta.registro}
                      </p>
                      <div>

                      </div>
                    </div>
                    <div className="col-sm-1 col-md-1">
                      <button  onClick={() => fecharPesquisa()} type="button" className="btn btn-tool" data-card-widget="remove">
                        <i color='black' className="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                </section>
              }

              {vazio &&

                <div className="small-box bg-danger w-100">
                  <div className="inner">
                    <div className='d-flex justify-content-between'>

                      <h4>Ops!</h4>
                      <button onClick={() => fecharPesquisa()} type="button" className="btn btn-tool" data-card-widget="remove">
                        <i className="fas fa-times"></i>
                      </button>
                    </div>

                    <p>{msgError}</p>
                  </div>
                </div>
              }

            </>

          }

        </div>
      }

    </>

  );
};

export default Header;
