<template>
    <div class="container">
        <Navbar></Navbar>
        
        <div class="card">
            <div class="row">
                <div class="col-sm-4 pull-center">
                    <span>Envío gratis en pedidos US$ 99+</span>
                    <br>
                    Dentro de todo el país
                </div>
                <div class="col-sm-4 pull-center">
                    <span>Envíos rápidos</span>
                    <br>
                    Comprá en linea, recibí dentro de las 24 hs
                </div>
                <div class="col-sm-4 pull-center">
                    <span>Soporte en tiempo real</span>
                    <br>
                    Asesoramiento ágil y personalizado
                </div>
            </div>
        </div>

        <!-- Card section -->
        <Cards :products="products"></Cards>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
import "@/assets/style.css"
import Navbar from '@/components/Navbar/Navbar.vue'
import Cards from '@/components/Cards/HomeCards.vue'

export default {
    components: {
        Navbar,
        Cards
    },

    data() {
        return {
            products: [
                {
                    id: 1,
                    name: 'Product 1',
                    description: 'Description for Product 1',
                    price: 19.99,
                    image: 'product1.jpg'
                },
                {
                    id: 2,
                    name: 'Product 2',
                    description: 'Description for Product 2',
                    price: 29.99,
                    image: 'product2.jpg'
                },
                {
                    id: 3,
                    name: 'Product 3',
                    description: 'Description for Product 3',
                    price: 29.99,
                    image: 'product2.jpg'
                },
                {
                    id: 4,
                    name: 'Product 4',
                    description: 'Description for Product 3',
                    price: 29.99,
                    image: 'product2.jpg'
                },
                {
                    id: 5,
                    name: 'Product 5',
                    description: 'Description for Product 3',
                    price: 29.99,
                    image: 'product2.jpg'
                },
                {
                    id: 6,
                    name: 'Product 6',
                    description: 'Description for Product 3',
                    price: 29.99,
                    image: 'product2.jpg'
                },
                {
                    id: 7,
                    name: 'Product 7',
                    description: 'Description for Product 3',
                    price: 29.99,
                    image: 'product2.jpg'
                },
                {
                    id: 8,
                    name: 'Product 8',
                    description: 'Description for Product 3',
                    price: 29.99,
                    image: 'product2.jpg'
                },
                {
                    id: 9,
                    name: 'Product 9',
                    description: 'Description for Product 3',
                    price: 29.99,
                    image: 'product2.jpg'
                },
            ]
        }
    },

    async created() {
        await this.getAllProducts();
    },

    methods: {
        async getAllProducts() {
            //this.showOverlay = true;

            let resource = "/products";

            await this.axios.get(resource)
            .then(res => {
                this.products = res.data;
            })
            .catch(e => {
                //this.showNotification("error", "No fue posible cargar los Productos. Error: " + e);
            })
            .finally(e => {
                //this.showOverlay = false;
            })
        },
    },

    computed: {
        //...mapGetters({orderId: 'getOrderId'})
    }
}
</script>