<template>
    <div>
        <div class="row mt-4">
            <div class="col-sm-1 pull-right">            
                <b-icon icon="exclamation-circle" class="icon-size-l pull-left text-color-red" />
            </div>

            <div class="col-sm-11 mt-3">
                <h4 class="text-color-red text-color-red pull-left">
                    No se encontraron resultados. Por favor, ingresá nuevos parámetros de búsqueda.
                </h4>
            </div>
        </div>
    </div>
</template>

<script>
import "@/assets/style.css"

export default {
    name: "ResultsNotFounded",
    props: { }
}
</script>