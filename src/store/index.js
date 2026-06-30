import { createStore } from 'vuex';
import { loginRequest, registerRequest, logoutRequest, getProductsRequest } from "@/utils/api";

export default createStore({
  state: {
    token: localStorage.getItem('myAppToken') || '',
      products: [],
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
      products: (state) => state.products,
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
      SET_PRODUCTS(state, products) {
          state.products = products;
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
      GET_PRODUCTS: ({ commit, state }) => {
          return getProductsRequest(state.token)
              .then((products) => {
                  commit("SET_PRODUCTS", products);
              });
      },
  },
  modules: {
  }
})
