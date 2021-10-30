<template>
  <div class="picture-view layout vertical">
    <div class="menu">
      <router-link :to="{name: 'HomeAppView'}" class="return bg-elem-interact" tag="div">
        <img src="@/assets/back-arrow.png" />
      </router-link>
      <div class="timer">
        {{ timer.time }}
      </div>
    </div>
    <div class="main">
      <div class="picture-div">
        <img
          v-if="picture"
          class="picture"
          :src="'http://127.0.0.1:12700/assets/' + picture.id"
        />
        <img v-if="!picture" class="picture" src="@/assets/default_photo.png" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useSnapboxStore } from "@/store/modules/snapbox";
import { onUnmounted, defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
import { useTimer } from "@/use/timer";

export default defineComponent({
  name: "PictureView",
  setup() {
    const route = useRoute();
    const snapboxStore = useSnapboxStore();
    const timer = useTimer("HomeAppView");
    const picture = computed(() => snapboxStore.picture);

    snapboxStore.getPicture(route.params.id);

    onUnmounted(() => {
      snapboxStore.cleanPicture();
    });

    return { picture, timer };
  },
});
</script>

<style lang="scss" scoped></style>
