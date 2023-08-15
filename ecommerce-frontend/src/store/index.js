import Vue from 'vue'
import Vuex from 'vuex'
import decode from 'jwt-decode'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "",
    userResponse: "",
    resetPasswordState: "",
    productsOperation: localStorage.getItem("productsOperation") || "",
    categoriesOperation: localStorage.getItem("categoriesOperation") || "",
    customersOperation: localStorage.getItem("customersOperation") || "",
  },

  mutations: {
    // User
    getUser(state, token) {
      state.token = token;

      if (token === "") {
        state.userResponse = "";
      } else {
        state.userResponse = decode(token);
        //router.push({ name: "Notas" });
      }
    },

    // Register
    getResetPasswordState(state, resetPasswordState) {
      state.resetPasswordState = resetPasswordState;
    },
  },

  actions: {
    setProductsOperation(state, productsOperation) {
      state = productsOperation;
      //localStorage.setItem("productsOperation", JSON.stringify(productsOperation));
      localStorage.setItem("productsOperation", productsOperation);
    },

    setCategoriesOperation(state, categoriesOperation) {
      state = categoriesOperation;
      localStorage.setItem("categoriesOperation", categoriesOperation);
    },

    setCustomersOperation(state, customersOperation) {
      state = customersOperation;
      localStorage.setItem("customersOperation", customersOperation);
    },

    // Users
    setUser({ commit }, token){
      localStorage.setItem("token", token);
      commit("getUser", token);
    },

    logOut({ commit }) {
      commit("getUser", "");
      localStorage.removeItem("token");
      router.push({ name: "Login" });
    },

    getToken({ commit }) {
      const token = localStorage.getItem("token");
      
      if (token) {
        commit("getUser", token);
      } else {
        commit("getUser", "");
      }
    },

    // Register
    setResetPasswordState({ commit }, resetPasswordState) {
      commit("getResetPasswordState", resetPasswordState);
    }
  },

  getters: {
    isActive: state => !!state.token,

    getProductsOperation: state => state.productsOperation,

    getCategoriesOperation: state => state.categoriesOperation,

    getCustomersOperation: state => state.customersOperation
  },

  modules: { }
})