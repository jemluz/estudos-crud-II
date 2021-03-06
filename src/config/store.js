import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isfuncionario: true,
    user: {
      nome: "Meu nome",
      login: "meu login"
    },
    produtoId: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      if(user) {
        axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
      } else {
        delete axios.defaults.headers.common['Authorization']  
      }
    },
    setProdutoId(state, produtoId) {
      state.produtoId = produtoId
    }
  }
}) 
