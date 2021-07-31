<template>
  <div class="countdown-view">
    <router-link to="/" class="return bg-elem-interact" tag="div">
      <img src="@/assets/back-arrow.png" />
    </router-link>
    <div class="timer">
      {{ timer }}
    </div>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent, onMounted, ref, watch } from "vue";

export default defineComponent({
  name: "CountdownView",
  setup() {
    const timerEnabled = ref(false);
    const timer = ref(10);

    onMounted(() => {
      timerEnabled.value = true;
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
        router.push({ name: "SnapView" });
      }
    });

    return { timerEnabled, timer };
  },
});
</script>

<style lang="scss" scoped>
.countdown-view {
  .timer {
    @apply text-7xl;
  }
}
</style>
