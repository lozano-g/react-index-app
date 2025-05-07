import React, { FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';
import Employee from '../models/employee';
import EmployeeService from '../services/employee-service';
 
const EmployeeSearch: FunctionComponent = () => {
  
  const [term, setTerm] = useState<string>('');
  const [employees, setEmployees] = useState<Employee[]>([]);
 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value;
    setTerm(term);

    if(term.length <= 1) {
      setEmployees([]);
      return;
    }
    
    EmployeeService.searchEmployee(term).then(employees => setEmployees(employees));
    }
  
  return (
    <div className="row"> 
    <div className="col s12 m6 offset-m3"> 
      <div className="card"> 
      <div className="card-content"> 
        <div className="input-field"> 
        <input type="text" placeholder="Rechercher un employé" value={term} onChange={e => handleInputChange(e)} /> 
        </div> 
        <div className='collection'>
        {employees.map((employee) => (
          <Link key={employee.id} to={`/employees/${employee.id}`} className="collection-item">
            {employee.name}
          </Link>
        ))}
        </div> 
      </div> 
      </div> 
    </div> 
    </div>
  );
}
  
export default EmployeeSearch;