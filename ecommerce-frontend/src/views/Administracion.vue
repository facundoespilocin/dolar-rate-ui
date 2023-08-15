<template>
    <div>
        <h1 class="my-2">Panel de Administración</h1>

        <template>
            <div>
                <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" no-header shadow bg-variant="dark" text-variant="light" visible>
                    <template>
                        <div class="p-3">
                            <h4 id="sidebar-no-header-title">eCommerce</h4>
                            
                            <hr class="mx-3">

                            <nav class="mb-3">
                                <b-nav vertical>
                                    <b-nav-item v-for="itemMenu in itemsMenuList" :key="itemMenu.id" v-on:click="handleChilds(itemMenu.title)">
                                        <div class="row">
                                            <div class="col-sm-2">
                                                <b-icon-box variant="primary"></b-icon-box>
                                            </div>

                                            <div class="col-sm-8 p-0">
                                                <span class="menu-item" v-if="itemMenu.isActive">{{ itemMenu.title }}</span>
                                            </div>

                                            <div class="col-sm-2 pull-right">
                                                <b-icon-arrow-down-short></b-icon-arrow-down-short>
                                            </div>
                                        </div>

                                        <div v-if="itemMenu.showChilds">
                                            <b-nav-item v-for="child in itemMenu.childs" :key="child.id">
                                                <b-icon-box variant="primary"></b-icon-box>
                                                <span class="mx-3 menu-item p-0" v-if="itemMenu.isActive" v-on:click="onItemClick(itemMenu, child)" style="transition: opacity .3s ease;">{{ child.title }}</span>
                                            </b-nav-item>
                                        </div>
                                    </b-nav-item>
                                </b-nav>
                            </nav>
                        </div>
                    </template>
                </b-sidebar>
            </div>
        </template>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import "@/assets/style.css"
import { SidebarMenu } from 'vue-sidebar-menu'

export default {
    components: {
        SidebarMenu
    },

    data() {
        return {
            collapsed: false,

            itemsMenuList: [
                {
                    id: 0,
                    title: "Productos",
                    isActive: true,
                    showChilds: false,
                    childs: [
                        {   id: 0,
                            title: "Consultar Productos",
                            route: "/Products",
                            isActive: true
                        },
                        {   id: 1,
                            title: "Cargar Productos",
                            route: "/Products",
                            isActive: true
                        }
                    ]
                },
                {
                    id: 1,
                    title: "Categorias",
                    href: "/Categories",
                    isActive: true,
                    showChilds: false,
                    childs: [
                        {   id: 0,
                            title: "Consultar Categorias",
                            route: "/Categories",
                            isActive: true
                        }
                    ]
                },
                {
                    id: 2,
                    title: "Clientes",
                    isActive: true,
                    showChilds: false,
                    childs: [
                        {   id: 0,
                            title: "Consultar Clientes",
                            route: "/Customers",
                            isActive: true
                        },
                    ]
                },
            ]
        }
    },

    created() {

    },

    methods: {
        ...mapActions(['setProductsOperation', 'setCategoriesOperation', 'setCustomersOperation']),
        
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

        onCollapse(c) {
            console.log("onCollapse");
            this.collapsed = c;
        },
    },

    computed: { },

    watch: { }
}
</script>