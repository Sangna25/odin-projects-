const form=document.querySelector('form');
const password=document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');
const errorMsg=document.querySelector('#error-msg')
form.addEventListener('submit',(event)=>{
    let hasError=false;
    password.classList.remove('input-error');
    confirmPassword.classList.remove('input-error');
    if(password.value!==confirmPassword.value){
        event.preventDefault();
         errorMsg.textContent="Password dont match!";
         password.classList.add('input-error');
    confirmPassword.classList.add('input-error');
    hasError=true
    }
   if(!hasError){
    errorMsg.textContent=''
   }
})
