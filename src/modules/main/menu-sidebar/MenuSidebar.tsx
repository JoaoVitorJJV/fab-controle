import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MenuItem } from '@components';
import { AuthContext } from '@app/contexts/Auth/AuthContext';
import api from '@app/services/api';

var menusPadrao = [
  {
    name: 'Inicial',
    path: '/',
    icon: 'fa-tachometer-alt'
  },
  {
    name: 'Configurações',
    icon: 'fa-cog',
    children: [
      {
        name: 'Geral',
        path: '/configuracoes/geral'
      }
    ]
  }
]

var menusOficial = [
  {
    name: 'Alistados',
    icon: 'fa-users',
    children: [
      {
        name: 'Ações com alistados',
        path: '/oficiais/acoes-alistados'
      },
      {
        name: 'Siglas',
        path: '/oficiais/siglas'
      },
      {
        name: 'Alistados',
        path: '/oficiais/alistados'
      },
      {
        name: 'Criar usuário',
        path: '/oficiais/criar-usuario'
      },
      {
        name: 'Inserir Opinião',
        path: '/oficiais/inserir-opniao'
      },

    ]
  },
  {
    name: 'Destaques',
    path: '/oficiais/destaques',
    icon: 'fa fa-star'
  },
  {
    name: 'Relatórios',
    path: '/oficiais/relatorios',
    icon: 'fa-file'
  },
  {
    name: 'Site',
    icon: 'fa fa-globe',
    children: [
      {
        name: 'Avisos site',
        path: '/oficiais/avisos'
      },
      {
        name: 'Slides',
        path: '/oficiais/slides'
      }
    ]
  },

]

var menuAC = [
  {
    name: 'Alto Comando',
    icon: 'fa-eye',
    children: [
      {
        name: 'Usuários Painel',
        path: '/oficiais/ac/usuarios'
      },
      {
        name: 'Logs usuários',
        path: '/oficiais/ac/logs'
      },

    ]
  }
]

var menusPraca = [
  {
    name: 'Relatórios de Treinamento',
    path: '/pracas/relatorios',
    icon: 'fa-folder',
    children: [
      {
        name: 'Criar relatório',
        path: '/pracas/criar-relatorio'
      },
      {
        name: 'Meus relatórios',
        path: '/pracas/meus-relatorios'
      },

    ]
  },

  {
    name: 'Meu perfil',
    path: '/pracas/meu-perfil',
    icon: 'fa-id-badge'
  },
  {
    name: 'Sair',
    icon: 'fa fa-reply-all'
  }

]

var menus = menusPadrao
const getPat = async () => {
  var token = localStorage.getItem('authToken')

  if (token) {
    const result = await api.post('/validate', {
      token
    })

    if (result.data.auth) {
      var patId: number = result.data.user.pat_id

      if (patId) {
        if (patId > 12) {
          var novoMenu = {
            name: 'Alto Comando',
            icon: 'fa-eye',
            children: [
              {
                name: 'Usuários Painel',
                path: '/oficiais/ac/usuarios'
              },
              {
                name: 'Logs usuários',
                path: '/oficiais/ac/logs'
              },

            ]
          }

          // menusOficial.push(novoMenu)
        }
      }
    }
  }

}

getPat()



export interface IMenuItem {
  name: string;
  path?: string;
  children?: Array<IMenuItem>;
  icon?: string;
}


export const MENU: IMenuItem[] = menus;

const MenuSidebar = () => {
  const logged = useContext(AuthContext);
  const sidebarSkin = useSelector((state: any) => state.ui.sidebarSkin);
  const menuItemFlat = useSelector((state: any) => state.ui.menuItemFlat);
  const menuChildIndent = useSelector((state: any) => state.ui.menuChildIndent);

  return (
    <aside className={`main-sidebar elevation-4 ${sidebarSkin}`}>
      <Link to="/" className="brand-link">
        <img
          src="/img/fmb.gif"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: '.8' }}
        />
        <span className="brand-text font-weight-light">FAB Controle</span>
      </Link>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${logged.user?.nickname}&direction=2&head_direction=3&size=l&headonly=1`}
              className="img-circle elevation-1"
              alt="User"
            />
          </div>
          <div className="info">
            <Link to="/profile" className="d-block">
              {logged.user?.nickname}
            </Link>
          </div>
        </div>
        <nav className="mt-2" style={{ overflowY: 'hidden' }}>
          <ul
            className={`nav nav-pills nav-sidebar flex-column${menuItemFlat ? ' nav-flat' : ''
              }${menuChildIndent ? ' nav-child-indent' : ''}`}
            role="menu"
          >
            <li className="nav-header">GERAL</li>
            {menus.map((menuItem: IMenuItem) => (
              <MenuItem key={menuItem.name} menuItem={menuItem} />
            ))}

            {logged.user?.pat_id &&
              <>
                {logged.user.pat_id > 6 &&
                  <>
                    <li className="nav-header">OFICIAIS</li>
                    {menusOficial.map((menuItem: IMenuItem) => (
                      <MenuItem key={menuItem.name} menuItem={menuItem} />
                    ))}
                  </>
                }

                {logged.user.pat_id > 16 &&
                  <>
                    {
                      menuAC.map((menuItem: IMenuItem) => (
                        <MenuItem key={menuItem.name} menuItem={menuItem} />
                      ))
                    }
                  </>
                }

              </>
            }
            <li className="nav-header">PRAÇAS</li>
            {menusPraca.map((menuItem: IMenuItem) => {
              return <MenuItem key={menuItem.name} menuItem={menuItem} />
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default MenuSidebar;
