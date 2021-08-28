<template>
  <div class="picture-view layout vertical">
    <div class="menu">
      <router-link to="/" class="return bg-elem-interact" tag="div">
        <img src="@/assets/back-arrow.png" />
      </router-link>
      <div class="timer">
        {{ timer }}
      </div>
    </div>
    <div class="main">
      <div class="picture-div" v-if="picture">
        <img
          class="picture"
          :src="'http://127.0.0.1:12700/assets/' + picture.id"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import SnapboxService from "@/services/snapbox.service";
import { onMounted, defineComponent, watch, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "PictureView",
  setup() {
    const store = useStore();
    const route = useRoute();
    const picture = ref(null);
    const timerEnabled = ref(false);
    const timer = ref(10);

    onMounted(() => {
      // store.dispatch("snapbox/getPicture"); // add id of picture
      SnapboxService.getPicture(route.params.id)
        .then((response) => {
          picture.value = response.data;
          timerEnabled.value = true;
        })
        .catch((error) => {
          console.log(error);
          router.push({ name: "HomeView" });
        });
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
        router.push({ name: "HomeView" });
      }
    });

    return { store, picture, timerEnabled, timer };
  },
});
</script>

<style lang="scss" scoped></style>
