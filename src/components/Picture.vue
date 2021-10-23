<template>
  <div class="picture-div">
    <img class="picture" :src="'http://127.0.0.1:12700/assets/' + picture.id" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { SnapboxPictureState } from "@/store/modules/snapbox";

export default defineComponent({
  name: "Picture",
  props: {
    picture: {
      type: Object as PropType<SnapboxPictureState>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.picture {
  /* display: inline-block; */
  /*margin-left: 5px;*/
  max-width: 420px;
  max-height: 280px;
}
</style>
