<template>
  <div class="login-container">
    <!-- <div v-show="loading" class="loader center-loader"></div>
    <div  v-show="!loading" class="login-contents box-shadow">
      <div class="login-items">
        <div class="login-img">
          <img src="/O2_fix.png" alt="">
          <p>管理者ログイン</p>
        </div>
        <div class="login-inputs-contents">
          <div class="login-inputs">
            <input type="password" name="" value="" v-model="password" placeholder="パスワード">
            <button class="button-b" type="button" name="button" @click="login">ログイン</button>
            <nuxt-link to="/admin/partnerlogin" class="">
              <p class="plogin">パートナー事務所の方はこちら</p>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      // loading: true,
      // password: '',
      // pass: ''
    }
  },
  computed: {},
  created() {
    // this.fetch()
  },
  mounted() {},
  methods: {
    // fetch() {
    //   this.$firestore.collection('adminPassword').get().then(snapshot => {
    //     snapshot.forEach(doc => {
    //       this.pass = doc.data()
    //       this.loading = false
    //     })
    //   }).catch(error => {
    //     this.loading = false
    //   })
    // },
    // login() {
    //   if (this.password === this.pass.id) {
    //     const auth = true
    //     this.$store.commit("changeAuth", auth);
    //
    //     this.$router.push('/')
    //   } else {
    //     this.$toast.error('パスワードが違います')
    //   }
    // }
  },
}
</script>

<style>
/* .login-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container .center-loader {
  margin: 0!important;
}

.login-contents {
  width: 50vw;
  max-width: 620px;
  height: fit-content;
  margin: 0;
}

.login-items {
margin: 60px 0 80px;
}

.login-img {
  text-align: center;
  margin-bottom: 10px;
}

.login-img img {
  width: 150px;
  height: 150px;
}

.login-inputs-contents {

}

.login-inputs {
  width: 50%;
  margin: 0 auto;
  text-align: center;
}

.login-inputs input {
  margin-top: 50px;
  width: 100%;
  border-radius: 0;
  border: none;
  border-bottom: 1px solid #ccc;
  font-size: 16px;
}

.login-inputs button {
  margin: 50px 10px 20px;
  width: 40%;
  height: 40px;
  border-radius: 20px;
}

.plogin {
  font-size: 14px;
}

@media (max-width: 769px) {

  .login-contents {
    width: 80vw;
    height: fit-content;
    margin: 0;
  }

  .login-items {
  margin: 30px 0 70px;
  }

  .login-img {
    text-align: center;
    margin-bottom: 10px;
  }

  .login-img img {
    width: 100px;
    height: 100px;
  }

  .login-inputs-contents {

  }

  .login-inputs {
    width: 70%;
    margin: 0 auto;
    text-align: center;
  }

  .login-inputs input {
    margin-top: 30px;
    width: 100%;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid #ccc;
    font-size: 14px;
  }

  .login-inputs button {
    margin: 30px 0 0 0;
    width: 100%;
    height: 40px;
    border-radius: 20px;
  }

} */
</style>
