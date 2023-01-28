const login = Vue.createApp({
    data() {
      return {
        cargo: '',
        clave: '',
        usuarios: [
          { cargo: 'secretary', clave: '1234' },
          { cargo: 'vendedor', clave: '5678' },
          { cargo: 'ensamblador', clave: '9012' }
        ]
      }
    },
    methods: {
      enviar() {
        // Validar el cargo y la clave aquí
        for (let i = 0; i < this.usuarios.length; i++) {
          const usuario = this.usuarios[i];
          if (this.cargo === usuario.cargo && this.clave === usuario.clave) {
            alert('¡Éxito! Has ingresado con éxito.');
            return;
          }
        }
  
        alert('¡Error! El cargo o la clave son incorrectos.');
      }
    }
  });