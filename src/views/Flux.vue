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
import SnapboxService from "@/services/snapbox.service";

import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "SnapBox",
  components: { Picture },
  setup() {
    const pictures = ref([]);

    onMounted(() => {
      refresh_data();
    });

    function refresh_data(): void {
      SnapboxService.getPictures()
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          pictures.value = data;
        });
    }

    return { pictures };
  },
});
</script>
