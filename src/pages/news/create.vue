<template>
  <div class="">
    <div v-show="loading" class="loader center-loader"></div>
    <menu-head v-show="!loading" v-bind:title="'ニュース作成'">
      <div class="home-container">
        <div class="news-contents main-contents">
          <div class="news-title">
            <h2>ニュース公開日</h2>
            <div class="flex select-form">
              <select class="" v-model="year">
                <option value="2019">2019</option>
                <option value="2020">2020</option>
              </select>
              <p>年</p>
              <select class="" v-model="month">
                <option v-for="n in 12" v-bind:key="n" :value="n">
                  {{ n }}
                </option>
              </select>
              <p>月</p>
              <select class="" v-model="day">
                <option v-for="n in 31" v-bind:key="n" :value="n">
                  {{ n }}
                </option>
              </select>
              <p>日</p>
            </div>
          </div>
          <div class="news-title">
            <h2>画像アップロード</h2>
            <img v-show="uploadedImage" :src="uploadedImage" />
            <label for="sample">
              ファイルの選択
              <input
                type="file"
                name=""
                value=""
                id="sample"
                @change="fileButton"
                placeholder="Newsのトップ画像"
              />
            </label>
          </div>
          <div class="news-title">
            <h2>タイトル</h2>
            <input type="text" name="" value="" v-model="title" />
          </div>
          <div class="news-title">
            <h2>リンクURL</h2>
            <input type="text" name="" value="" v-model="linkurl" />
          </div>
          <div class="news-title">
            <h2>本文</h2>
            <textarea name="name" rows="8" cols="80" v-model="contents">
            </textarea>
          </div>
          <div v-show="createloading" class="loader"></div>
          <div v-show="!createloading">
            <div class="news-create-button">
              <button v-on:click="btnSubmit" type="button" name="button">
                作成
              </button>
            </div>
          </div>
        </div>
      </div>
    </menu-head>
  </div>
</template>

<script>
import MenuHead from '~/components/MenuHead'

export default {
  components: {
    MenuHead,
  },
  data() {
    return {
      loading: false,
      createloading: false,
      uploadedImage: '',
      year: '',
      month: '',
      day: '',
      title: '',
      contents: '',
      linkurl: '',
    }
  },
  created() {},
  mounted() {
    this.loading = false
  },
  methods: {
    fileButton(e) {
      e.preventDefault()
      const files = e.target.files
      this.$filesname = files[0].name
      this.createImage(files[0])
      this.$blob = new Blob(files, { type: 'image/png' })
    },
    createImage(file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.uploadedImage = e.target.result
      }
      reader.readAsDataURL(file)
    },
    btnSubmit(e) {
      if (
        (!this.$filesname,
        !this.year,
        !this.month,
        !this.day,
        !this.title,
        !this.contents)
      ) {
        // alert("入力されていない欄があります。")
        this.$toast.error('入力されていない欄があります。')
        return
      }

      this.createloading = true

      const refupload = this.$firestorage.ref('news/').child(this.$filesname)

      const uploadref = this.$firestore.collection('news')

      const releasedat = this.year + '-' + this.month + '-' + this.day

      const releasedTime = Number(this.$dayjs(releasedat).format('X'))

      const createdime = Number(this.$dayjs().format('X'))

      refupload
        .put(this.$blob)
        .then((snapshot) => {
          snapshot.ref
            .getDownloadURL()
            .then((url) => {
              uploadref
                .add({
                  imageUrl: url,
                  content: this.contents,
                  title: this.title,
                  createdAt: createdime,
                  releasedAt: releasedTime,
                  linkUrl: this.linkurl,
                })
                .then((doc) => {
                  uploadref.doc(doc.id).update({
                    nid: doc.id,
                  })
                })

              this.createloading = false
              this.$toast.success('作成が完了しました')

              this.contents = ''
              this.title = ''
              this.year = ''
              this.month = ''
              this.day = ''
              this.uploadedImage = ''
              this.linkurl = ''
            })
            .catch((error) => {
              console.log(error)
              this.createloading = false
              this.$toast.error('データの保存に失敗しました')
            })
        })
        .catch((error) => {
          console.log(error)
          this.createloading = false
          this.$toast.error('画像アップロードができませんでした。')
        })
    },
  },
}
</script>

<style>
.news-title {
  margin-bottom: 70px;
}

.news-title input {
  height: 40px;
  width: 100%;
}

.news-title textarea {
  /* height: 40px; */
  width: 100%;
}

.news-title label {
  cursor: pointer;
  margin: 0 10px 0 0;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 15px;
  line-height: 51px;
}

.news-title label input {
  display: none;
}

.news-title img {
  width: 200px;
  margin-right: 10px;
}

.news-create-button {
  text-align: center;
}

.select-form p {
  line-height: 40px;
  margin-right: 20px;
}
</style>
