<template>
  <div class="snap-view">
    <img src="@/assets/smile.png" />
    <div class="snap-text">Cheeeessseeee !!!</div>
  </div>
</template>

<script lang="ts">
import { useSnapboxStore } from "@/store/modules/snapbox";
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "SnapView",
  setup() {
    const snapboxStore = useSnapboxStore();
    onMounted(() => {
      snapboxStore.takeSnap();
    });
  },
});
</script>

<style lang="scss" scoped>
.snap-view {
  .snap-text {
    @apply text-7xl;
  }
}
</style>
