<template>
  <router-view />
</template>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
}

#app {
  width: 100%;
  height: 100%;

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  background-color: #00cec9;

  @apply select-none;

  img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
  }
}

.bg-elem {
  background-color: #00a5a1;
}

.bg-elem-interact {
  background-color: #00a5a1;

  &:hover {
    background-color: #009996;
  }
}

.layout {
  @apply flex;

  .menu {
    @apply flex justify-between;
  }

  &.vertical {
    @apply flex-row;

    .menu {
      @apply flex-col;
    }
  }

  &.horizontal {
    @apply flex-col;

    .menu {
      @apply flex-row;
    }
  }
}
</style>
