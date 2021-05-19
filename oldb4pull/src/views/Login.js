import React, {useEffect} from 'react'
import Auth from '../Auth';
import axios from 'axios'

const Login  = ({history, location}) =>{

    useEffect(()=>{
        if(Auth.isAuth){
            history.push('/');
        }
    }, [history]);


    const login = (e) =>{
        e.preventDefault();
        // console.log(process.env)
        axios.post(process.env.REACT_APP_SERVE+'/login')
        .then(res=>{
            console.log(res.data);
            const {from} = location.state || {from: {pathname: '/'}};
            Auth.login(res.data, ()=>{
                history.push(from)
            });
        })
        .catch(er=>console.log(er))
    }

    return(
        <div className="container-fluid">
            <div className="row no-gutter">
                {/* <!-- The image half --> */}
                <div className="col-md-6 d-none d-md-flex bg-image"></div>
        
        
                {/* <!-- The content half --> */}
                <div className="col-md-6 bg-light">
                    <div className="login d-flex align-items-center py-5">
        
                        {/* <!-- Demo content--> */}
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-10 col-xl-7 mx-auto">
                                    <h3 className="display-4">Login</h3>
                                    <p className="text-muted mb-4">login split page using Bootstrap 4.</p>
                                    <form>
                                        <div className="form-group mb-3">
                                            <input id="inputEmail" type="text" placeholder="Username" required="" className="form-control rounded-pill border-0 shadow-sm px-4" />
                                        </div>
                                        <div className="form-group mb-3">
                                            <input id="inputPassword" type="password" placeholder="Password" required="" className="form-control rounded-pill border-0 shadow-sm px-4 text-primary" />
                                        </div>
                                        
                                        {/* <!-- <div className="custom-control custom-checkbox mb-3">
                                            <input id="customCheck1" type="checkbox" checked className="custom-control-input">
                                            <label for="customCheck1" className="custom-control-label">Remember password</label>
                                        </div> --> */}
                                        <button type="submit" onClick={login} className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Sign in</button>
                                        {/* <!-- <div className="text-center d-flex justify-content-between mt-4"><p>Snippet by <a href="https://bootstrapious.com/snippets" className="font-italic text-muted"> 
                                                <u>Boostrapious</u></a></p></div> --> */}
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* <!-- End --> */}
        
                    </div>
                </div>
                {/* <!-- End --> */}
        
            </div>
        </div>
    );
}

export default Login