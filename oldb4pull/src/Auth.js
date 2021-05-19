class Auth{
    constructor(){
        this.isAuth = false;
        this.user = '';
        if(localStorage.getItem('user')){
            this.isAuth = true; 
            this.user = JSON.parse(localStorage.getItem('user'));
            
        }
        
    }

    login(obj ={}, cb){
        localStorage.setItem('user', JSON.stringify(obj.user))
        this.isAuth =  true;
        return cb();
    }

    logout(cb = null){
        localStorage.clear()
        this.isAuth = false;
        return cb();
    }
}
export default new Auth();