<template>
  <div class="snap-view">
    <img src="@/assets/smile.png" />
    <div class="snap-text">Cheeeessseeee !!!</div>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import SnapboxService from "@/services/snapbox.service";
import { defineComponent, onMounted } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "SnapView",
  setup() {
    const store = useStore();

    onMounted(() => {
      SnapboxService.takeSnap()
        .then((response) => {
          router.push({
            name: "PictureView",
            params: { id: response.data.id },
          });
        })
        .catch((error) => {
          console.log(error);
          router.push({
            name: "HomeView",
          });
        });
    });

    return { store };
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
