<template>
    <div>
        <div class="sidebar" :class="{ 'collapsed': isCollapsed }" @mouseenter="expandSidebar" ref="sidebar">
            <h4 class="pointer pointer px-3 py-2 m-0" v-on:click="goHome()">{{ !isCollapsed ? "eCommerce" : "L" }}</h4>

            <div class="icon-list p-0">
                <nav class="mb-3">
                    <b-nav vertical>
                        <b-nav-item v-for="itemMenu in itemsMenuList" :key="itemMenu.id" v-on:click="handleChilds(itemMenu.title)">
                            <div class="row">
                                <div class="col-sm-2">
                                    <b-icon-box variant="light"></b-icon-box>
                                </div>

                                <div class="col-sm-8 p-0">
                                    <span class="menu-item" v-if="itemMenu.isActive && itemMenu.isVisible">{{ itemMenu.title }}</span>
                                </div>

                                <div class="col-sm-2 pull-right">
                                    <b-icon-arrow-down-short v-if="itemMenu.isVisible" variant="light"></b-icon-arrow-down-short>
                                </div>
                            </div>

                            <div v-if="itemMenu.showChilds">
                                <b-nav-item v-for="child in itemMenu.childs" :key="child.id" v-on:click="onItemClick(itemMenu, child)" class="menu-item" style="transition: opacity .3s ease;">
                                    <b-icon-box variant="light"></b-icon-box>
                                    
                                    <span class="mx-3 p-0" v-if="itemMenu.isActive && itemMenu.isVisible" >{{ child.title }}</span>
                                </b-nav-item>
                            </div>
                        </b-nav-item>
                    </b-nav>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import "@/assets/style.css"

export default {
    name: "Sidebar2",
    props: { 
    },

    data() {
        return {
            collapsed: false,
            isCollapsed: false,
            itemsMenuList: [
                {
                    id: 0,
                    title: "Productos",
                    isActive: true,
                    isVisible: true,
                    showChilds: false,
                    childs: [
                        {   id: 0,
                            title: "Agregar Producto",
                            route: "/Products",
                            isActive: true,
                            isVisible: false,
                        },
                        {   id: 1,
                            title: "Consultar Productos",
                            route: "/Products",
                            isActive: true,
                            isVisible: false,
                        },
                        {   id: 2,
                            title: "Cargar Productos",
                            route: "/Products",
                            isActive: true,
                            isVisible: false,
                        }
                    ]
                },
                {
                    id: 1,
                    title: "Categorias",
                    href: "/Categories",
                    isActive: true,
                    isVisible: true,
                    showChilds: false,
                    childs: [
                        {   id: 0,
                            title: "Agregar Categoria",
                            route: "/Categories",
                            isActive: true,
                            isVisible: false,
                        },
                        {   id: 1,
                            title: "Consultar Categorias",
                            route: "/Categories",
                            isActive: true,
                            isVisible: false,
                        },
                        
                    ]
                },
                {
                    id: 2,
                    title: "Clientes",
                    isActive: true,
                    isVisible: true,
                    showChilds: false,
                    childs: [
                        {   id: 0,
                            title: "Consultar Clientes",
                            route: "/Customers",
                            isActive: true,
                            isVisible: false,
                        },
                    ]
                },
                {
                    id: 3,
                    title: "Usuarios",
                    isActive: true,
                    isVisible: true,
                    showChilds: false,
                    childs: [
                        {   id: 0,
                            title: "Consultar Usuarios",
                            route: "/Users",
                            isActive: true,
                            isVisible: false,
                        },
                    ]
                },
            ]
        }
    },

    mounted() {
        // Agregar un manejador de eventos para cerrar el sidebar al hacer clic fuera de él
        document.addEventListener("click", this.handleOutsideClick);
    },

    beforeDestroy() {
        document.removeEventListener("click", this.handleOutsideClick);
    },
    
    created() { },

    methods: {
        ...mapActions(['setProductsOperation', 'setCategoriesOperation', 'setCustomersOperation']),

        goHome() {
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

        toggleSidebar() {
            this.isCollapsed = !this.isCollapsed;
        },

        expandSidebar() {
            this.isCollapsed = false;

            this.itemsMenuList.forEach(item => {
                item.isVisible = true;
            });

            this.itemsMenuList.forEach(item => item.childs.forEach(c => c.isVisible = false));
        },

        collapseSidebar() {
            this.isCollapsed = true;
        },

        handleOutsideClick(event) {
            if (!this.$refs.sidebar.contains(event.target)) {
                this.resetShowChilds();
                this.collapseSidebar();
            }
        },

        resetShowChilds() {
            this.itemsMenuList.forEach(item => {
                item.showChilds = false;
            });

            this.itemsMenuList.forEach(item => {
                item.isVisible = false;
            });

            this.itemsMenuList.forEach(item => item.childs.forEach(c => c.isVisible = false));
        },
    },
    
    computed: { },

    watch: { }
}
</script>