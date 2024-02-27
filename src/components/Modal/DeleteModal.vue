<template>
    <div>
        <b-modal centered :title="title">
            <p class="my-4">{{ textBody }}</p>
        </b-modal>
    </div>
</template>

<script>
import "@/assets/style.css"

export default {
    name: "DeleteModal",
    props: {
        title: String,
        textBody: String
    }
}
</script>