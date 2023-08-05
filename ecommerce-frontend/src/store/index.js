import Vue from 'vue'
import Vuex from 'vuex'
import decode from 'jwt-decode'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "",
    userResposne: "",
    cadetsOperation: "",
    editableCadet: "",
    resetPasswordState: "",
    productsOperation: "",
    editableProduct: "",
    dataSource: "",
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

    // Cadets
    getCadetsOperation(state, cadetsOperation) {
      state.cadetsOperation = cadetsOperation;
    },

    getCadet(state, editableCadet) {
      state.editableCadet = editableCadet;
    },

    // Products
    getProductsOperation(state, productsOperation) {
      state.productsOperation = productsOperation;
    },

    getProduct(state, editableProduct) {
      state.editableProduct = editableProduct;
    },

    getDataSource(state, dataSource) {
      console.log(dataSource);
      state.dataSource = dataSource;
    },

    // Register
    getResetPasswordState(state, resetPasswordState) {
      state.resetPasswordState = resetPasswordState;
    }
  },

  actions: {
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

    // Cadets
    setCadetsOperation({ commit }, cadetsOperation) {
      commit("getCadetsOperation", cadetsOperation);
    },

    setCadet({ commit }, editableCadet) {
      commit("getCadet", editableCadet);
    },

    // Products
    setProductsOperation({ commit }, productsOperation) {
      commit("getProductsOperation", productsOperation);
    },

    setProduct({ commit }, editableProduct) {
      commit("getProduct", editableProduct);
    },

    setDataSource({ commit }, dataSource) {
      commit("getDataSource", dataSource);
    },

    // Register
    setResetPasswordState({ commit }, resetPasswordState) {
      console.log("llego: " + resetPasswordState);
      commit("getResetPasswordState", resetPasswordState);
    }
  },

  getters: {
    isActive: state => !!state.token
  },

  modules: {
  }
})