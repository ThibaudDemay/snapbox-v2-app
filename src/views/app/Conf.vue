<template>
  <div class="conf-view layout horizontal">
    <div class="menu">
      <router-link :to="{name: 'HomeAppView'}" class="return bg-elem-interact" tag="div">
        <img src="@/assets/back-arrow.png" />
      </router-link>
      <div class="things bg-elem">things</div>
    </div>
    <div class="main">
      <div class="conf bg-elem">
        {{ conf }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useSnapboxStore } from "@/store/modules/snapbox";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "ConfView",
  setup() {
    const snapboxStore = useSnapboxStore();
    const conf = computed(() => snapboxStore.config);
    snapboxStore.getAllConfig();
    return { conf };
  },
});
</script>

<style lang="scss" scoped>
.conf-view {
  @apply h-full w-full;
  .menu {
    height: 165px;
    @apply box-border flex justify-between p-5 w-full;
    // height: 12.75%;
  }

  .main {
    height: calc(100% - 165px);
    @apply box-border pb-5 px-5 w-full;
    .conf {
      @apply flex flex-col justify-center items-center h-full;
    }
  }
}
</style>
