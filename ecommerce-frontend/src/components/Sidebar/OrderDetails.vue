<template>
    <div>
        <b-sidebar
            id="sidebar"
            width="35%"
            no-header
            shadow
            bg-variant="light"
            :visible="isCollapsed"
            backdrop-variant="light"
            backdrop
            right>
            <template>
                <div class="p-3">
                    <div class="row">
                        <div class="col-sm-11">
                            <h4 id="sidebar-no-header-title" class="">Detalle</h4>
                        </div>

                        <div class="col-sm-1 p-0">
                            <span class="pointer" v-on:click="closeSidebar()">X</span>
                        </div>
                    </div>

                    <hr>

                    <div class="row">
                        <div class="col-sm-9">
                            Producto
                        </div>

                        <div class="col-sm-3">
                            Subtotal
                        </div>
                    </div>

                    <hr>

                    <div class="row" v-for="product in products" :key="product.id">
                        <div class="col-sm-2 m-0 margin-left mb-2 home-product-card">
                            <img class="img-container" :src="product.image" width="100%">
                        </div>

                        <div class="col-sm-8"> 
                            <a class="pointer m-0 p-0" v-on:click="goProductDetail(product.id)">
                                {{ ellipsis(product.name) }}
                            </a>
                        </div>

                        <div class="col-sm-2">
                            <p class="m-0 p-0">
                                ${{ product.price }}
                            </p>
                        </div>
                    </div>

                    <hr>

                    <div class="row">
                        <div class="col-sm-10">
                            Subtotal:
                        </div>

                        <div class="col-sm-2">
                            ${{ subTotal }}
                        </div>
                    </div>

                    <hr>
                    
                    <div class="row">
                        <div>
                            <div class="row mb-1">
                                <div class="col-sm-1">
                                    <img class="img-container" src="https://cdn-icons-png.flaticon.com/512/411/411763.png">
                                </div>

                                <div class="col-sm-11 p-0">
                                    Envío a domicilio
                                </div>
                            </div>

                            <div class="border-shadow p-1 mb-2">
                                <div class="row">
                                    <div class="col-sm-9 m-0">
                                        <div class="radio-group">
                                            <label>
                                                <input type="radio" value="1" class="margin-left" v-model="deliveryTypeSelected" /> Correo Argentino
                                            </label>
                                        </div>
                                    </div>

                                    <div class="col-sm-3 m-0 pull-right">
                                        <span class="block">Gratis</span>
                                        <p class="line-through m-0 p-0">$2636.23</p>
                                    </div>
                                </div>
                            </div>

                            <div class="row mb-1">
                                <div class="col-sm-1 mb-1">
                                    <img class="img-container" src="https://cdn-icons-png.flaticon.com/512/0/619.png">
                                </div>

                                <div class="col-sm-11 p-0">
                                    Retirar
                                </div>
                            </div>

                            <div class="border-shadow p-1">
                                <div class="row">
                                    <div class="col-sm-9 m-0">
                                        <label>
                                            <input type="radio" value="2" class="margin-left" v-model="deliveryTypeSelected" /> Correo Argentino - Retiro por sucursal
                                        </label>

                                    </div>

                                    <div class="col-sm-3 m-0 pull-right">
                                        <span class="block">Gratis</span>
                                        <p class="line-through m-0 p-0"> $2139.82</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr>

                    <div class="row">
                        <div class="col-sm-10">
                            <span>
                                Total:
                            </span>
                        </div>

                        <div class="col-sm-2">
                            <span>
                                $40
                            </span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-3">
                        </div>

                        <div class="col-sm-9">
                            <span>
                                O hasta 3 cuotas sin interés de $123456,23
                            </span>
                        </div>
                    </div>

                    <hr>

                    <div class="row">
                        <div>
                            <b-button class="col-sm-12" variant="primary" v-on:click="goAddressDetails()">Comprar</b-button>
                        </div>
                    </div>
                </div>
            </template>
        </b-sidebar>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import "@/assets/style.css"

export default {
    name: "OrderDetails",
    props: { 
        isCollapsed: Boolean,
    },

    data() {
        return {
            products: [
                {
                    id: 1,
                    name: 'Producto con longitud muy larga larga',
                    description: 'Description for Product 1',
                    price: 19.99,
                    image: 'https://lascameliaslp.com.ar/wp-content/uploads/choco-aguila-tradicional.jpg'
                },
                {
                    id: 2,
                    name: 'Product 2',
                    description: 'Description for Product 2',
                    price: 29.99,
                    image: 'https://lascameliaslp.com.ar/wp-content/uploads/choco-aguila-tradicional.jpg'
                },
            ],

            subTotal: 39.99,
            total: 0,
            deliveryTypeSelected: 1
        }
    },

    mounted() {
        
    },
    
    created() { },

    methods: {
        ellipsis(name){
            return name.length > 29 ? name.substring(0, 29) + "..." : name
        },

        goProductDetail(productId) {
            window.location.href = "/Products/Details/" + productId;
        },

        goAddressDetails() {
            window.location.href = "/";
        },
        
        onItemClick(itemMenu, child) {
            if (itemMenu.title === "Productos") {
                this.setProductsOperation(child.title);
            }

            if (itemMenu.title === "Categorias") {
                this.setCategoriesOperation(child.title);
            }

            if (itemMenu.title === "Clientes") {
                this.setCustomersOperation(child.title);
            }

            window.location.href = child.route;
        },

        handleChilds(itemTitle) {
            this.itemsMenuList.find(i => i.title == itemTitle).showChilds = !this.itemsMenuList.find(i => i.title == itemTitle).showChilds;
        },

        closeSidebar() {
            this.$emit("update:isCollapsed", false);
        }

    },
    
    computed: { },

    watch: { }
}
</script>