import { useContext, useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';
import { Dropdown } from '@components';
import styled from 'styled-components';
import { AuthContext } from '@app/contexts/Auth/AuthContext';
import { useApi } from '@app/hooks/useApi';

const StyledUserImage = styled.img`
  height: 1.6rem !important;
  width: 1.6rem !important;
  margin-right: 0 !important;
  margin-left: -8px !important;
`;

const UserDropdown = () => {
  const navigate = useNavigate();
  const [t] = useTranslation();
  const [dataRegistro, setDataRegistro] = useState('')
  const [patNome, setPatNome] = useState({ comEstrela: '', semEstrela: '' })
  const api = useApi()

  useEffect(() => {
    const getAtributes = async () => {
      const res = await api.getRegistro(logged.user?.nickname)

      setDataRegistro(res.data.registro)

      const pat = await api.getPatNome(logged.user?.pat_id)

      setPatNome({ comEstrela: pat.data.pat_nome_com, semEstrela: pat.data.pat_nome_sem })
    }


    getAtributes()

  }, [])



  const logged = useContext(AuthContext)

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const logOut = async (event: any) => {
    event.preventDefault();
    setDropdownOpen(false);
    await logged.signout()
    navigate('/login');
  };

  const navigateToProfile = (event: any) => {
    event.preventDefault();
    setDropdownOpen(false);
    navigate('/pracas/meu-perfil');
  };

  return (
    <Dropdown
      isOpen={dropdownOpen}
      onChange={(open: boolean) => setDropdownOpen(open)}
      className="user-menu"
      menuContainerTag="ul"
      buttonTemplate={
        <StyledUserImage
          src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${logged.user?.nickname}&direction=2&head_direction=3&size=l&headonly=1`}
          className="user-image img-circle elevation-2"
          alt="User"
        />
      }
      menuTemplate={
        <>
          <li className="user-header bg-secondary">
            <img
              src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${logged.user?.nickname}&direction=2&head_direction=3&size=l&headonly=1`}
              className="img-circle elevation-2"
              alt="User"
            />
            <p>
              {logged.user?.nickname}
              <small>
                <span>Alistado desde </span>
                <span>
                  {DateTime.fromISO(dataRegistro).toFormat('dd LLL yyyy')}
                </span>
              </small>
            </p>
          </li>
          <li className="user-body">
            <div className="row justify-content-between align-items-center">
              <div className="col-12 col-md-3 col-sm-3 col-lg-3">
                <img
                  src={`/img/${patNome.semEstrela}.png`}
                  alt="User"
                  style={{ width: '60px', height: '30px' }}
                />
              </div>
              <div className="col-12 col-md-6 col-sm-6 col-lg-6 d-flex justify-content-center">
                {patNome.comEstrela}
              </div>
            </div>
          </li>
          <li className="user-footer">
            <button
              type="button"
              className="btn btn-default btn-flat"
              onClick={navigateToProfile}
            >
              Meu Perfil
            </button>
            <button
              type="button"
              className="btn btn-default btn-flat float-right"
              onClick={logOut}
            >
              Sair
            </button>
          </li>
        </>
      }
    />
  );
};

export default UserDropdown;
