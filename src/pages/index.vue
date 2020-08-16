<template>
  <div>
    <div>
      <menu-head :title="'管理画面'"></menu-head>
    </div>
  </div>
</template>

<script>
import MenuHead from '~/components/MenuHead'

export default {
  components: {
    MenuHead,
  },
  data() {
    return {}
  },
}
</script>

<style>
.home-container {
}

.sales-contents {
  max-width: 1200px;
}

.sales-title p {
  font-size: 14px;
  line-height: 35px;
}

.sales-contents-boxes {
}

.sales-contents-box {
}

.salesbox {
  width: 30%;
  margin-right: 40px;
}

.box-title {
  text-align: center;
}

.box-value {
  text-align: center;
  font-size: 32px;
}

.box-value p span {
  color: #666;
  font-size: 18px;
}

.bottom-contents {
  margin: 50px auto 50px;
}

.approval-contents {
  width: 40%;
  /* margin: 0 auto 50px; */
}

.approval-title {
}

.approval-contents-boxes {
}

.approval-contents-box {
  width: 100%;
}

.users-count-contents {
  width: 60%;
}

.users-count-contents-box {
  width: 100%;
}

.fansbox {
  width: 35%;
  margin-right: 40px;
}

@media (max-width: 769px) {
  .sales-contents-boxes {
    display: block;
  }

  .sales-contents-box {
    width: 60%;
    margin: 30px auto 0;
  }

  .bottom-contents {
    display: block;
  }

  .approval-contents-boxes {
  }

  .approval-contents {
    width: 100%;
  }

  .fansbox {
    margin: 0 auto;
  }

  .users-count-contents-boxes {
    display: block;
  }

  .users-count-contents {
    width: 100%;
    margin-top: 40px;
  }

  .users-count-contents-box {
    width: 60%;
    margin: 30px auto 0;
  }
}
</style>
