import React, {Component} from 'react'
import profile1 from '../../assets/profile-images/Ellipse -3.png';
import profile2 from '../../assets/profile-images/Ellipse 1.png';
import profile3 from '../../assets/profile-images/Ellipse -8.png';
import profile4 from '../../assets/profile-images/Ellipse -7.png';
import './home.scss';
import logo from '../../assets/images/logo.png';
import searchIcon from '../../assets/icons/search_icon.svg';
import deleteIcon from '../../assets/icons/delete-black-18dp.svg';
import updateIcon from '../../assets/icons/create-black-18dp.svg'
import {useParams,withRouter} from 'react-router-dom';
import EmployeeService from '../../services/employee-service'
import {Link} from 'react-router-dom';

class Home extends Component{
    constructor(props) {
        super(props)

        this.state = {
                employees: [],
                allEmployees: [],
        }



        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
    }

    componentWillMount(){
        EmployeeService.getEmployees().then((res) => {
            console.log(res);
            console.log("message : "+res.message);
            console.log(res.data);
            this.setState({ employees: res.data});
            this.setState({ allEmployees: res.data});
        })
        .catch(err => console.log(err));
        console.log("all" +this.state.employees);
    }


    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then( res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        });
    }
    updateEmployee(id){
        this.props.history.push(`/add-employee/${id}`);
    }
    search = async (event) => {
        let searchName = event.target.value;
        await this.setState({employees: this.state.allEmployees});
        let employeeList = this.state.employees;
        if (searchName.trim().length > 0)
        employeeList = employeeList.filter((employee) => 
              employee.name.toLowerCase().indexOf(searchName.toLowerCase()) > -1 );
        this.setState({ employees: employeeList });
      }
    render(){
        return(
            <div>
                <header class="header-content header">
                    <div class="logo-content">
                        <img src={logo} alt=""/>
                        <div>
                            <span class="emp-text">EMPLOYEE</span><br></br>
                            <span class="emp-text emp-payroll">PAYROLL</span>
                        </div>
                    </div>
                </header> 
                <div class="main-content">
                    <div class="header-content">
                        <div class="emp-detail-text">
                            Employee Details <div class="emp-count">{this.state.employees.length}</div>
                        </div>
                        <div class="search-box">
                             <input type="text" placeholder="Search" class="search-input" onChange={this.search} />
                             <img className="search-icon" src={searchIcon} alt="Search Icon" />
                        </div>
                        <Link to="/add-employee/new" class="add-button">
                        <img src="../../assets/icons/add-24px.svg" alt=""/>+ Add User</Link>
                    </div>
                    <table id="table-display" class="table">
                        <th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>
                        {
                            this.state.employees.map(
                                (employee,id) =>(
                                <tr>
                                    <td><img class ="profile" src={
                                        employee.profilePic==="../../assets/profile-images/Ellipse -8.png"?
                                        profile3:
                                        employee.profilePic==="../../assets/profile-images/Ellipse -7.png"?
                                        profile4:
                                        employee.profilePic==="../../assets/profile-images/Ellipse -1.png"?
                                        profile2:profile1

                                    } alt="Image"/></td>
                                    <td>{employee.name}</td>
                                    <td>{employee.gender}</td>
                                    <td>{employee.departments &&
                                         employee.departments.map((department) => (
                                        <div className="dept-label">{department}</div>
                                        ))}</td>
                                    <td>{employee.salary}</td>
                                    <td>{employee.startDate}</td>
                                    <td>
                                    <img id={employee.employeeId} onClick={()=>this.deleteEmployee(employee.employeeId)} alt="delete" src={deleteIcon} />
                                        <img id={employee.employeeId} onClick={()=>this.updateEmployee(employee.employeeId)} alt="update" src={updateIcon} />

                                    </td>
                                </tr>
                                )
                            )
                        }
                    </table>
                </div>
            </div>

        )
    }
}

export default withRouter(Home)