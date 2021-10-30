<template>
    <form @submit.prevent="onSubmit">
        <input type="text" name="username" id="username" v-model="username"/>
        <input type="password" name="password" id="password" v-model="password"/>
        <button>submit</button>
    </form>
</template>

<script lang="ts">
import SnapboxService from "@/services/snapbox.service";
import { useUserStore } from "@/store/modules/user";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "LoginView",
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    const username = ref("");
    const password = ref("");
    const onSubmit = () => {
      SnapboxService.loginUser(username.value, password.value)
        .then((response) => {
          userStore.token = response.data.token;
          userStore.isAuthenticated = true;
          router.push({ name: "ConfigView" });
        })
        .catch((error) => {
          console.log(error);
          router.push({name: "HomeView"});
        });
    }

    return { username, password, onSubmit }
  }
})
</script>