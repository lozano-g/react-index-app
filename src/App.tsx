import React, { FunctionComponent } from 'react';
import EmployeeList from './pages/employee-list';
import EmployeeDetail from './pages/employee-detail';
import EmployeeEdit from './pages/employee-edit';
import EmployeeAdd from './pages/employee-add';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PageNotFound from './pages/page-not-found';
import Login from './pages/login';
import PrivateRoute from './PrivateRoute';

const App: FunctionComponent = () => {
    return (
        <Router>
            <div>
                {/* navbar */}
                <nav>
                    <div className="nav-wrapper teal">
                        <Link to="/" className="brand-logo center">Profile Index</Link>
                    </div>
                </nav>
                {/* router */}
                <Switch>
                    <PrivateRoute exact path="/" component={EmployeeList} />
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute exact path="/employees" component={EmployeeList} />
                    <PrivateRoute exact path="/employee/add" component={EmployeeAdd} />
                    <PrivateRoute path="/employees/:id" component={EmployeeDetail} />
                    <PrivateRoute path="/employee/edit/:id" component={EmployeeEdit} />
                    <Route component={PageNotFound} />
                </Switch>
            </div>
        </Router>
    )
}

export default App;