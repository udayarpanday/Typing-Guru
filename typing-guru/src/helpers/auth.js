import cookie from 'js-cookie';

//Set in Cookie
export const setCookie=(key,value)=>{
    if(window!=='undefined'){
        cookie.set(key,value,{
            expires:7   //In days
        })
    }
}

//Remove from cookie
export const removeCookie=key=>{
    if(window!=='undefined'){
        cookie.set(key,{
            expires:7   //In days
        })
    }
}

//Get from cookie like token
export const getCookie=key=>{
    if(window!=='undefined'){
        return cookie.get(key)
    }
}

export const setLocalStorage=(key,value)=>{
    if(window!=='undefined'){
        localStorage.setItem(key,JSON.stringify(value))
    }
}

//Remove from localstorage
export const removeLocalStorage=key=>{
    if(window!=='undefined'){
        localStorage.removeItem(key)
    }
}

//Auth user after login
export const authenticate=(response,next)=>{
    setCookie('token',response.data.token)
    setLocalStorage('user',response.data.user)
    next();
}

//Signout
export const signout=next=>{
    removeCookie('token')
    removeLocalStorage('user')
    next();
}

//Get user info form localstorage
export const isAuth=()=>{
    if(window!=='undefined'){
        const cookieChecked=getCookie('token')
        if(cookieChecked){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'))
            }else{
                return false
            }
        }
    }
}

//update user data in localstorage
export const updateUser=(response,next)=>{
    if(window!=='undefined'){
        let auth=JSON.parse(localStorage.getItem('user'))
        auth=response.data
        localStorage.setItem('user',JSON.stringify(auth))
    }
    next()
}