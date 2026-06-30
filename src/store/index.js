import { createStore } from 'vuex';
import { loginRequest, registerRequest, logoutRequest } from "@/utils/api";

export default createStore({
  state: {
    token: localStorage.getItem('myAppToken') || '',
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  mutations: {
    AUTH_SUCCESS: (state, token) => {
      state.token = token;
    },
    AUTH_ERROR: (state) => {
      state.token = '';
    },
      LOGOUT(state) {
          state.token = "";
      },
  },
  actions: {
    AUTH_REQUEST: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        loginRequest(user)
            .then((token) => {
              commit('AUTH_SUCCESS', token);
              localStorage.setItem('myAppToken', token);
              resolve();
            })
            .catch(() => {
              commit('AUTH_ERROR');
              localStorage.removeItem('myAppToken');
              reject();
            })
      })
    },
    REGISTER_REQUEST: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        registerRequest(user)
            .then((token) => {
              commit("AUTH_SUCCESS", token);
              localStorage.setItem("myAppToken", token);
              resolve();
            })
            .catch((error) => {
              commit("AUTH_ERROR");
              localStorage.removeItem("myAppToken");
              reject(error);
            });
      });
    },
      LOGOUT: ({ commit, state }) => {
          return logoutRequest(state.token)
              .then(() => {
                  commit("LOGOUT");
                  localStorage.removeItem("myAppToken");
              })
              .catch((error) => {
                  console.error(error);
                  commit("LOGOUT");
                  localStorage.removeItem("myAppToken");
              });
      },
  },
  modules: {
  }
})
