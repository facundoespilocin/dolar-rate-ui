<template>
    <div class="card p-2">  
        <p>Última actualización: el <strong>24 de junio de 2024</strong></p>
        
        <h5>1. Precios</h5>
        <p>
            <strong>Volatilidad de Precios:</strong> Los precios de las cotizaciones del dólar presentados en nuestra plataforma son altamente volátiles. Esto significa que pueden cambiar minuto a minuto debido a factores del mercado y otras influencias económicas. Nos esforzamos por proporcionar la información más precisa y actualizada posible; sin embargo, no podemos garantizar que los precios mostrados reflejen el valor exacto en tiempo real. Los usuarios deben tener en cuenta esta volatilidad al tomar decisiones financieras basadas en la información proporcionada en nuestra plataforma.
        </p>
        
        <h5>2. Uso No Autorizado</h5>
        <p>
            <strong>Restricciones de Uso:</strong> No permitimos la oferta de nuestros servicios en otros medios no autorizados. Esto incluye, pero no se limita a, la reproducción, distribución, o publicación de nuestro contenido en otros sitios web, aplicaciones o medios impresos sin nuestro consentimiento explícito y por escrito.
        </p>

        <p>
            <strong>Responsabilidad del Usuario:</strong> En caso de que un usuario infrinja esta política y comparta información de nuestra plataforma en medios no autorizados, dicha acción será responsabilidad exclusiva del usuario. No asumimos ninguna responsabilidad por la exactitud, integridad o confiabilidad de la información cuando es compartida fuera de nuestro entorno autorizado. El usuario que incurra en esta práctica será responsable de cualquier consecuencia derivada del uso indebido de la información.
        </p>
        
        <h5>3. Cookies</h5>
        <p>
            <strong>Uso de Cookies:</strong> Nuestra plataforma utiliza cookies para mejorar la experiencia del usuario. Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas nuestro sitio web. Utilizamos cookies para varias finalidades, incluyendo:
        </p>
        
        <ul>
            <li><strong>Personalización:</strong> Para recordar tus preferencias y personalizar tu experiencia en nuestra plataforma.</li>
            <li><strong>Análisis:</strong> Para recopilar datos sobre el tráfico del sitio y cómo los usuarios interactúan con nuestra plataforma, lo que nos ayuda a mejorar nuestros servicios.</li>
            <li><strong>Publicidad:</strong> Para mostrar anuncios relevantes en función de tus intereses y comportamientos de navegación.</li>
        </ul>
        
        <p>
            <strong>Consentimiento y Control:</strong> Al usar nuestra plataforma, das tu consentimiento para el uso de cookies de acuerdo con estos términos. Puedes controlar y gestionar las cookies a través de la configuración de tu navegador. Ten en cuenta que deshabilitar las cookies puede afectar la funcionalidad de nuestra plataforma y tu experiencia de usuario.
        </p>

        <p>
            <strong>Política de Cookies:</strong> Para obtener más información sobre cómo utilizamos las cookies y cómo puedes gestionarlas, te invitamos a leer nuestra Política de Cookies completa, disponible en nuestro sitio web.
        </p>
    </div>
</template>

<script>
import "@/assets/style.css"

export default {
    name: "TermsAndConditions",
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