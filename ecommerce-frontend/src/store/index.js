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
    orderId: localStorage.getItem("orderId"),
    orderItems: parseInt(localStorage.getItem('orderItems')) || 0,
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

    // Orders
    setOrderItems(state, value) {
      console.log("valor que llega al setOrderItems: " + value)
      state.orderItems = value;
      localStorage.setItem('orderItems', value);
    },

    removeOrderItem(state, value) {
      console.log("valor que llega al removeOrderItems: " + value)
      state.orderItems = value;
      localStorage.setItem('orderItems', value - 1);
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

    // Orders
    setOrderItems(state, orderItems) {
      state = orderItems;
      localStorage.setItem("orderItems", orderItems);
    },

    removeOrderItem({ commit }, value) {
      console.log("valor que llega al removeOrderItem: " + value)
      commit('removeOrderItem', value);
    },


    updateOrderItems({ commit }, value) {
      console.log("valor que llega al updateOrderItems: " + value)
      commit('setOrderItems', value);
    },

    // Register
    setResetPasswordState({ commit }, resetPasswordState) {
      commit("getResetPasswordState", resetPasswordState);
    },

    // Custom functions
    convertToJSON(context, object) {
      return object !== null ? JSON.stringify(object) : null;
    },

    convertToNull(context, object) {
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          object[key] = null;
        }
      }
    }
  },

  getters: {
    isActive: state => !!state.token,

    getProductsOperation: state => state.productsOperation,

    getCategoriesOperation: state => state.categoriesOperation,

    getCustomersOperation: state => state.customersOperation,

    getOrderId: state => state.orderId,

    getOrderItems: state => state.orderItems,
  },

  modules: { }
})