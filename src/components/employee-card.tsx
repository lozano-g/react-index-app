import React, { FunctionComponent, useState } from 'react';
import Employee from '../models/employee';
import './employee-card.css';
import formatDate from '../helpers/format-date';
import formatType from '../helpers/format-type';
import { useHistory } from 'react-router-dom';
import placeHolderImage from '../assets/placeHolder.png';

type Props = {
    employee: Employee,
    borderColor?: string
};

const EmployeeCard : FunctionComponent<Props> = ({employee, borderColor = '#009688'}) => {
    
    const [color, setColor] = useState<string>();
    const history = useHistory();

    const showBorder = () => {
        setColor(borderColor);
    }

    const hideBorder = () => {
        setColor('#f5f5f5');
    }

    const goToEmployee = (id: number) => {
        history.push(`/employees/${id}`);
    }
    
    return (
        <div key={employee.id} className='col s6 m4' onClick={() => goToEmployee(employee.id)} onMouseEnter={showBorder} onMouseLeave={hideBorder}>
            <div className='card horizontal custom-card-border' style={{ borderColor: color }}>
                <div className='card-image'>
                    <img src={placeHolderImage} alt={employee.name} />
                </div>
                <div className='card-stacked'>
                    <div className='card-content'>
                        <p>{employee.name}</p>
                        <ul>
                            
                            <li><strong>Date de création</strong> : {formatDate(employee.created)}</li>
                            {employee.types.map(type => (
                                <span key={type} className={formatType(type)}>{type}</span>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeCard;