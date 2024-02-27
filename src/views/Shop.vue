<template>
    <div class="container">
        <!-- Navbar -->
        <Navbar></Navbar>

        <div class="border-shadow p-4">
            <div class="row">
                <div class="col-sm-9">
                    <h4>Shop</h4>
                </div>

                <!-- Order type -->
                <div class="col-sm-3 pull-right">
                    <span>Ordernar por</span>

                    <b-select class="margin-left">
                        <b-select-option value="h">
                            Precio más alto
                        </b-select-option>
                        
                        <b-select-option value="l">
                            Precio más bajo 
                        </b-select-option>
                    </b-select>
                </div>
            </div>

            <div class="row">
                <!-- Filters -->
                <div class="col-sm-3">
                    <label>Filtros</label>

                    <b-form-group>
                        <b-form-checkbox-group v-model="selected" :options="options"></b-form-checkbox-group>
                    </b-form-group>

                    <hr>

                    <label>Precio</label>
                    
                    <div class="row">
                        <div class="col-sm-5">
                            <span>Desde</span>
                        </div>

                        <div class="col-sm-5">
                            <span>Hasta</span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-5">
                            <b-input></b-input>
                        </div>

                        <div class="col-sm-5 ">
                            <b-input></b-input>
                        </div>

                        <div class="col-sm-2 p-0">
                            <b-button>
                                <b-icon-arrow-right></b-icon-arrow-right>
                            </b-button>
                        </div>
                    </div>
                </div>

                <!-- Card section -->
                <div class="col-sm-9">
                    <Cards :products="products"></Cards>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
import "@/assets/style.css"
import Navbar from '@/components/Navbar/Navbar.vue'
import Cards from '@/components/Cards/ShopCards.vue'

export default {
    components: {
        Navbar,
        Cards
    },

    data() {
        return {
            selected: [], // Must be an array reference!
            options: [
                { text: 'Orange', value: 'orange' },
                { text: 'Apple', value: 'apple' },
                { text: 'Pineapple', value: 'pineapple' },
                { text: 'Grape', value: 'grape' }
            ],

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

    created() {
    },

    methods: { },

    computed: {
        ...mapGetters({customersOperation: 'getCustomersOperation'})
    }
}
</script>