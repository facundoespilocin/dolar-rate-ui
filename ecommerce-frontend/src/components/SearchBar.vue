<template>
    <div>
        <div class="padre">
            <h1>¡Hacé tu Pedido!</h1>
        </div>

        <div class="padre">
            <div class="row">
              <div class="col-sm-1">
                    <b-icon icon="search" class="icon-size-s mt-2" />
              </div>
              <div class="col-sm-8">
                <input type="email" placeholder="Ingresá tu Pedido" class="form-control">
              </div>
                
              <div class="col-sm-2">
                <b-button class="btn-dark" type="submit">Buscar</b-button>
              </div>
            </div>
        </div>
  </div>
</template>

<script>
import "@/assets/style.css"

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only 
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style> -->