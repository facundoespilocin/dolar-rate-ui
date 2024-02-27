<template>
    <div>
        
    </div>
</template>

<script>
import "@/assets/style.css"
import { mapGetters, mapActions } from "vuex"

export default {
    name: "Notification",
    props: { 
        text: String,
    },

    data() {
        return { }
    },

    async created() {
    },

    methods: {
        showNotification(type, text) {
            this.$toasted.show(text, {
                duration: 3000,
                type: type,
                theme: "bubble",
                singleton: true,
                action: {
                    text: 'X',
                    onClick: (e, toastObject) => {
                        toastObject.goAway(0);
                    }
                },
            });
        },
    },

    computed: {
    }
}
</script>