class GlobalUserInfo{
    constructor(){
        this.isLogin = false
        this.uname = ''
        this.address = ''
        this.college = ''
        this.email = ''
        this.gender =''
        this.id=''
        this.major = ''
        this.phone = ''
    }
    setData(uname){
        this.isLogin = true
        this.uname = uname
    }
    setfullData(data){
        this.address = data.address
        this.college = data.college
        this.email = data.email
        this.gender = data.gender
        this.id= data.id
        this.major = data.major
        this.phone = data.phone
    }
    logOut(){
        this.isLogin=false
    }
}

export let ex = new GlobalUserInfo()
