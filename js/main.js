const usuarios= [
  { cargo: 'secretario', clave: '1234' },
  { cargo: 'vendedor', clave: '5678' },
  { cargo: 'ensamblador', clave: '9012' },
  {cargo: 'administrador', clave: '6666'}
];

const main = Vue.createApp({
    data() {
      return {
        cargo: '',
        clave: '',
        loginExitoso:false,
        direccionamiento:""    
      }
    },
    methods: {
      enviar() {
        if(this.cargo==="" && this.clave==="") {
          alert('Recuerde llenar todos los campos, por favor intente nuevamente');
          return
        }
        // Validar el cargo y la clave aquí
        for (let i = 0; i < usuarios.length; i++) {
          const usuario = usuarios[i];
          if (this.cargo === usuario.cargo && this.clave === usuario.clave) {
            alert('¡Éxito! Has ingresado con éxito.');
            this.redirigir();
            return;
          }
        }
  
        alert('¡Error! El cargo o la clave son incorrectos.');
      },
      redirigir(){
        this.loginExitoso=true; //Esto es para que desaparezca la sesión del login.
        if(this.cargo==="secretario"){
            this.direccionamiento="secretario";
        } else if(this.cargo==="vendedor"){
            this.direccionamiento="vendedor";
        } else if(this.cargo==="ensamblador"){
            this.direccionamiento="ensamblador";
        } else if(this.cargo==="administrador"){
            this.direccionamiento="administrador";
        }
      }
    }
    
  });

  main.mount(".main");
  