<template>
    <div>
        <nav class="navbar">
            <!-- Left section -->
            <div class="navbar-brand">
                <a class="navbar-item" href="/">
                    Logo
                </a>
            </div>

            <!-- Center section -->
            <div class="navbar-brand">
                <a class="navbar-item" href="/Shop">
                    Productos
                </a>

                <a class="navbar-item" href="/Administracion">
                    Administración
                </a>
            </div>

            <!-- Right section -->
            <div class="navbar-end">
                <a class="navbar-item" href="#">
                    <span class="icon">
                        <b-icon-people></b-icon-people>
                    </span>
                </a>

                <a class="navbar-item" href="#">
                    <span class="icon">
                        <b-icon-search></b-icon-search>
                    </span>
                </a>

                <a class="navbar-item" href="#">
                    <span class="icon">
                        <b-icon-cart></b-icon-cart>
                    </span>
                </a>
            </div>
        </nav>
    </div>
</template>

<script>
import "@/assets/style.css"

export default {
    name: "Navbar",
    props: { }
}
</script>