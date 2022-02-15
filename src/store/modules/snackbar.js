const state = {
  content: '',
  color: '',
  timeout: 5000
}

const mutations = {
  showMessage(state, payload) {
    state.content = payload.content;
    state.color = payload.color;
    if (payload.timeout) {
      state.timeout = payload.timeout;
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations
}