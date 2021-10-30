<template>
  <div id="snapbox">
    <div v-if="pictures" id="pictures">
      <Picture
        v-for="picture in pictures"
        :key="picture.id"
        :picture="picture"
      />
    </div>
    <div v-else>Loading ...</div>
  </div>
</template>

<script lang="ts">
import Picture from "@/components/Picture.vue";
import { useSnapboxStore } from "@/store/modules/snapbox";

import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "SnapBox",
  components: { Picture },
  setup() {
    const snapboxStore = useSnapboxStore();
    const pictures = computed(() => snapboxStore.pictures);

    snapboxStore.getAllPictures();

    return { pictures };
  },
});
</script>
