<template>
  <div class="head-content">
    <div class="head-label flex">
      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        @click="$emit('menubar')"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
      <h1>{{ title }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  props: ['title'],
  methods: {},
}
</script>

<style>
.navbar-burger {
  margin: auto 10px auto 0;
  color: #666;
}

.navbar-burger span {
  height: 2px;
}

.navbar-burger span:nth-child(1) {
  top: calc(49% - 6px);
}

.navbar-burger span:nth-child(3) {
  top: calc(51% + 4px);
}
</style>
