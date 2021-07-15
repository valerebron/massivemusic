import gql from 'graphql-tag'

const state = {
  adminCount: {
    pendingCount: 0,
    invalidCount: 0,
    emptyCount: 0,
    bigSmallCount: 0,
  }
}

const mutations = {
  SET_ADMIN_COUNT(state, count) {
    state.adminCount = count
  }
}

const actions = {
  async getAdminCount(store) {
    let res = await window.apollo.query({
      query: gql`query {
        getAdminCount {
          pendingCount
          invalidCount
          emptyCount
          bigSmallCount
        }
      }`
    }).catch((e) => {
      console.log(e)
    })
    if(res.data.getAdminCount) {
      store.commit('SET_ADMIN_COUNT', res.data.getAdminCount)
    }
  },
}

const getters = {
  getAdminCount: state => state.adminCount,
}

export default {
  state,
  mutations,
  actions,
  getters,
}
