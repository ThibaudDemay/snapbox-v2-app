<template>
  <div class="home-view layout horizontal">
    <div class="menu">
      <router-link :to="{name: 'ConfView'}" class="settings bg-elem-interact" tag="div">
        <img src="@/assets/settings-gears.png" />
      </router-link>
      <div class="count bg-elem">
        <span>{{ pics_count }}</span>
        <img src="@/assets/picture.png" />
      </div>
    </div>
    <div class="main">
      <div class="capture bg-elem-interact" @click="launchSnap()">
        <img src="@/assets/photo-camera.png" />
        <span v-if="camera_state">Take a pics</span>
        <span v-else class="no-cam">No Camera connected</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { computed, defineComponent } from "vue";
import { useSnapboxStore } from "@/store/modules/snapbox";
import { useCameraStore } from "@/store/modules/camera";

export default defineComponent({
  name: "HomeView",
  setup() {
    const cameraStore = useCameraStore();
    const snapboxStore = useSnapboxStore();
    const pics_count = computed(() => snapboxStore.config.pics_count);
    const camera_state = computed(() => cameraStore.is_connected);

    snapboxStore.getAllConfig();

    function launchSnap(): void {
      if (cameraStore.is_connected === true) {
        router.push({ name: "CountdownView" });
      }
    }

    return { pics_count, camera_state, launchSnap };
  },
});
</script>

<style lang="scss" scoped>
.home-view {
  @apply h-full w-full;
  .menu {
    height: 165px;
    @apply box-border flex justify-between p-5 w-full;
    // height: 12.75%;
    .count {
      @apply flex justify-end items-center pl-2;
      span {
        @apply text-8xl;
      }
    }
  }

  .main {
    height: calc(100% - 165px);
    @apply box-border pb-5 px-5 w-full;
    .capture {
      @apply flex flex-col justify-center items-center h-full;
      // height: 100%;
      span {
        @apply text-7xl;

        &.no-cam {
          @apply text-red-600;
        }
      }
    }
  }
}
</style>
