export const strict = false

export const state = () => ({
  fans: [],
  apfans: [],
})

export const getters = {
  fans: (state) => state.fans,
  apfans: (state) => state.apfans,
}

export const mutations = {
  fleshFans(state) {
    if (state.fans) {
      state.fans = []
    }
  },
  addFans(state, { fan }) {
    if (state.fans.find((p) => p.info.userid === fan.info.userid)) {
      return
    }

    state.fans = [...state.fans, fan]
  },
  apFan(state, { apfan }) {
    for (const fan in state.apfans) {
      if (state.apfans[fan].info.userid === apfan.info.userid) {
        state.apfans.splice(fan, 1)
      }
    }
    for (const fan in state.fans) {
      if (state.fans[fan].info.userid === apfan.info.userid) {
        state.fans.splice(fan, 1)
      }
    }
  },
  fleshapFans(state) {
    if (state.apfans) {
      state.apfans = []
    }
  },
  addApfans(state, { apfan }) {
    if (state.apfans.find((p) => p.info.userid === apfan.info.userid)) {
      return
    }

    state.apfans = [...state.apfans, apfan]
  },
}

export const actions = {
  async fetchFans({ commit, state }) {
    try {
      const fans = []
      const fansSnapshot = await this.$firestore
        .collection('users')
        .where('talent', '==', false)
        .get()
      fansSnapshot.forEach((fanSnapshot) => {
        const fan = {}
        const info = fanSnapshot.data()
        fan.info = info
        fans.push(fan)
      })
      fans.forEach((fan) => {
        commit('addFans', { fan })
        if (fan.info.authStatus === 1) {
          const apfan = fan
          commit('addApfans', { apfan })
        }
      })
      return fans
    } catch (e) {
    } finally {
    }
  },
}
