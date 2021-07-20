//variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');


const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();
function eventListeners ( ){
            //arranque de App
            document.addEventListener('DOMContetLoaded', iniciarApp);

            email.addEventListener('blur', validarFormulario);
            asunto.addEventListener('blur', validarFormulario);
            mensaje.addEventListener('blur', validarFormulario);
        
            //reinicia el formulario
            btnReset.addEventListener('click', resetearFormulario);
            
            
            // enviar mail
            formulario.addEventListener('submit', enviarEmail);        
        
        }


//funciones
function iniciarApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
    


};
//validacion
function validarFormulario(e){
    


    if(e.target.value.length > 0){
      
      //elimina los mesnajes de errores
        const error = document.querySelector('p.error');
        if(error){
            error.remove(); 
        }
                
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    }else{
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligstorios');
    }
    
    if(e.target.type === 'email'){
        
         if (er.test( e.target.value )){
            //elimina los mesnajes de errores
        const error = document.querySelector('p.error');
        if(error){
            error.remove(); 
        } 
                    
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
            
         }else{
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError(`" ${e.target.value} " NO es un email válido`);

         }   
     }
    
     if(er.test( email.value ) && asunto.value !== '' && mensaje.value !== ''){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
     }

}
    function mostrarError ( mensaje ) {

    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500','p-3','mt-5','text-center', 'error');

    const errores = document.querySelectorAll('.error');
    if(errores.length === 0 ){ //usamos querySelectorAll porque tiene la opcion de "length", de otra manera en querySelector no esta la opcion
        formulario.appendChild(mensajeError);
    }



}   

//enviar le email
function enviarEmail(e){
    e.preventDefault();

    //mostar el spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    // oculatr el espiner
    setTimeout(()=>{
        spinner.style.display = 'none';
        //mensaje satisfactorio
        const parrafo = document.createElement('p')
        parrafo.textContent = 'El mensaje se envió correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'fond-bold', 'uppercase')
        //inserta el parrofa antes del spinner
        formulario.insertBefore(parrafo, spinner);
        
        setTimeout(() => {
            parrafo.remove();

            
            
            resetearFormulario();
        }, 5000);
    
    }, 3000);
}
function resetearFormulario() {
    formulario.reset();

            email.classList.remove('border', 'border-green-500');
            asunto.classList.remove('border', 'border-green-500');
            mensaje.classList.remove('border', 'border-green-500');
            
            
         
    iniciarApp();
}
