class GlobalUserInfo{
    constructor(){
        this.isLogin = false
        this.uname = ''
    }
    setData(uname){
        this.isLogin = true
        this.uname = uname
    }
}

export let ex = new GlobalUserInfo()
