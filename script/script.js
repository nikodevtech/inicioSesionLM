/**
 * Clase que representa a la entidad usuario
 */
class Usuario{
	
	constructor(nombre,apellidos,email,contraseña,preguntaRec,respuestaRec){
		this._nombre=nombre;
        this._apellidos=apellidos;
        this._email=email;
        this._contraseña=contraseña;
        this._preguntaRec=preguntaRec;
        this._respuestaRec=respuestaRec;
	}
	get nombre(){
		return this._nombres;
	}
	set nombre(valor){
		this._nombre=valor;
	}
    get apellidos(){
		return this._napellidos;
	}
	set apellidos(valor){
		this._apellidos=valor;
	}
	get email(){
		return this._email;
	}
	set email(email){
		this._email=email;
	}
    get contraseña(){
        return this._contraseña;
    }
    set contraseña(contraseña){
        this._contraseña=contraseña;

    }
	get preguntaRec(){
		return this._preguntaRec;
	}
	set preguntaRec(preguntaRec){
		this._preguntaRec=preguntaRec;
	}
    get respuestaRec(){
        return this._respuestaRec;
    }
    set respuestaRec(respuestaRec){
		this._respuestaRec=respuestaRec;
	}
 
};

let listaUsuarios = []; //Array que hace la función de base de datos para usuarios registrados
/**
 * Registra en la aplicación al usuario con los datos introducidos en el formulario.
 * @param {*} event 
 * @returns 
 */
const registrarUsuario = (event) => {

	event.preventDefault();

    let nombre = document.getElementsByName('nombre')[0].value;
    let apellidos = document.getElementsByName('apellidos')[0].value;
    let email = document.getElementsByName('email')[0].value;
    let contraseña = document.getElementsByName('password')[0].value;
    let contraseña2 = document.getElementsByName('password2')[0].value;
    let preguntaRec = document.getElementsByName('preguntaRec')[0].value;
    let respuestaRec = document.getElementsByName('respuestaRec')[0].value;

    if(!emailEnUso(email))
    {      
        if(contraseña===contraseña2){

            listaUsuarios.push(new Usuario(nombre, apellidos, email, contraseña, preguntaRec, respuestaRec));
            alert("Usuario registrado correctamente!");
            localStorage.setItem('arrayDeUsers', JSON.stringify(listaUsuarios)); //Se guarda el array con la info de los usuarios registrados en el navegador en formato JSON
            window.location.href='index.html';
            return true;
        }
        else
            alert("Las contraseñas no coinciden");       
    }
    else
        alert("El correo electronico ya está en uso. Prueba con otro.");
};

/**
 * Función que comprueba que el usuario se encuentra registrado en la aplicación con el correo y la contraseña introducida
 * @param {*} email 
 * @param {*} contraseña 
 * @returns true si en el array hay un usuario con el email y la contraseña introducida, en caso contrario false
 */
const verificarUsuario = (email, contraseña) => {
    let listaUsers = localStorage.getItem("arrayDeUsers"); //Se recupera los datos de usuarios registrados y para trabajar con ellos se parsea por que se encuentra en JSON
    listaUsers = JSON.parse(listaUsers);

    if(listaUsers === null || listaUsers === undefined) {
        return false;
    }
    else{
        for (let i = 0; i < listaUsers.length; i++) {
            if (listaUsers[i]._email === email && listaUsers[i]._contraseña === contraseña) {
                return true;
            }
        }
        return false;
    }  
};

/**
 * Ejecuta el inicio de sesión con la ayuda de la función verificarUsuario() y si se encuentra registrado el usuario en el sistema, redirige a la vista de bienvenida.html
 */
const iniciarSesion = (event) => {
    event.preventDefault();
    let email = document.getElementsByName('email')[0].value;
    let contraseña = document.getElementsByName('password')[0].value;
    
    // Verificar si el usuario está registrado
    let loginCorrecto = verificarUsuario(email, contraseña);
    
    if (loginCorrecto) {
        // Si el usuario está registrado, redirigir a la página de bienvenida
        alert("¡Inicio de sesión correcto!");
        window.location.href = "bienvenida.html";       
    } else  // Si el usuario no está registrado y/o introdujo mal sus datos, mostrar mensaje de error
        alert('Correo electrónico o contraseña incorrectos'); 
    
};

/**
 * Función para que no haya registros con el mismo email mas de una vez
 * @param {*} email 
 * @returns true si ya existe en el array y false si no
 */
const emailEnUso = (email) => {
    
    let listaUsers = localStorage.getItem("arrayDeUsers"); //Se recupera los datos de usuarios registrados y para trabajar con ellos se parsea por que se encuentra en JSON
    listaUsers = JSON.parse(listaUsers);
    
    if(listaUsers === null || listaUsers === undefined) 
        return false;
    else{
        for (let i = 0; i < listaUsers.length; i++) {
            if (listaUsers[i]._email === email) {
                return true;
            }
        }
    }
    return false;
};
/**
 * Función para que el usuario pueda confirmar que quiere cerrar sesión en la vista de bienvenida y salir
 */
const confirmarCerrarSesion = () => {
    if (confirm('¿Seguro que quiere cerrar sesión?')) {
        window.location.href = 'index.html';
    }
}
/**
  * Función que actualiza la contraseña si la respuesta a la pregunta de recuperación asociada a ese email coinciden
 */
const cambiarContraseña = () =>{
    let listaUsers = localStorage.getItem("arrayDeUsers"); //Se recupera los datos de usuarios registrados y para trabajar con ellos se parsea por que se encuentra en JSON
    listaUsers = JSON.parse(listaUsers);

    let pregunta = document.getElementsByName('preguntaRec')[0].value;
    let respuesta = document.getElementsByName('respuestaRec')[0].value;
    let email = document.getElementsByName('email')[0].value;
    let nuevaContraseña = document.getElementsByName('password')[0].value;
    
    if(listaUsers === null || listaUsers === undefined) 
        alert("No hay un usuario registrado con ese email")
    else{
        for (let i = 0; i < listaUsers.length; i++) {
            if (listaUsers[i]._email === email && listaUsers[i]._respuestaRec === respuesta && listaUsers[i]._preguntaRec ===  pregunta) {
                listaUsers[i]._contraseña = nuevaContraseña;
                localStorage.setItem('arrayDeUsers', JSON.stringify(listaUsers)); 
                alert("Contraseña actualizada correctamente!"); 
                window.location.href='index.html';
            }
            else{
                alert("Respuesta de seguridad incorrecta para el email introducido");
            }
        }
    } 
};


  