import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import Employee from '../models/employee';
import formatDate from '../helpers/format-date';
import formatType from '../helpers/format-type';
import Loader from '../components/loader';
import userImage from '../assets/user.png';
  
type Params = { id: string };
  
const EmployeesDetail: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {
    
  const [employee, setEmployee] = useState<Employee|null>(null);
  
  useEffect(() => {
    fetch(`http://localhost:3001/employees/${match.params.id}`)
    .then(response => response.json())
    .then((employee) => {
      if (employee.id) setEmployee(employee);
    })
  }, [match.params.id]);
    
  return (
    <div>
      { employee ? (
        <div className="row">
          <div className="col s12 m8 offset-m2"> 
            <h2 className="header center">{ employee.name }</h2>
            <div className="card hoverable"> 
              <div className="card-image">
                <img src={userImage} alt={employee.name} style={{width: '250px', margin: '0 auto'}} />
                <Link to={`/employee/edit/${employee.id}`} className="btn btn-floating halfway-fab waves-effect waves-effect waves-light">
                  <i className="material-icons">edit</i>
                </Link>
              </div>
              <div className="card-stacked">
                <div className="card-content">
                  <table className="bordered striped">
                    <tbody>
                      <tr> 
                        <td>Nom</td> 
                        <td><strong>{ employee.name }</strong></td> 
                      </tr>
                      <tr> 
                        <td>Types</td> 
                        <td>
                          {employee.types.map(type => (
                           <span key={type} className={formatType(type)}>{type}</span>
                          ))}</td> 
                      </tr> 
                      <tr> 
                        <td>Date de création</td> 
                        <td>{formatDate(employee.created)}</td> 
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="card-action">
                  <Link to="/">Retour</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h4 className="center"><Loader /></h4>
      )}
    </div>
  );
}
  
export default EmployeesDetail;