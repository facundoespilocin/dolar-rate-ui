<template>
    <div>
        <div class="product-section">
            <div v-for="product in products" :key="product.id" class="home-product-card" v-on:click="goProductDetail(product.id)">
                <img class="pointer" :src="product.mainImageUrl" alt="Product">
                
                <div>
                    <h3 class="pull-center product-title pointer">{{ product.name.length >= 17 ? product.name.substring(0,14) + "..." : product.name }}</h3>
                    
                    <!-- <p class="pull-center">{{ product.shortDescription}}</p> -->
                    
                    <p class="pull-center">Price: <span>$</span>{{ product.price }}</p>
                    
                    <div class="pull-center">
                        <b-button variant="primary" @click="addToCart(product)">Agregar al carrito</b-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "@/assets/style.css"

export default {
    name: "HomeCards",
    props: { 
        products: Array,
    },

    methods: {
        addToCart(product) {
            console.log("Se agregó");
        },

        async goProductDetail(productId) {
            window.location.href = "/Products/Details/" + productId;
        }
    }
}
</script>