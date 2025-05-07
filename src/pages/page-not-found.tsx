import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/404.png';
  
const PageNotFound: FunctionComponent = () => {
  
  return (
    <div className="center">
      <br />
      <img src={logo} alt="Page non trouvée"/>
      <h1>Hey, cette page n'existe pas !</h1> 
      <Link to="/" className="waves-effect waves-teal btn-flat">
        Retourner à l'acceuil
      </Link>
    </div>
  );
}
  
export default PageNotFound;