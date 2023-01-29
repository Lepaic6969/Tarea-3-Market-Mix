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
        direccionamiento:"",
        //Variables Admin
        cargoAdmin:'',
        baseSecretario:1160000, //Salario base de cada una de las profesiones.
        baseVendedor:1500000,
        baseEnsamblador:1500000,
        maxZapatos:3000,
        maxZapatillas:4000,
        bonoEnsambleZapatos:1000,
        bonoEnsambleZapatillas:700,
        comisionVendedor:5 // 5% del total de sus ventas


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
      }, 
      /******************************************************************************************** */
      //ESTOS SON MÉTODOS DEL ADMINISTRADOR.
      validarSalario(salario,cargo){
           let validacionExitosa=true;
           if(salario===""){
            alert("Recuerde diligenciar la cantidad que quiere modificar");
            validacionExitosa=false;
          }
          if(salario<1160000){
            alert(`El salario del ${cargo}, no puede ser inferior al salario mínimo`);
            validacionExitosa=false;
          }
          if(salario>2500000){
            alert(`El sueldo del ${cargo}, no puede ser superior a 2'500.000`);
            validacionExitosa=false;
          }
          return validacionExitosa;
      },
      validarComision(){
        let validacionExitosa=true;
          if(this.comisionVendedor>20 || this.comisionVendedor<0){
            alert("Recuerde que la comisión no puede sobrepasar el 20% ni tener un porcentaje negativo.");
            validacionExitosa=false;
          }
          return validacionExitosa;
      },
      modificarSecretario(){
        if(this.baseSecretario===1160000) return; //Este es para que no se haga nada en caso de que el valor ingresado seal el mismo que ya estaba.
        let datosCorrectos=this.validarSalario(this.baseSecretario,'secretario');
        if(datosCorrectos){
          alert(`Modificación salarial exitosa, el nuevo salario base del secretario es de ${this.baseSecretario}`);
        }else{
          this.baseSecretario=1160000;
        }
        
      },
      modificarVendedor(){
        let comisionCorrecta=this.validarComision();
        if(!comisionCorrecta || this.comisionVendedor===5){
          this.comisionVendedor=5;
        }else{
          alert(`Modificación de comisión exitosa`);
        }
        if(this.baseVendedor===1500000) return; 
        let datosCorrectos=this.validarSalario(this.baseVendedor,'vendedor');
        if(datosCorrectos){
          alert(`Modificación salarial exitosa, el nuevo salario base del vendedor es de ${this.baseVendedor}`);
        }else{
          this.baseVendedor=1500000;
        }
        
      },
      modificarEnsamblador(){
        if(this.baseEnsamblador===1500000) return; 
        let datosCorrectos=this.validarSalario(this.baseEnsamblador,'ensamblador');
        if(datosCorrectos){
          alert(`Modificación salarial exitosa, el nuevo salario base del ensamblador es de ${this.baseEnsamblador}`);
        }else{
          this.baseEnsamblador=1500000;
        }
      }

    }
    
  });

  main.mount(".main");
  