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
        <li>Countdown :
          <span v-if="!isAuthenticated">{{ conf.countdown }}</span>
          <span v-if="isAuthenticated">
            <InputPlusMinus v-model:value="conf.countdown" :min="conf.countdown_min" :max="conf.countdown_max" @update:value="saveConf" />
          </span>
        </li>
        <li>Preview :
          <span v-if="!isAuthenticated">{{ conf.preview }}</span>
          <span v-if="isAuthenticated">
            <input type="checkbox" v-model="conf.preview" @change="saveConf"/>
          </span>
        </li>
        <router-link v-if="!isAuthenticated" :to="{name: 'LoginView'}" custom v-slot="{ navigate }">
          <button @click="navigate">login admin</button>
        </router-link>
        <button v-if="isAuthenticated" @click="logout">logout admin</button>
        <!-- <button v-if="isAuthenticated" @click="save">save conf</button> -->
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { prettyBytes } from "@/mixins/filters/pretty_bytes";
import { useSnapboxStore } from "@/store/modules/snapbox";
import { useUserStore } from "@/store/modules/user";
import { defineComponent, computed } from "vue";
import InputPlusMinus from "@/components/InputPlusMinus.vue";

export default defineComponent({
  name: "ConfigView",
  components: { InputPlusMinus },
  setup() {
    const userStore = useUserStore();
    const snapboxStore = useSnapboxStore();
    const conf = computed(() => snapboxStore.config);
    const isAuthenticated = computed(() => userStore.isAuthenticated);

    snapboxStore.getAllConfig();

    function saveConf() {
      snapboxStore.saveConfig();
    }

    return { conf, prettyBytes, isAuthenticated, logout: userStore.logout, saveConf };
  },
});
</script>
