import {DateTime} from 'luxon';
import {version} from '../../../../package.json';

const Footer = () => {


  return (
    <footer className="main-footer">
      <strong>
        <span>Copyright © {DateTime.now().toFormat('y')} Matthaios e Paterneck, utilizando o template de </span>
        <a href="https://erdkse.com" target="_blank" rel="noopener noreferrer">
          erdkse.com
        </a>
        <span>.</span>
      </strong>
      <div className="float-right d-none d-sm-inline-block">
        <b>Versão</b>
        <span>&nbsp;{version}</span>
      </div>
    </footer>
  );
};

export default Footer;
