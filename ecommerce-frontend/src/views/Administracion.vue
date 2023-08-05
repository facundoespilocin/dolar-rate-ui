<template>
    <div>
        <h1 class="my-2">Panel de Administración</h1>
        <div id="view" :class="[{ collapsed: collapsed }]">
            <router-view />
        </div>
        
        <sidebar-menu
            class="sidebar"
            :menu="menu"
            :collapsed="collapsed"
            @item-click="onItemClick"
            @collapse="onCollapse"/>
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

            menu: [
                {
                    header: true,
                    title: '',
                    // hidden: false
                    // hiddenOnCollapse: true
                    // class: ''
                    // attributes: {}
                },
                {
                    title: "Cadetes",
                    icon: "fa fa-list-ul",
                    child: [
                        {
                            href: "/Cadets",
                            title: "Consultar Cadetes",
                            icon: "fa fa-file-alt",
                        },
                        {
                            href: "/Cadets",
                            title: "Agregar Cadetes",
                            icon: "fa fa-file-alt",
                        },
                    ],
                },
                {
                    title: "Pedidos",
                    icon: "fa fa-list-ul",
                    child: [
                        {
                            href: "/Pedidos",
                            title: "Consultar Pedidos",
                            icon: "fa fa-file-alt",
                        },
                    ],
                },
                {
                    title: "Productos",
                    icon: "fa fa-list-ul",
                    child: [
                        {
                            href: "/Products",
                            title: "Consultar Productos",
                            icon: "fa fa-file-alt",
                        },
                        {
                            href: "/Products",
                            title: "Cargar Productos",
                            icon: "fa fa-file-alt",
                        },
                    ],
                },
            ]
        }
    },

    created() {

    },

    methods: {
        ...mapActions(["setCadetsOperation", "setProductsOperation"]),

        onItemClick(e, i) {
            if (i.href === "/Cadets") {
                this.setCadetsOperation(i.title);
            }

            if (i.href === "/Products") {
                this.setProductsOperation(i.title);
            }
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