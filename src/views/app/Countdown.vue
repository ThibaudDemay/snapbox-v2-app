<template>
  <div class="countdown-view layout vertical">
    <div class="menu">
      <router-link :to="{name: 'HomeAppView'}" class="return bg-elem-interact" tag="div">
        <img src="@/assets/back-arrow.png" />
      </router-link>
    </div>
    <div class="main">
      <div class="timer">
        {{ timer.time }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useTimer } from "@/use/timer";
import { defineComponent} from "vue";

export default defineComponent({
  name: "CountdownView",
  setup() {
    const timer = useTimer("SnapView");
    return { timer };
  },
});
</script>

<style lang="scss" scoped>
.countdown-view {
  @apply h-full w-full;
  .menu {
    height: 165px;
    @apply box-border flex justify-between p-5 w-full;
    // height: 12.75%;
  }
  .main {
    .timer {
      @apply text-7xl;
    }
  }
}
</style>
