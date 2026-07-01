import { createStore } from 'vuex';
import { loginRequest, registerRequest, logoutRequest, getProductsRequest, addToCartRequest, getCartRequest, removeFromCartRequest  } from "@/utils/api";

export default createStore({
  state: {
    token: localStorage.getItem('myAppToken') || '',
      products: [],
      cart: [],
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    products: (state) => state.products,
    cart: (state) => state.cart,
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
      SET_CART(state, cart) {
          state.cart = cart;
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
      ADD_TO_CART: ({ state }, productId) => {
          return addToCartRequest(state.token, productId);
      },
      GET_CART: ({ commit, state }) => {
          return getCartRequest(state.token)
              .then(cart => {
                  commit("SET_CART", cart);
              });
      },
      REMOVE_FROM_CART: ({ state }, id) => {
          return removeFromCartRequest(state.token, id);
      },
  },
  modules: {
  }
})
