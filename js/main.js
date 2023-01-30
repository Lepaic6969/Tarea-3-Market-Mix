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

        //Variables que controla el Admin
        cargoAdmin:'',
        baseSecretario:1160000, //Salario base secretario
        baseVendedor:1500000, //Salario base vendedor
        baseEnsamblador:1500000,
        comisionVendedor:5, // Comisión del vendedor => 5% del total de sus ventas
        maxZapatos:2000,
        maxZapatillas:4000,
        bonoEnsambleZapatos:1000,
        bonoEnsambleZapatillas:700,
        variableEnsamblador:'',
        //Variables del vendedor.
        ventasZapatos:null,
        ventasZapatillas:null,
        //Variables secretario.
        horasExtraSecretario:0,
        
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
           if(salario===""){
            alert("Recuerde diligenciar la cantidad que quiere modificar");
            return false;
          }
          if(salario<1160000){
            alert(`El salario del ${cargo}, no puede ser inferior al salario mínimo`);
            return false;
          }
          if(salario>2500000){
            alert(`El sueldo del ${cargo}, no puede ser superior a 2'500.000`);
            return false;
          }
          return true;
      },

      validarComision(){
        let validacionExitosa=true;
          if(this.comisionVendedor>20 || this.comisionVendedor<0){
            alert("Recuerde que la comisión no puede sobrepasar el 20% ni tener un porcentaje negativo.");
            validacionExitosa=false;
          }
          if(this.comisionVendedor===''){
            alert("Recuerde llenar el campo de la comisión.");
            validacionExitosa=false;
          }
          return validacionExitosa;
      },

      modificarSecretario(){
        // if(this.baseSecretario===1160000) return; //Este es para que no se haga nada en caso de que el valor ingresado seal el mismo que ya estaba.
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

      modificarEnsamblador1(){
        
        // if(this.baseEnsamblador===1500000) return; 
        let datosCorrectos=this.validarSalario(this.baseEnsamblador,'ensamblador');
        if(datosCorrectos){
          alert(`Modificación salarial exitosa, el nuevo salario base del ensamblador es de ${this.baseEnsamblador}`);
        }else{
          this.baseEnsamblador=1500000;
        }
      },

      modificarEnsamblador2(){
        // if(this.maxZapatos===3000 || this.maxZapatos===4000) return;
        if(this.maxZapatos==="" || this.maxZapatos===""){
          alert("Recuerde llenar todos los campos")
          // this.maxZapatos===2000; 
          // this.maxZapatillas===4000;
          return
        }
        if(!(this.maxZapatos>0 && this.maxZapatos<4000)){
          alert("Recuerde que la cantidad máxima de zapatos dede estar entre 0 y 4000 pares")
          this.maxZapatos=3000;
          return
        }
        if(!(this.maxZapatillas>0 && this.maxZapatillas<6000)){
          alert("Recuerde que la cantidad máxima de zapatillas dede estar entre 0 y 6000 pares")
          this.maxZapatillas=4000;
          return
        }
        alert("Modificación exitosa");
      },

      modificarEnsamblador3(){
        // Esta primera validación me está fallando sólo en este componente.
        // if(this.bonoEnsambleZapatos===1000 || this.bonoEnsambleZapatillas===700) return;
        if(this.bonoEnsambleZapatos==="" || this.bonoEnsambleZapatillas===""){
          alert("Recuerde llenar todos los campos")
          return
        }
       
        if(!(this.bonoEnsambleZapatos>=0 && this.bonoEnsambleZapatos<3000)){
          alert("Recuerde que el bono por ensamble de zapatos dede estar entre 0 y 3000 pesos")
          this.bonoEnsambleZapatos=1000;
          return
        }
        if(!(this.bonoEnsambleZapatillas>=0 && this.bonoEnsambleZapatillas<2000)){
          alert("Recuerde que el bono por ensamble de zapatillas dede estar entre 0 y 2000 pesos")
          this.bonoEnsambleZapatillas=700;
          return
        }
        alert("Modificación exitosa");
      },
  /******************************************************************************************** */
      vendedorZapatos(){ 
          let totalVentas = (this.ventasZapatos*250000)+(this.ventasZapatillas*150000);
          let comisionVenta = (totalVentas*this.comisionVendedor)/100;
          let subsidio = 160000;
          let totalSalarioVendedor=0;
          if(totalVentas<5000000){
            totalSalarioVendedor=(this.baseVendedor)+comisionVenta+subsidio;
          } else if(totalVentas>=5000000 && totalVentas<10000000){
            totalSalarioVendedor=(1.1*this.baseVendedor)+comisionVenta+subsidio;
          }else  if(totalVentas>=10000000){
            totalSalarioVendedor=(1.2*this.baseVendedor)+comisionVenta+subsidio;
          }
          totalSalarioVendedor=Math.floor(totalSalarioVendedor)
          //Aproximamos el salario para que sea un número entero.

          alert(`El total de ventas es de ${totalVentas}, la comisión es de ${comisionVenta} y el subsidio de trasporte es de ${subsidio}`);
          alert(`El salario del vendedor es de: ${totalSalarioVendedor}`)
        },

      horasSecretario(){
        let salarioTotal=0;
        let precioHoraExtra = (this.baseSecretario * 1.8)/180; //180 horas de trabajo que tiene un mes.

        salarioTotal=this.baseSecretario+(precioHoraExtra*this.horasExtraSecretario);
        alert(`El valor total por las horas extras trabajadas es : ${precioHoraExtra*this.horasExtraSecretario}`);
        alert(`El salario total del secretario es de ${salarioTotal}`);

      }
    }
    
  });

  main.mount(".main");