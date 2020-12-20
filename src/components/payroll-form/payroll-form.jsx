import React, {Component} from 'react'
import profile1 from '../../assets/profile-images/Ellipse -3.png';
import profile2 from '../../assets/profile-images/Ellipse 1.png';
import profile3 from '../../assets/profile-images/Ellipse -8.png';
import profile4 from '../../assets/profile-images/Ellipse -7.png';
import './payroll-form.scss';
import logo from '../../assets/images/logo.png';
import {useParams,Link,withRouter} from 'react-router-dom';
import EmployeeService from '../../services/employee-service'

class PayrollForm extends Component{
    constructor(props){
        super(props)

        this.state={
            name: '',
            salary: '',
            note: '',
            day: '01',
            month: 'Jan',
            year: '2020',
            gender: '',
            profilePic: '',
            departments: []
        }
        this.changeNameHandler=this.changeNameHandler.bind(this);
        this.changeSalaryHandler=this.changeSalaryHandler.bind(this);
        this.changeNoteHandler=this.changeNoteHandler.bind(this);
        this.changeGenderHandler=this.changeGenderHandler.bind(this);
        this.changeDayHandler=this.changeDayHandler.bind(this);
        this.changeMonthHandler=this.changeMonthHandler.bind(this);
        this.changeYearHandler=this.changeYearHandler.bind(this);
        this.changeProfilePicHandler=this. changeProfilePicHandler.bind(this);
    }
    saveOrUpdateEmployee = (event) => {
        event.preventDefault();
       // console.log(this.state.departments);
        let employee = {
            name: this.state.name,
            departments : this.state.departments,
            gender: this.state.gender,
            salary: this.state.salary,
            startDate: `${this.state.year}-${this.state.month}-${this.state.day}`,
            note: this.state.note,
            profilePic: this.state.profilePic,
          };
        console.log('employee => ' + JSON.stringify(employee));
        EmployeeService.createEmployee(employee);
    }
    getChecked =(name) =>{
        return this.state.departments.includes(name);
    }
    onCheckChange =(event) =>{

        const target = event.target;
        var value= target.value;
        if(target.checked){
            this.state.departments.push(value);
        }
        else{
            this.state.departments.slice(value,1);
        }
    }
    changeNameHandler =(event)=>{
        this.setState({name:event.target.value});
        //console.log("name is "+this.state.name);
    }
    changeSalaryHandler =(event)=>{
        this.setState({salary:event.target.value});
        //console.log("salary chosen is"+this.state.salary);
    }
    changeNoteHandler =(event)=>{
        this.setState({note: event.target.value});
        //console.log("note entered is "+this.state.note);
    }
    changeGenderHandler =(event)=>{

        this.setState({gender: event.target.value});
        //console.log("gender is" + this.state.gender);
    }
    changeProfilePicHandler =(event)=>{
        this.setState({profilePic: event.target.value});
       // console.log("profilepic is "+this.state.profilePic);
    }
    changeDayHandler=(event)=>{
        this.setState({day:event.target.value});
       // console.log("day entered is"+this.state.day);
    }
    changeMonthHandler=(event)=>{
        this.setState({month:event.target.value});
        //console.log("month entered is"+this.state.month);
    }
    changeYearHandler=(event)=>{
        this.setState({year:event.target.value});
        //console.log("year entered is "+this.state.year);
    }
    cancel(){
        // this.props.history.push('/employees');
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
                <div class="form-content">
                    <form class="form" action="#">
                        <div class="form-head">
                            Employee Payroll Form
                        </div>
                        <div class="row-content">
                            <label class="label text" for="name">Name</label>
                            <input class="input" value={this.state.name} onChange={this.changeNameHandler} type="text" id="name" name="name" placeholder="Enter Your name" required></input>
                            <error-output class="text-error" for="text"></error-output>
                        </div>
                        <div class="row-content">
                            <label class="label text" for="profile">Profile image</label>
                            <div class="profile-radio-content">
                                <label>
                                    <input type="radio" id="profile1" name="profile"
                                        value="../../assets/profile-images/Ellipse -3.png" onChange={this.changeProfilePicHandler} required/>
                                    <img class="profile" id='image1' src={profile1}/>  
                                </label>
                                <label>
                                    <input type="radio" id="profile2" name="profile"
                                        value="../../assets/profile-images/Ellipse -1.png" onChange={this.changeProfilePicHandler} required/>
                                    <img class="profile" id='image2' src={profile2}/>  
                                </label>
                                <label>
                                    <input type="radio" id="profile3" name="profile"
                                        value="../../assets/profile-images/Ellipse -8.png" onChange={this.changeProfilePicHandler}  required/>
                                    <img class="profile" id='image3' src={profile3}/>  
                                </label>
                                <label>
                                    <input type="radio" id="profile4" name="profile"
                                        value="../../assets/profile-images/Ellipse -7.png" onChange={this.changeProfilePicHandler}  required/>
                                    <img class="profile" id='image4' src={profile4}/>  
                                </label>
                            </div>
                        </div>
                        <div class="row-content">
                            <label class="label text" for="gender">Gender</label>
                            <div>
                                <input type="radio" id="male" name="gender" value="male" checked={this.state.gender === 'male'} onChange={this.changeGenderHandler}/>
                                <label class="text" for="male">Male</label>
                                <input type="radio" id="female" name="gender" value="female" checked={this.state.gender === 'female'} onChange={this.changeGenderHandler}/>
                                <label class="text" for="female">Female</label>
                            </div>
                        </div>
                        <div class="row-content">
                            <label class="label text" for="department">Department</label>
                            <div>
                                <input class="checkbox" type="checkbox" id="hr" name="department" value="HR" onChange={this.onCheckChange}/>
                                <label class="text" for="hr">HR</label>
                                <input class="checkbox" type="checkbox" id="sales" name="department" value="Sales" onChange={this.onCheckChange}/>
                                <label class="text" for="sales">Sales</label>
                                <input class="checkbox" type="checkbox" id="finance" name="department" value="finance" onChange={this.onCheckChange} />
                                <label class="text" for="finance">Finance</label>
                                <input class="checkbox" type="checkbox" id="engineer" name="department" value="Engineer" onChange={this.onCheckChange}/>
                                <label class="text" for="engineer">Engineer</label>
                                <input class="checkbox" type="checkbox" id="others" name="department" value="Others" onChange={this.onCheckChange}/>
                                <label class="text" for="others">Others</label>
                            </div>
                        </div>
                        <div class="row-content">
                            <label class="label text" for="salary">Choose your salary: </label>
                            <input class="input" type="range" name="salary" id="salary" min="300000"
                                    max="500000" step="100" value={this.state.salary} onChange={this.changeSalaryHandler} />
                            <output class="salary-output text" for="salary">{this.state.salary}</output>
                        </div>
                        <div class="row-content">
                        <label class="label text" for="startDate">Start Date</label>
                        <div>
                            <select id="day" name="day" onChange={this.changeDayHandler}> 
                                <option value="01">01</option>
                                <option value="02">02</option>
                                <option value="03">03</option>
                                <option value="04">04</option>
                                <option value="05">05</option>
                                <option value="06">06</option>
                                <option value="07">07</option>
                                <option value="08">08</option>
                                <option value="09">09</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </select>
                            <select id="month" name="Month" onChange={this.changeMonthHandler}>
                                <option value="01">January</option>
                                <option value="02">Febuary</option>
                                <option value="03">March</option>
                                <option value="04">April</option>
                                <option value="05">May</option>
                                <option value="06">June</option>
                                <option value="07">July</option>
                                <option value="08">August</option>
                                <option value="09">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                            <select id="year" name="Year" onChange={this.changeYearHandler}>
                                <option value="2020">2020</option>
                                <option value="2019">2019</option>
                                <option value="2018">2018</option>
                                <option value="2017">2017</option>
                                <option value="2016">2016</option>
                            </select>
                        </div>
                    </div>
                    <div class="row-content">
                        <label class="label text" for="note">Notes</label>
                        <textarea id="note" onChange={this.changeNoteHandler} class="input" name="Note" placeholder="" style={{ height: '100%' }}></textarea>
                    </div>
                    <div class="buttonParent">
                        <a href="./employee_payroll_home.html" class="resetButton button cancelButton">Cancel</a>
                        <div class="submit-reset">
                            <button type="submit" class="button submitButton" id="submitButton" onClick={this.saveOrUpdateEmployee}>Submit</button>
                            <button type="reset" class="resetButton button">Reset</button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default PayrollForm