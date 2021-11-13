<template>
  <button @click="dec">-</button>
  <input :value="value" />
  <button @click="inc">+</button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "InputPlusMinus",
  props: {
    value: {
      type: Number as PropType<number>,
      require: true,
      default: 10,
    },
    min: {
      type: Number as PropType<number>,
      require: true,
      default: 0,
    },
    max: {
      type: Number as PropType<number>,
      require: true,
      default: 30,
    },
  },
  emits: ["update:value"],
  setup(props, context) {
    function inc(): void {
      if (props.value < props.max)
        context.emit("update:value", (props.value as number) + 1);
    }
    function dec(): void {
      if (props.value > props.min)
        context.emit("update:value", (props.value as number) - 1);
    }
    return { dec, inc };
  },
});
</script>
