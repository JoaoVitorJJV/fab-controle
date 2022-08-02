import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '@modules/main/Main';
import Login from '@modules/login/Login';
// import Register from '@modules/register/Register';
// import ForgetPassword from '@modules/forgot-password/ForgotPassword';
// import RecoverPassword from '@modules/recover-password/RecoverPassword';
import { useWindowSize } from '@app/hooks/useWindowSize';
import { calculateWindowSize } from '@app/utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { setWindowSize } from '@app/store/reducers/ui';

import Dashboard from '@pages/Dashboard';
import { RequireAuth } from './contexts/Auth/RequireAuth';
import AcoesAlistados from './pages/alistados/AcoesAlistados';
import Alistados from './pages/alistados/Alistados';
import RelatoriosOficiais from './pages/relatorios/RelatoriosOficiais';
import CriarUsuario from './pages/ac/CriarUsuario';
import LogsUsuarios from './pages/ac/Logsusuarios';
import UsuariosPainel from './pages/ac/UsuariosPainel';
import EditarUsuario from './pages/ac/EditarUsuario';
import CriarRelatorio from './pages/relatorios/CriarRelatorio';
import MeusRelatorios from './pages/relatorios/MeusRelatorios';
import MeuPerfil from './pages/MeuPerfil';
import InserirOpniao from './pages/InserirOpniao';
import Destaques from './pages/destaques/Destaque';
import CriarDestaque from './pages/destaques/CriarDestaque';
import EditarDestaque from './pages/destaques/EditarDestaque';
import AvisosSite from './pages/site/AvisosSite';
import CriarAviso from './pages/site/CriarAviso';
import EditarAviso from './pages/site/EditarAvisos';
import Configuracoes from './pages/Configuracoes';
// import Blank from '@pages/Blank';
// import SubMenu from '@pages/SubMenu';
// import Profile from '@pages/profile/Profile';

// import PublicRoute from './routes/PublicRoute';
// import PrivateRoute from './routes/PrivateRoute';

const App = () => {
  const windowSize = useWindowSize();
  const screenSize = useSelector((state: any) => state.ui.screenSize);
  const dispatch = useDispatch();

  useEffect(() => {
    const size = calculateWindowSize(windowSize.width);
    if (screenSize !== size) {
      dispatch(setWindowSize(size));
    }
  }, [windowSize]);

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<RequireAuth><Main /></RequireAuth>}>
          <Route path="/" element={<Dashboard />}></Route>
        </Route>
        <Route path="/oficiais/acoes-alistados" element={<RequireAuth><Main /></RequireAuth>}>
          <Route path="/oficiais/acoes-alistados" element={<AcoesAlistados />}></Route>
        </Route>
        <Route path="/oficiais/alistados" element={<RequireAuth><Main /></RequireAuth>}>
          <Route path="/oficiais/alistados" element={<Alistados />}></Route>
        </Route>
        <Route path="/oficiais/relatorios" element={<RequireAuth><Main /></RequireAuth>}>
          <Route path="/oficiais/relatorios" element={<RelatoriosOficiais />}></Route>
        </Route>
        <Route path='/oficiais/criar-usuario' element={<RequireAuth><Main /></RequireAuth>}>
          <Route path="/oficiais/criar-usuario" element={<CriarUsuario />}></Route>
        </Route>
        <Route path="/oficiais/ac/logs" element={<RequireAuth><Main /></RequireAuth>}>
          <Route path="/oficiais/ac/logs" element={<LogsUsuarios />}></Route>
        </Route>
        <Route path="/oficiais/ac/usuarios" element={<RequireAuth><Main /></RequireAuth>}>
          <Route path="/oficiais/ac/usuarios" element={<UsuariosPainel />}></Route>
        </Route>
        <Route path="/oficiais/ac/editar-usuario" element={<RequireAuth><Main /></RequireAuth>}>
          <Route path="/oficiais/ac/editar-usuario/:user" element={<EditarUsuario />}></Route>
        </Route>
        <Route path="/pracas/criar-relatorio" element={<RequireAuth><Main /></RequireAuth>}>
          <Route path="/pracas/criar-relatorio" element={<CriarRelatorio />}></Route>
        </Route>
        <Route path="/pracas/meus-relatorios" element={<RequireAuth><Main /></RequireAuth>}>
          <Route path="/pracas/meus-relatorios" element={<MeusRelatorios />}></Route>
        </Route>
        <Route path="/pracas/meu-perfil" element={<RequireAuth><Main /></RequireAuth>}>
          <Route path="/pracas/meu-perfil" element={<MeuPerfil />}></Route>
        </Route>
        <Route path="/oficiais/inserir-opniao" element={<RequireAuth><Main /></RequireAuth>}>
          <Route path="/oficiais/inserir-opniao" element={<InserirOpniao />}></Route>
        </Route>
        <Route path="/oficiais/destaques" element={<RequireAuth><Main /></RequireAuth>}>
          <Route path="/oficiais/destaques" element={<Destaques />}></Route>
        </Route>
        <Route path="/oficiais/destaque/criar" element={<RequireAuth><Main/></RequireAuth>}>
            <Route path="/oficiais/destaque/criar" element={<CriarDestaque/>}></Route>
        </Route>
        <Route path="/oficiais/destaque/editar" element={<RequireAuth><Main/></RequireAuth>}>
          <Route path="/oficiais/destaque/editar/:nick" element={<EditarDestaque/>}></Route>
        </Route>
        <Route path="/oficiais/avisos" element={<RequireAuth><Main/></RequireAuth>}>
            <Route path="/oficiais/avisos" element={<AvisosSite/>}></Route>
        </Route>
        <Route path="/oficiais/avisos/criar" element={<RequireAuth><Main/></RequireAuth>}>
          <Route path="/oficiais/avisos/criar" element={<CriarAviso/>}></Route>
        </Route>
        <Route path="/oficiais/avisos/editar/:id" element={<RequireAuth><Main/></RequireAuth>}>
          <Route path="/oficiais/avisos/editar/:id" element={<EditarAviso/>}></Route>
        </Route>
        <Route path="/configuracoes/geral" element={<RequireAuth><Main/></RequireAuth>}>
          <Route path="/configuracoes/geral" element={<Configuracoes/>}></Route>
        </Route>
      </Routes>

    </BrowserRouter>
  );
};

export default App;
