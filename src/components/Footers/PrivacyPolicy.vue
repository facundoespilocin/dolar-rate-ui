<template>
    <div class="card-border-shadow p-2">  
        <p>Última actualización: el <strong>24 de junio de 2024</strong></p>
        
        <h5>1. Introducción</h5>

        <p>
            En Dolar Info, nos comprometemos a proteger la privacidad de nuestros usuarios. Esta Política de Privacidad describe cómo recopilamos, usamos y protegemos la información personal que nos proporcionas a través de nuestra aplicación.
        </p>
        
        <h5>2. Información que Recopilamos</h5>
        <p>
            Recopilamos diferentes tipos de información para ofrecer y mejorar nuestros servicios:

            <ul>
                <li><strong>Información Personal:</strong> Al registrarte o usar nuestra aplicación, podemos recopilar información personal, como tu nombre, dirección de correo electrónico, número de teléfono y otros datos similares.</li>
                <li><strong>Información de Uso:</strong> Recopilamos información sobre cómo interactúas con nuestra aplicación, incluyendo las páginas o funciones que visitas, el tiempo que pasas en la aplicación y otros datos similares.</li>
                <li><strong>Información de Dispositivo:</strong> Recopilamos información sobre el dispositivo que usas para acceder a nuestra aplicación, incluyendo el modelo del dispositivo, el sistema operativo, la dirección IP y otros identificadores únicos.</li>
            </ul>
        </p>
        
        <h5>3. Uso de la Información</h5>
        <p>
            Utilizamos la información recopilada para:

            <ul>
                <li>Proporcionar y mejorar nuestros servicios.</li>
                <li>Personalizar tu experiencia en nuestra aplicación.</li>
                <li>Comunicarnos contigo para informarte sobre actualizaciones, promociones y otros mensajes relevantes.</li>
                <li>Cumplir con nuestras obligaciones legales y proteger nuestros derechos y los derechos de nuestros usuarios.</li>
            </ul>
        </p>

        <h5>4. Compartir la Información</h5>

        <p>
            No compartimos tu información personal con terceros, excepto en las siguientes circunstancias:

            <!-- Con proveedores de servicios que nos ayudan a operar nuestra aplicación y proporcionar nuestros servicios. -->
            Cuando sea requerido por la ley o para proteger nuestros derechos y la seguridad de nuestros usuarios.
            Con tu consentimiento explícito.
        </p>
        
        <h5>5. Seguridad de la Información</h5>
        <p>
            Implementamos medidas de seguridad razonables para proteger tu información personal contra el acceso, uso o divulgación no autorizados. Sin embargo, ningún método de transmisión por Internet o de almacenamiento electrónico es completamente seguro, por lo que no podemos garantizar la seguridad absoluta de tu información.
        </p>
        
        <h5>6. Retención de Datos</h5>
        <p>
            Retenemos tu información personal durante el tiempo necesario para cumplir con los fines descritos en esta Política de Privacidad, a menos que se requiera o permita un período de retención más largo por ley.
        </p>

        <h5>7. Tus Derechos</h5>
        <p>
            Tienes derecho a acceder, corregir o eliminar tu información personal. Si deseas ejercer estos derechos, por favor contáctanos a través de la información proporcionada a continuación.
        </p>

        <h5>8. Cambios en la Política de Privacidad</h5>
        <p>
            Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Te notificaremos sobre cualquier cambio significativo publicando la nueva Política de Privacidad en nuestra aplicación y actualizando la fecha de "Última actualización" en la parte superior de esta página.
        </p>
    </div>
</template>

<script>
import "@/assets/style.css"

export default {
    name: "PrivacyPolicy",
    props: { 
        product: Object,
    },

    data() {
        return { 
            screenWidth: window.innerWidth
        }
    },

    async created() {
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
    },

    computed: {
    }
}
</script>