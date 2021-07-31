<template>
  <div class="conf-view">
    <div class="top">
      <router-link to="/" class="return bg-elem-interact" tag="div">
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
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "ConfView",
  setup() {
    const store = useStore();
    const conf = computed(() => store.state.snapbox.config);

    onMounted(() => {
      store.dispatch("snapbox/getAllConfig");
    });

    return { store, conf };
  },
});
</script>

<style lang="scss" scoped>
.conf-view {
  @apply h-full w-full;
  .top {
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
