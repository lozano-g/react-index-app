import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import EmployeeForm from '../components/employee-form';
import Employee from '../models/employee';
import EmployeeService from '../services/employee-service';
import Loader from '../components/loader';

type Params = { id: string };
  
const EmployeeEdit: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {
    
  const [employee, setEmployee] = useState<Employee|null>(null);
  
  useEffect(() => {
    EmployeeService.getEmployee(+match.params.id).then(employee => setEmployee(employee));
  }, [match.params.id]);
    
  return (
    <div>
      { employee ? (
        <div className="row">
            <h2 className="header center">Éditer { employee.name }</h2>
            <EmployeeForm employee={employee} isEditForm={true}></EmployeeForm>
        </div>
      ) : (
        <h4 className="center"><Loader /></h4>
      )}
    </div>
  );
}
  
export default EmployeeEdit;