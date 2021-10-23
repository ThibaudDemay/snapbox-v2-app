<template>
  <div class="picture-view layout vertical">
    <div class="menu">
      <router-link :to="{name: 'HomeAppView'}" class="return bg-elem-interact" tag="div">
        <img src="@/assets/back-arrow.png" />
      </router-link>
      <div class="timer">
        {{ timer }}
      </div>
    </div>
    <div class="main">
      <div class="picture-div">
        <img v-if="picture"
          class="picture"
          :src="'http://127.0.0.1:12700/assets/' + picture.id"
        />
        <img v-if="!picture" class="picture" src="@/assets/default_photo.png" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { useSnapboxStore } from "@/store/modules/snapbox";
import { onMounted, onUnmounted, defineComponent, watch, ref, computed } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "PictureView",
  setup() {
    const route = useRoute();
    const snapboxStore = useSnapboxStore();
    const picture = computed(() => snapboxStore.picture);
    const timerEnabled = ref(false);
    const timer = ref(10);

    snapboxStore.getPicture(route.params.id);

    onMounted(() => {
      timerEnabled.value = true;
    });

    onUnmounted(() => {
      snapboxStore.cleanPicture();
    });

    watch(timerEnabled, (value) => {
      if (value) {
        setTimeout(() => {
          timer.value--;
        }, 1000);
      }
    });

    watch(timer, (value) => {
      if (value > 0 && timerEnabled.value) {
        setTimeout(() => {
          timer.value--;
        }, 1000);
      } else if (value == 0) {
        router.push({ name: "HomeAppView" });
      }
    });

    return { picture, timer };
  },
});
</script>

<style lang="scss" scoped></style>
