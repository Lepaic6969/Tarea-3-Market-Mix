const usuarios= [
  { cargo: 'secretary', clave: '1234' },
  { cargo: 'vendedor', clave: '5678' },
  { cargo: 'ensamblador', clave: '9012' }
];
const login = Vue.createApp({
    data() {
      return {
        cargo: '',
        clave: '',
        login:true
        
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
            this.login=false; //Esto es para que desaparezca la sesión del login.
            return;
          }
        }
  
        alert('¡Error! El cargo o la clave son incorrectos.');
      }
    }
  });

  login.mount(".login")