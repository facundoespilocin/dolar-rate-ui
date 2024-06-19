<template>
    <div>
        <nav class="navbar">
            <!-- Left section -->
            <div class="navbar-brand">
                <a class="navbar-item" href="/">
                    <b-icon-house-door />
                </a>
            </div>
        </nav>

        <div class="container border-shadow margin-top">
            <div class="row mt-2" v-if="customer">
                <div class="container">
                    <div class="border-shadow">
                        <div class="row">
                            <div class="col-sm-1">
                                <b-icon class="person-icon-border text-muted" font-scale="4" icon="person" />
                            </div>

                            <div class="col-sm-11">
                                <div>
                                    <label class="pointer"> {{ customer.name }} </label>
                                </div>

                                <div>
                                    <label class="text-normal text-muted small margin-bottom pointer">{{ customer.email }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mt-2 margin-bottom-double">
                <!-- Menu list section -->
                <div class="col-sm-3">
                    <div class="border-shadow">
                        <div class="row pt-1 padding-top item-menu pointer" v-for="itemMenu in itemsMenuList" :key="itemMenu.index">
                            <div class="col-sm-2 pointer">
                                <b-icon class="icon-border h2 text-primary" :icon="iconMappings[itemMenu.icon]" />
                            </div>
 
                            <div class="col-sm-10 pointer" v-on:click="goToItemMenuDetails(itemMenu.link)">
                                <label class="pointer"> {{ itemMenu.title }} </label>
                                
                                <label class="m-0 text-normal text-muted small margin-bottom pointer">{{ itemMenu.description }}</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-sm-9" v-if="customer">
                    <!-- My data section -->
                    <div class="" v-if="sectionVisibility.MyData">
                        <MyData />
                    </div>

                    <!-- My cards section -->
                    <div class="" v-if="sectionVisibility.MyCards">
                        <MyCards />
                    </div>

                    <!-- My addresses section -->
                    <div class="" v-if="sectionVisibility.MyAddresses">
                        <MyAddresses />
                    </div>

                    <!-- Orders in Progress section -->
                    <div class="" v-if="sectionVisibility.MyShopping">
                        <MyOrders />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import "@/assets/style.css"
import SectionInfo from '@/components/Warnings/SectionInfo.vue'
import MyData from '@/views/MyProfile/MyData.vue'
import MyCards from '@/views/MyProfile/MyCards.vue'
import MyAddresses from '@/views/MyProfile/MyAddresses.vue'
import MyOrders from '@/views/MyProfile/MyOrders.vue'
import { DOCUMENT_TYPES } from '@/enums/enums';

export default {
    components: {
        SectionInfo,
        MyData,
        MyCards,
        MyAddresses,
        MyOrders
    },

    data() {
        return {
            orders : null,
            email: "facu.espilocin@hotmail.com",
            itemsMenuList: [
                {
                    id: 0,
                    title: "Información personal",
                    description: "Consultá tus datos personales",
                    icon: "person",
                    link: "MyData"
                },
                {
                    id: 1,
                    title: "Tarjetas",
                    description: "Tarjetas de crédito y débito guardadas",
                    icon: "creditCard",
                    link: "MyCards"
                },
                {
                    id: 2,
                    title: "Direcciones",
                    description: "Direcciones guardadas",
                    icon: "pin",
                    link: "MyAddresses"
                },
                {
                    id: 3,
                    title: "Mis compras",
                    description: "Histórico de compras",
                    icon: "cart",
                    link: 'MyShopping'
                }
            ],

            iconMappings: {
                person: "person",
                cart: "cart4",
                creditCard: "credit-card",
                pin: "pin-map"
            },

            sectionVisibility: {
                MyData: false,
                MyCards: false,
                MyAddresses: false,
                MyShopping: true
            },
        }
    },

    async created() { 
        // await this.$store.dispatch('getOrderDetails', localStorage.getItem("orderId") || 0);
        await this.$store.dispatch('getUserData', localStorage.getItem("token") || null);
    },

    methods: {
        ellipsis(name) {
            return name.length > 29 ? name.substring(0, 29) + "..." : name
        },

        getOrderId(orderId) {
            return "Orden #" + orderId;
        },

        goToItemMenuDetails(link) {
            this.handleView(link);
        },

        handleView(link) {
            for (let section in this.sectionVisibility) {
                this.sectionVisibility[section] = false;
            }

            this.sectionVisibility[link] = true;
        },

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
        ...mapGetters(['getCustomerData']),

        customer() {
            return this.getCustomerData;
        },
    },

    watch: { }
}
</script>