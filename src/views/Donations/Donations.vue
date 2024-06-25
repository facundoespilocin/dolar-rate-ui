<template>
    <div class="card-border-primary p-2">
        <h2>¡Ayudame a mantener este proyecto en funcionamiento!</h2>
        <p>
            Para seguir brindando este servicio de manera gratuita y mantener la aplicación actualizada con la información más reciente, es clave tu apoyo. Tus donaciones me ayudará a cubrir los costos de operación y desarrollo, dando lugar a mejorar y expandir nuestras funcionalidades.
        </p>

        <p>
            Mantener esta aplicación operativa implica una serie de costos que incluyen:
        </p>

        <ul>
            <li>Servidores y almacenamiento en la nube</li>
            <li>Infraestructura para asegurar la disponibilidad y escalabilidad</li>
            <li>Certificados de seguridad para proteger la información de cada usuarios</li>
            <li>Mantenimiento y desarrollo continuo para mejorar la aplicación</li>
        </ul>

        <p>
            Tus donaciones me van a ayudar a cubrir estos costos y asegurar que pueda seguir brindando información precisa y actualizada. ¡Cada contribución cuenta y es muy agradecida!
        </p>

        <p>
            Si valorás mi trabajo y te gustaría colaborar, te invito a hacer una donación. ¡Gracias por tu apoyo!
        </p>

        <div>
            <button class="btn-primary" v-on:click="goToCafecito()">☕ Invitame un Cafecito</button>
        </div>
    </div>
</template>
  
<script>
  
  export default {
      name: "Donations",
  
      data() {
          return {
            screenWidth: window.innerWidth,
          };
      },
  
      created() {
          this.updateScreenWidth();
          window.addEventListener('resize', this.updateScreenWidth);
      },
  
      destroyed() {
          window.removeEventListener('resize', this.updateScreenWidth);
      },
  
      methods: {
        updateScreenWidth() {
              this.screenWidth = window.innerWidth;
          },

          goToCafecito() {
            window.open("https://cafecito.app/facuespilocin", "_blank");
          },
      }
  };
</script>