import React, {useContext, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useFormik} from 'formik';
import {Button} from '@components';
import {faLock, faUser} from '@fortawesome/free-solid-svg-icons';
import {setWindowClass} from '@app/utils/helpers';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import * as Yup from 'yup';

import {Form, InputGroup} from 'react-bootstrap';
import * as AuthService from '../../services/auth';
import { AuthContext } from '@app/contexts/Auth/AuthContext';

const Login = () => {
  const [isAuthLoading, setAuthLoading] = useState(false);
  const auth = useContext(AuthContext)


  const navigate = useNavigate();


  const login = async (nick: string, password: string) => {
   

    try {
      setAuthLoading(true);
      const isLogged = await auth.signin(nick, password)
      if(isLogged){
      
        setAuthLoading(false);
       
        navigate('/');
      }else{
        setAuthLoading(false);
   
      }
      // dispatch(loginUser(token));
  
    } catch (error: any) {
      setAuthLoading(false);
      toast.error(error.message || 'Failed');
    }
  };
 

  const {handleChange, values, handleSubmit, touched, errors} = useFormik({
    initialValues: {
      nick: '',
      password: ''
    },
    validationSchema: Yup.object({
      nick: Yup.string().required('Required'),
      password: Yup.string()
        .min(5, 'A senha precisa ter mais de 5 caracteres')
        .max(30, 'Must be 30 characters or less')
        .required('Required')
    }),
    onSubmit: async (values) => {
      login(values.nick, values.password);      
    }
  });

  setWindowClass('hold-transition login-page');

  return (
    <div className="login-box">
      <div className="card card-outline card-primary">
        <div className="card-header text-center">
          <Link to="/" className="h1">
            <b>FMB&nbsp;</b>
            <span>Controle</span>
          </Link>
        </div>
        <div className="card-body">
          <p className="login-box-msg">Entre para acessar ao conteúdo</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="email"
                  name="nick"
                  type="text"
                  placeholder="Nick"
                  onChange={handleChange}
                  value={values.nick}
                  isValid={touched.nick && !errors.nick}
                  isInvalid={touched.nick && !!errors.nick}
                />
                {touched.nick && errors.nick ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.nick}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faUser} />
                    </InputGroup.Text>
                  </InputGroup.Append>
                )}
              </InputGroup>
            </div>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Senha"
                  onChange={handleChange}
                  value={values.password}
                  isValid={touched.password && !errors.password}
                  isInvalid={touched.password && !!errors.password}
                />
                {touched.password && errors.password ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faLock} />
                    </InputGroup.Text>
                  </InputGroup.Append>
                )}
              </InputGroup>
            </div>

            <div className="row">              
              <div className="col-12">
                <Button
                  block
                  type="submit"
                  isLoading={isAuthLoading}
                >
                  {/* @ts-ignore */}
                  Entrar
                </Button>
              </div>
            </div>
          </form>
          <p className="mb-1">
            <Link to="/forgot-password">Não possuo cadastro</Link>
          </p>          
        </div>
      </div>
    </div>
  );
};

export default Login;
