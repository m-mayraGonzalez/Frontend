import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    usuario:null,
    rol:""
  },
  mutations: {
    setToken(state,token){
      state.token=token
    },
    setUsuario(state,usuario){
      state.usuario=usuario
    },
    setRol(state,value){
      state.rol=value;
    }
    
  },
  actions: {
    setToken(context,data){
      context.commit('setToken',data.token)
      context.commit('setUsuario',data.usuario)
    },
    setRol(context,data){
      context.commit('setRol', data.value);
    }
   
   
  },
  modules: {
  },
  getters:{
    header(state){
      return {headers:{"token":state.token}}
    }
  }
})
