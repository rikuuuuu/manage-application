<template>
  <div class="menu-bar">
    <div class="flex">
      <div class="menu">
        <div class="menu-o2-icon">
          <a href="/" class="links">
            <img src="/nuxt.png" alt="" />
          </a>
        </div>
        <div class="menu-container">
          <div class="menu-contents">
            <a href="/talents/all" class="links"><p>出品者</p></a>
            <a href="/fans/all" class="links"><p>購入者</p></a>
            <a href="/sales/all" class="links"><p>売り上げ</p></a>
            <a href="/approval/all" class="links"><p>申請承認待ち</p></a>
            <a href="/news/create" class="links"><p>ニュース作成</p></a>
          </div>
        </div>
      </div>
      <div @click.self="$emit('close')" :class="{ overflow: overflow }"></div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: ['overflow'],
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style>
.menu-bar {
  height: 100vh;
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
}

.menu {
  background-color: #3e52ff;
  width: 256px;
  height: 100vh;
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
}

.menu-o2-icon {
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu-o2-icon img {
  width: 100px;
  height: 100px;
}

.menu-container {
}

.menu-contents {
  width: 100px;
  margin: 0 auto;
}

.menu-contents p {
  color: #fff;
  margin-bottom: 30px;
}

.overflow {
  width: 100vw;
  background: rgba(0, 0, 0, 0.2);
}

@media (max-width: 1023px) {
  .menu-bar {
    display: none;
  }
}

@media (max-width: 769px) {
  .menu-o2-icon {
    height: 150px;
  }

  .menu-o2-icon img {
    width: 60px;
    height: 60px;
  }

  .menu-contents p {
    font-size: 14px;
    margin-bottom: 25px;
  }
}
</style>
