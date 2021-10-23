<template>
  <div id="config" class="page">
    <div class="toolbar">
      <div class="center">SnapBox Config</div>
    </div>
    <div v-if="conf" class="card">
      <ul>
        <li class="header">Storage</li>
        <li v-if="conf.path">Storage Path : {{ conf.path.sto_path }}</li>
        <li v-if="conf.sto_usage">
          Storage Usage: {{ prettyBytes(conf.sto_usage.used) }}/{{ prettyBytes(conf.sto_usage.total) }} ({{ prettyBytes(conf.sto_usage.free) }} free)
        </li>
        <li>Picture Count: {{ conf.pics_count }}</li>
        <li>Ext Picture Count : {{ conf.exts_count }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { prettyBytes } from "@/mixins/filters/pretty_bytes";
import { useSnapboxStore } from "@/store/modules/snapbox";
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "ConfigView",
  setup() {
    const snapboxStore = useSnapboxStore();
    const conf = computed(() => snapboxStore.config);

    snapboxStore.getAllConfig();

    return { conf, prettyBytes };
  },
});
</script>
