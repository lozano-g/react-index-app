import React, { FunctionComponent, useState } from 'react';
import EmployeeForm from '../components/employee-form';
import Employee from '../models/employee';

const EmployeeAdd: FunctionComponent = () => {
    const [id] = useState<number>(new Date().getTime());
    const [employee] = useState<Employee>(new Employee(id));

    return(
        <div className="row">
            <h2 className="header center">Ajouter un employé</h2>
            <EmployeeForm employee={employee} isEditForm={false}></EmployeeForm>
        </div>

    );
}

export default EmployeeAdd;