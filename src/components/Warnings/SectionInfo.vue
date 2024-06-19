<template>
    <div>
        <div class="row container my-2 text-white">
            <div class="col-sm-6 info border-shadow margin-bottom">
                <b-icon class="margin-right text-color-yellow" icon="exclamation-circle"/>
                
                {{ text }}
            </div>
        </div>
    </div>
</template>

<script>
import "@/assets/style.css"

export default {
    name: "SectionInfo",
    props: {
        text: String
    }
}
</script>