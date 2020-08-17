<template>
  <div class="approval-contents-box box-shadow">
    <ap-modal @close="closeModal" v-if="modal">
      <div class="modal-contents">
        <div class="m-box-top-contents flex">
          <img
            v-if="talent.info.profileLink"
            class="icon"
            :src="talent.info.profileLink"
            alt=""
          />
          <img v-else class="icon" src="/nuxt.png" alt="" />
          <p>{{ talent.info.nickName }}</p>
          <button
            type="button"
            name="button"
            @click="closeModal"
            class="canselbutton"
          >
            <img class="cansel" src="/cansel.png" alt="" />
          </button>
        </div>
        <div class="box-middle-contents m-middle flex">
          <div class="m-approval-image block">
            <img
              v-if="talent.info.authPhotoLink"
              :src="talent.info.authPhotoLink"
              alt=""
            />
            <img v-else src="/nuxt.png" alt="" />
            <p>撮影指示</p>
          </div>
          <div class="approval-info detail-info">
            <p>{{ talent.info.familyName + talent.info.givenName }}</p>
            <p>{{ talent.info.familyKana + talent.info.givenKana }}</p>
            <p>{{ gender }}</p>
            <!-- <p>{{ birthday }}</p> -->
            <p>{{ talent.info.email }}</p>
            <!-- <p>{{ join }}</p> -->
            <p>{{ talent.info.userid }}</p>
          </div>
        </div>
        <div class="box-bottom-contents">
          <div class="approval-button">
            <button type="button" name="button" @click="approvalButton(3)">
              承認
            </button>
            <button
              class="button-b nonapp-b"
              type="button"
              name="button"
              @click="approvalButton(2)"
            >
              再提出
            </button>
          </div>
        </div>
      </div>
    </ap-modal>
    <div class="box-top-contents flex">
      <img
        v-if="talent.info.profileLink"
        :src="talent.info.profileLink"
        alt=""
      />
      <img v-else src="/nuxt.png" alt="" />
      <p>{{ talent.info.nickName | truncate(6, '...') }}</p>
      <button
        class="button-b app-b"
        type="button"
        name="button"
        @click="openModal"
      >
        詳細
      </button>
    </div>
    <div class="box-middle-contents flex">
      <div class="approval-image">
        <img
          v-if="talent.info.authPhotoLink"
          :src="talent.info.authPhotoLink"
          alt=""
        />
        <img v-else src="/nuxt.png" alt="" />
      </div>
      <div class="approval-info">
        <p>{{ talent.info.familyName + talent.info.givenName }}</p>
        <p>{{ talent.info.familyKana + talent.info.givenKana }}</p>
        <p v-if="talent.info.gender === 0">男性</p>
        <p v-else-if="talent.info.gender === 1">女性</p>
        <p v-else>そのほか（性別）</p>
        <!-- <p>{{ birthday }}</p> -->
      </div>
    </div>
    <div class="box-bottom-contents">
      <div class="approval-info-bottom">
        <p>撮影指示</p>
        <p>{{ talent.info.email }}</p>
      </div>
      <div class="approval-button">
        <button type="button" name="button" @click="approvalButton(3)">
          承認
        </button>
        <button
          class="button-b nonapp-b"
          type="button"
          name="button"
          @click="approvalButton(2)"
        >
          再提出
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ApModal from '~/components/ApModal'

export default {
  data() {
    return {
      modal: false,
    }
  },
  components: {
    ApModal,
  },
  props: ['talent'],
  computed: {
    gender() {
      switch (this.talent.info.gender) {
        case 0:
          return '男性'
        case 1:
          return '女性'
        case 2:
          return 'その他'
        default:
      }
      return '性別'
    },
    // join() {
    //   var create = ''
    //   var joined = this.talent.info.joined * 1000
    //   create = this.$dayjs(joined).format('YYYY/M/D')
    //   return create
    // },
    // birthday() {
    //   var birthday = this.talent.info.birthday
    //   var str = String(birthday)
    //   var result = str.replace('_', '/');
    //
    //   while(result !== str) {
    //     str = str.replace('_', '/');
    //     result = result.replace('_', '/');
    //   }
    //
    //   var date = new Date(str)
    //
    //   var now = new Date
    //
    //   var Now = this.$dayjs(now).format('x')
    //
    //   var birth = this.$dayjs(date).format('x')
    //
    //   var diff = this.$dayjs(Now * 1).diff(birth * 1, 'years')
    //
    //   return diff + '歳'
    // }
  },
  methods: {
    approvalButton(val) {
      const ref = this.$firestore
        .collection('users')
        .doc(this.talent.info.userid)

      const status = val

      if (val === 2) {
        this.$toast.success('再提出にしました')
      } else {
        this.$toast.success('承認されました')
      }

      ref.update({
        authStatus: status,
      })
      this.deletestore()
      // this.pushNotification(val)
    },
    // async pushNotification(val) {
    //   var user = this.talent
    //   var userAuthKey = this.talent.info.signalId
    //   var approvalState = val
    //   var isTalent = this.talent.info.talent
    //   var sentat = Number(this.$dayjs().format('X'))
    //
    //   var approvalNotification = this.$firefunctions.httpsCallable('approvalNotification');
    //   await approvalNotification({userAuthKey: userAuthKey, approvalState: approvalState, isTalent: isTalent, user: user, sentat: sentat}).then(await function(result) {
    //     console.log('完了')
    //   }).catch(function(error) {
    //     console.log(error)
    //   });
    // },
    deletestore() {
      const aptalent = this.talent
      this.$store.commit('talent/apTalent', { aptalent })
    },
    openModal() {
      this.modal = true
    },
    closeModal() {
      this.modal = false
    },
    reload() {
      this.$router.go({ path: this.$router.currentRoute.path, force: true })
    },
  },
  filters: {
    truncate(value, length, omission) {
      if (!value) {
        value = '未記入'
        return value
      }
      length = length ? parseInt(length, 10) : 20
      omission = omission ? omission.toString() : '...'

      if (value.length <= length) {
        return value
      }

      return value.substring(0, length) + omission
    },
  },
}
</script>

<style>
/* .approval-contents-box {
  width: 200px;
  height: 400px;
  flex: 0 0 25%;
  margin: 2px 0px 2px 40px;
}

.box-top-contents {
  width: 90%;
  margin: 10px auto;
}

.box-top-contents img {
  height: 40px;
  width: 40px;
  border-radius: 20px;
}

.box-top-contents p {
  line-height: 40px;
  margin-left: 10px;
}

.box-middle-contents {
  height: 50%;
}

.approval-image {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.approval-image img {
  width: 90%;
  height: 90%;
}

.approval-info {
  width: 45%;
  height: 90%;
  margin: auto;
}

.approval-info p {
  font-size: 14px;
  margin-bottom: 20px;
}

.box-bottom-contents {
  height: 35%;
}

.approval-info-bottom {
  width: 90%;
  margin: 0 auto;
}

.approval-info-bottom p {
  font-size: 14px;
  margin-bottom: 20px;
}

.approval-button {
  text-align: center;
}

.canselbutton {
  margin: 5px 0 0 auto;
  background-color: #FFF;
  box-shadow: none;
  width: 45px;
  height: 30px;
}

.cansel {
  width: 25px;
  height: 25px;
}

.icon {
  height: 50px;
  width: 50px;
  border-radius: 25px;
}

.m-box-top-contents p {
  line-height: 50px;
  margin-left: 15px;
  font-size: 18px;
}

.detail-info p {
  font-size: 17px;
  margin-bottom: 30px;
}

.m-middle {
  margin-bottom: 80px;
}

.m-approval-image {
  width: 50%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.m-approval-image img {
  width: 90%;
  height: 90%;
}

.m-approval-image p {
  margin-bottom: 30px;
  margin-top: 18px;
}

.app-b {
  margin-left: 10px;
} */
</style>
