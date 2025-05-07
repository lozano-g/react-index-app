import React, { FunctionComponent, useState } from 'react';
import Employee from '../models/employee';
import formatType from '../helpers/format-type';
import { useHistory } from 'react-router-dom';
import EmployeeService from '../services/employee-service';
  
type Props = {
  employee: Employee,
  isEditForm: boolean
};
  
type Field = {
  value?: any,
  error?: string,
  isValid?: boolean
}

type Form = {
  picture: Field,
  name: Field,
  types: Field
}

const EmployeeForm: FunctionComponent<Props> = ({employee, isEditForm}) => {
  
  const [form, setForm] = useState<Form>({
    picture: { value: employee.picture },
    name: { value: employee.name, isValid: true },
    types: { value: employee.types, isValid: true },
  });

  const history = useHistory();

  const types: string[] = [
    'HTML', 'CSS', 'PHP', 'Java', 'Javascript', 'UNIX',
    'C', 'C++', '.NET', 'SQL', 'ASM'
  ];

  const hasType = (type: string): boolean => {
    return form.types.value.includes(type);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField: Field = {[fieldName]: {value: fieldValue}};

    setForm({...form, ...newField});
  }

  const selectType = (type: string, e: React.ChangeEvent<HTMLInputElement>): void => {
    const checked = e.target.checked;
    let newField: Field;

    if(checked) {
      // Si l'utilisateur coche un type, à l'ajoute à la liste des types.
      const newTypes: string[] = form.types.value.concat([type]);
      newField = { value: newTypes };
    } else {
      // Si l'utilisateur décoche un type, on le retire de la liste des types.
      const newTypes: string[] = form.types.value.filter((currentType: string) => currentType !== type);
      newField = { value: newTypes };
    }

    setForm({...form, ...{ types: newField }});
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormValid = validateForm();

    if (isFormValid) {
      employee.picture = form.picture.value;
      employee.name = form.name.value;
      employee.types = form.types.value;

      isEditForm ? updateEmployee() : addEmployee();
    }
  }

  const isAddForm = () => {
    return !isEditForm;
  }

  const validateForm = () => {
    let newForm: Form = form;

    // Validation url
    if (isAddForm()) {
      const start = "https://";
      const end = ".png";

      if (!form.picture.value.startsWith(start) || !form.picture.value.endsWith(end)) {
        const errorMsg: string = "L'url de l'image doit commencer par " + start + " et finir par " + end;
        const newField: Field = { value: form.picture.value, error: errorMsg, isValid: false };
        newForm = { ...newForm, ...{ picture: newField } };
      } else {
        const newField: Field = { value: form.picture.value, error: '', isValid: true };
        newForm = { ...newForm, ...{ picture: newField } };
      } 
    }

    // Validator name
    if(!/^[a-zA-Zàéè ]{3,25}$/.test(form.name.value)) {
      const errorMsg: string = 'Le nom est requis (1-25).';
      const newField: Field = { value: form.name.value, error: errorMsg, isValid: false };
      newForm = { ...newForm, ...{ name: newField } };
    } else {
      const newField: Field = { value: form.name.value, error: '', isValid: true };
      newForm = { ...newForm, ...{ name: newField } };
    }

    setForm(newForm);
    return newForm.name.isValid;
  }

  const isTypesValid = (type: string): boolean => {
    if (form.types.value.length === 1 && hasType(type)) {
      return false;
    }

    if (form.types.value.length >= 7 && !hasType(type)) {
      return false;
    }

    return true;
  }
  
  const deleteEmployee = () => {
    EmployeeService.deleteEmployee(employee).then(() => history.push('/employees'));
  }

  const addEmployee = () => {
    EmployeeService.addEmployee(employee).then(() => history.push('/employees'));
  }

  const updateEmployee = () => {
    EmployeeService.updateEmployee(employee).then(() => history.push(`/employees/${employee.id}`));
  }
  return (
    <form onSubmit={e => handleSubmit(e)}>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable">
            {isEditForm && (
            <div className="card-image">
              <img src={employee.picture} alt={employee.name} style={{width: '250px', margin: '0 auto'}}/>
              <span className="btn-floating halfway-fab waves-effect waves-light">
                <i onClick={deleteEmployee} className="material-icons">delete</i>
              </span>
            </div>
            )}
            <div className="card-stacked">
              <div className="card-content">
                {/* Employee picture */}
                {isAddForm() &&(
                  <div className="form-group">
                    <label htmlFor="name">Image</label>
                    <input id="picture" name="picture" type="text" className="form-control" value={form.picture.value} onChange={e => handleInputChange(e)}></input>
                  </div>
                )}
                {/* Employee name */}
                <div className="form-group">
                  <label htmlFor="name">Nom</label>
                  <input id="name" name="name" type="text" className="form-control" value={form.name.value} onChange={e => handleInputChange(e)}></input>
                  {form.name.error &&
                  <div className="card-panel red accent-1">
                    {form.name.error}  
                  </div>
                  }
                </div>
                {/* Employee types */}
                <div className="form-group">
                  <label>Types</label>
                  {types.map(type => (
                    <div key={type} style={{marginBottom: '10px'}}>
                      <label>
                        <input id={type} type="checkbox" className="filled-in" value={type} disabled={!isTypesValid(type)} checked={hasType(type)} onChange={e => selectType(type, e)}></input>
                        <span>
                          <p className={formatType(type)}>{ type }</p>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-action center">
                {/* Submit button */}
                <button type="submit" className="btn">Valider</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
   
export default EmployeeForm;