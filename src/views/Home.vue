<template>
  <div class="home-view">
    <div class="top">
      <router-link to="/conf" class="settings bg-elem-interact" tag="div">
        <img src="@/assets/settings-gears.png" />
      </router-link>
      <div class="count bg-elem">
        <span>{{ pics_count }}</span>
        <img src="@/assets/picture.png" />
      </div>
    </div>
    <div class="main">
      <div class="capture bg-elem-interact" v-on:click="launchSnap()">
        <img src="@/assets/photo-camera.png" />
        <span v-if="camera_state">Take a pics</span>
        <span class="no-cam" v-else>No Camera connected</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "HomeView",
  setup() {
    const store = useStore();
    const pics_count = computed(() => store.state.snapbox.config.pics_count);
    const camera_state = computed(
      () => store.state.snapbox.config.camera_state
    );

    store.dispatch("snapbox/getAllConfig");

    function launchSnap(): void {
      if (store.state.snapbox.config.camera_state === true) {
        router.push({ name: "CountdownView" });
        store.state.websocket.send("Hello There !");
      }
    }

    return { store, pics_count, camera_state, launchSnap };
  },
});
</script>

<style lang="scss" scoped>
.home-view {
  @apply h-full w-full;
  .top {
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
