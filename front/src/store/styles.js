import gql from 'graphql-tag'

const state = {
  styles: [],
}

const mutations = {
  SET_STYLES(state, styles) {
    state.styles = styles
  },
}

const actions = {
  async initStyles(store) {
    const res = await window.apollo.query({
      query: gql`
        query {
          styles {
            id
            name
            slug
          }
        }
      `
    }).catch(error => {
      console.log('%c●', 'color: red', 'loadStyle: ', error)
    })
    store.commit('SET_STYLES', res.data.styles)
  },
}

const getters = {
  styles(state) {
    return state.styles
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
