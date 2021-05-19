import React, { useEffect, useState } from 'react';
import Auth from '../Auth';
import axios from 'axios';
const $ = window.$;

const Home = ({history}) => {
    const[dept, setDept ] = useState([])
    const[state, setState] = useState({
        Code: '',
        Name: '',
        Description: ''
    })
    const[isupdate, setIsUpdate] = useState(false);

    useEffect(()=>{
        axios.post(process.env.REACT_APP_SERVE+'/api',{
            url: 'Departments',
            method: 'GET',
        })
        .then(res=>{
            setDept(res.data.value);
        })
        .catch(er=>console.log(er));

        $("#myModal").on('hide.bs.modal', ()=>{
            setIsUpdate(false);
            setState({
                Code: '',
                Name: '',
                Description: ''
            });
        });
    },[]);

    const logout = () =>{
        Auth.logout(()=>{
            history.goBack()
        });
    }

    const create = () =>{
        axios.post(process.env.REACT_APP_SERVE+'/api',{
            url: 'Departments',
            method: 'POST',
            data: state
        })
        .then(res=>{
            setDept(res.data.value);
        })
        .catch(er=>console.log(er));
    }
    const setUpdate = (data = '') => {
        setState(data);
        setIsUpdate(true);
        $("#myModal").modal('show');
    }
    const update = (data= '') =>{
        
        axios.post(process.env.REACT_APP_SERVE+'/api',{
            url: 'Departments/'+state.Code,
            method: 'PATCH',
            data: state
        })
        .then(res=>{
            setDept(res.data.value);
        })
        .catch(er=>console.log(er));
    }

    const del = () =>{
        axios.post(process.env.REACT_APP_SERVE+'/api',{
            url: 'Departments/'+state.Code,
            method: 'DELETE',
        })
        .then(res=>{
            setDept(res.data.value);
        })
        .catch(er=>console.log(er));
    }

    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value});
    }
    return ( 
        <div>
            <div className="jumbotron text-center bg-primary text-white" >
                <h1>Customer Information</h1>
                <p><a href="#/" onClick={logout} className="text-white">click here to logout!</a></p> 
                </div>
                
                <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">
                            Open modal
                        </button>
                    </div>
                    <div className="clearfix"></div>
                    <br /><br />
                    <div className="col-sm-12">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>CODE</th>
                                    <th>NAME</th>
                                    <th>DESCRIPTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dept.map((data, key)=>(
                                    <tr key={key} onClick={()=>setUpdate(data)}> 
                                        <td>{data.Code}</td>
                                        <td>{data.Name}</td>
                                        <td>{data.Description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

<div className="modal" id="myModal">
  <div className="modal-dialog">
    <div className="modal-content">
        <form>
            <div className="modal-header">
                <h4 className="modal-title">Modal Heading</h4>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>

            <div className="modal-body">
                    
                        <div className="form-group mb-3">
                            <input onChange={handleChange} name="Code" value={state.Code} type="text" placeholder="Code" required="" className="form-control " />
                        </div>
                        <div className="form-group mb-3">
                            <input onChange={handleChange} name="Name" value={state.Name} type="text" placeholder="Name" required="" className="form-control" />
                        </div>
                        <div className="form-group mb-3">
                            <input onChange={handleChange} name="Description" value={state.Description} type="text" placeholder="Description" required="" className="form-control" />
                        </div>
                        {/* <button type="submit" onClick={create} className="btn btn-primary btn-block text-uppercase mb-2 shadow-sm">Sign in</button> */}
                        {/* <!-- <div className="text-center d-flex justify-content-between mt-4"><p>Snippet by <a href="https://bootstrapious.com/snippets" className="font-italic text-muted"> 
                                <u>Boostrapious</u></a></p></div> --> */}   
            </div>

            <div className="modal-footer">
                <button type="button" className={isupdate?"d-none":"btn btn-primary"} onClick={create} >Create</button>
                <button type="button" className={isupdate?"btn btn-warning text-white": "d-none"} onClick={update} >Update</button>
                <button type="button" className="btn btn-danger" onClick={del} >Delete</button>
            </div>
        </form>
    </div>
  </div>
</div>
        </div>
     );
}

export default Home;