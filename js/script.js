const signInBtn = document.getElementById('signInBtn')
const signUpBtn = document.getElementById('signUpBtn')
const nameInpUp = document.getElementById('nameInpUp')
const emailInpUp = document.getElementById('emailInpUp')
const passInpUp = document.getElementById('passInpUp')
const alertName = document.querySelector('.alertName')
const alertMail = document.querySelector('.alertMail')
const alertPass = document.querySelector('.alertPass')
const emailExist = document.getElementById('emailExist')
const registration = document.getElementById('register')
const emailLogin = document.getElementById('emailLogin')
const passLogin = document.getElementById('passLogin')
const loginBtn = document.getElementById('login')
const alertText = document.getElementById('alertText')
const welcome = document.getElementById('welcome')
const logoutBtn = document.getElementById('logout')


if(signUpBtn){
    signUpBtn.addEventListener('click', function(){
      location.href='signup.html'
    })
}

if(signInBtn){
    signInBtn.addEventListener('click',function(){
        location.href='index.html'
    })
}

if(registration){
    registration.addEventListener('click', getUserData)
}

if(nameInpUp){
    nameInpUp.addEventListener('keyup',validationName)
}

if(emailInpUp){
    emailInpUp.addEventListener('keyup',validationEmail)
}

if(passInpUp){
    passInpUp.addEventListener('keyup',validationPass)
}

if(loginBtn){
    loginBtn.addEventListener('click',login)
}

if(logoutBtn){
    logoutBtn.addEventListener('click', function(){
        localStorage.removeItem('userName')
        location.href='index.html'
    })
}



let usersInfo = []
if(localStorage.getItem('users') != null){
    usersInfo = JSON.parse(localStorage.getItem('users'))
}



function getUserData(){
    if(validationName() && validationEmail() && validationPass() && isExist() == false){
        let user = {
            name: nameInpUp.value, 
            mail: emailInpUp.value, 
            password: passInpUp.value
        }
        usersInfo.push(user)
        localStorage.setItem('users',JSON.stringify(usersInfo))
        clear()
        Swal.fire({
            title: "Done!",
            icon: "success"
          });   
    }
    else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
          });
          
    }
   
}



function clear(){
    nameInpUp.value = '' ; 
    emailInpUp.value = ''; 
    passInpUp.value = '';
}


function validationName(){
    let regex = /^[A-Za-z]{3,}$/
    if (regex.test(nameInpUp.value)){
        alertName.innerHTML = ''
        return true
    }
    else{
        alertName.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> name must be at least 3 characters'
        return false 
    }
}


function validationEmail(){
    let regex = /^[A-Za-z\._\-0-9]*[@][a-z]*[\.][a-z]{3}$/;
    if (regex.test(emailInpUp.value)){
        alertMail.innerHTML = ''
        return true
    }
    else{
        alertMail.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Enter a valid email'
        return false 
    }
}

function validationPass(){
    if(passInpUp.value.length >= 4){
        alertPass.innerHTML = ''
        return true
    }
    else{
        alertPass.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> minimum 4 characters'
        return false 
    }
}

function isExist(){
    for(let i = 0; i < usersInfo.length; i++){
        if(usersInfo[i].mail == emailInpUp.value){
            emailExist.innerHTML='Email is already taken'
            return true 
        }
    }
    emailExist.innerHTML = ''
    return false 
}



function login(){
    if(emailLogin.value === '' || passLogin.value === ''){
        alertText.innerHTML = 'All inputs are required'
    }
    else{
        alertText.innerHTML = 'Incorrect email or password'
        for(let i = 0; i < usersInfo.length; i++){
            if(emailLogin.value === usersInfo[i].mail && passLogin.value === usersInfo[i].password){
                alertText.innerHTML=''
                localStorage.setItem('userName',usersInfo[i].name)
                location.href='welcome.html'
                break
            }
            else{
                alertText.innerHTML = 'Incorrect email or password'
            }
        }
        
    }
}

if(welcome){
    welcome.innerHTML=`Welcome ${localStorage.getItem('userName')}`
}