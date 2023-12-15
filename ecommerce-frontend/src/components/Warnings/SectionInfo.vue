<template>
    <div>
        <div class="row container my-2">
            <div class="col-sm-6 info border-shadow margin-bottom">
                <b-icon class="margin-right" icon="exclamation-circle"/>
                
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