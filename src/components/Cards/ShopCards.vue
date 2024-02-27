<template>
    <div>
        <div class="product-section">
            <div v-for="product in products" :key="product.id" class="shop-product-card">
                <img src="https://picsum.photos/300/300/?image=41" alt="Product">
                
                <div>
                    <h3 class="pull-center product-title">{{ product.name.length >= 17 ? product.name.substring(0,14) + "..." : product.name }}</h3>
                    
                    <p class="pull-center">Description for product</p>
                    
                    <p class="pull-center">Price: <span>$</span>{{ product.price }}</p>
                    
                    <div class="pull-center">
                        <b-button variant="primary" @click="addToCart(product)">Add to Cart</b-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "@/assets/style.css"

export default {
    name: "ShopCards",
    props: { 
        products: Array,
        
    },

    methods: {
        addToCart(product) {
            console.log("Se agregó");
        }
    }
}
</script>