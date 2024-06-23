<template>
    <div class="indexes card p-2">
        <CircularMenu class="mt-5" @menu-selected="handleMenuSelection" />

        
        <transition name="fade">
          <component
            :is="selectedMenuItem"
            v-if="selectedMenuItem"
            class="content"
        />
    </transition>
    </div>
</template>
  
<script>
import "@/assets/style.css"
import CircularMenu from "@/components/Misc/CircularMenu/CircularMenu.vue";
import TopComponent from "@/components/Misc/CircularMenu/TopComponent.vue";
import RightComponent from "@/components/Misc/CircularMenu/RightComponent.vue";
import BottomComponent from "@/components/Misc/CircularMenu/BottomComponent.vue";
import LeftComponent from "@/components/Misc/CircularMenu/LeftComponent.vue";

export default {
    name: "Indexes",
    components: {
        CircularMenu,
        TopComponent,
        RightComponent,
        BottomComponent,
        LeftComponent,
    },
    data() {
        return {
            selectedMenuItem: null,
        };
    },
    methods: {
        handleMenuSelection(menuItem) {
            this.selectedMenuItem = menuItem;
        },
    },
};
</script>
  