/* eslint-disable */

declare module 'vue-native-websocket-vue3';
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.png' {
  const value: any;
  export default value;
}