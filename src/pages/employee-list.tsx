import React, { FunctionComponent, useState, useEffect } from 'react';
import Employee from '../models/employee';
import EmployeeCard from '../components/employee-card';
import EmployeeService from '../services/employee-service';
import { Link } from 'react-router-dom';
import EmployeeSearch from '../components/employee-search';
  
const EmployeeList: FunctionComponent = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  
  useEffect(() => {
    EmployeeService.getEmployees().then(employees => setEmployees(employees));

  }, []);
  
  return (
    <div>
      <h1 className="center">Employee Index</h1>
      <div className="container"> 
        <div className="row">
          <EmployeeSearch />
        {employees.map(employee => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
        </div>
        <Link className="btn-floating btn-large waves-effect waves-light red z-depth-3"
        style={{ position: 'fixed', bottom: '25px', right: '25px' }}
        to="/employee/add">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div> 
  );
}
  
export default EmployeeList;