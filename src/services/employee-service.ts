import Employee from "../models/employee"; // dev json.db
import EMPLOYEES from "../models/mock-employee"; // to be replaced with production backend

export default class EmployeeService {

  static employees:Employee[] = EMPLOYEES;

  static isDev = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');

  static getEmployees(): Promise<Employee[]> {
    if(this.isDev) {
      return fetch('http://localhost:3001/employees')
      .then(response => response.json())
      .catch(error => this.handleError(error));
    }

    return new Promise(resolve => {
      resolve(this.employees);
    });
  }

  static getEmployee(id: number): Promise<Employee|null> {
    if(this.isDev) {
      return fetch(`http://localhost:3001/employees/${id}`)
      .then(response => response.json())
      .then(data => this.isEmpty(data) ? null : data)
      .catch(error => this.handleError(error));
    }

    return new Promise(resolve => {    
      resolve(this.employees.find(employee => id === employee.id)!);
    }); 
  }

  static updateEmployee(employee: Employee): Promise<Employee> {
    if(this.isDev) {
      return fetch(`http://localhost:3001/employees/${employee.id}`, {
        method: 'PUT',
        body: JSON.stringify(employee),
        headers: { 'Content-Type': 'application/json'}
      })
      .then(response => response.json())
      .catch(error => this.handleError(error));
    }

    return new Promise(resolve => {
      const { id } = employee;
      const index = this.employees.findIndex(employee => employee.id === id);
      this.employees[index] = employee;
      resolve(employee);
    }); 
  }

  static deleteEmployee(employee: Employee): Promise<{}> {
    if(this.isDev) {
      return fetch(`http://localhost:3001/employees/${employee.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'}
      })
      .then(response => response.json())
      .catch(error => this.handleError(error));
    }

    return new Promise(resolve => {    
      const { id } = employee;
      this.employees = this.employees.filter(employee => employee.id !== id);
      resolve({});
    }); 
  }

  static addEmployee(employee: Employee): Promise<Employee> {
    delete employee.created;

    if(this.isDev) {
      return fetch(`http://localhost:3001/employees`, {
        method: 'POST',
        body: JSON.stringify(employee),
        headers: { 'Content-Type': 'application/json'}
      })
      .then(response => response.json())
      .catch(error => this.handleError(error));
    }

    return new Promise(resolve => {    
      this.employees.push(employee);
      resolve(employee);
    }); 
  }

  static searchEmployee(term: string): Promise<Employee[]> {
    if(this.isDev) {
      return fetch(`http://localhost:3001/employees?q=${term}`)
      .then(response => response.json())
      .catch(error => this.handleError(error));
    }

    return new Promise(resolve => {    
      const results = this.employees.filter(employee => employee.name.includes(term));
      resolve(results);
    });

  }

  static isEmpty(data: Object): boolean {
    return Object.keys(data).length === 0;
  }

  static handleError(error: Error): void {
    console.error(error);
  }
}