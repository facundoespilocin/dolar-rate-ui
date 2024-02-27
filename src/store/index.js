import Vue from 'vue'
import Vuex from 'vuex'
import decode from 'jwt-decode'
import router from '../router'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "",
    tokenJWT: "",
    userData: null,
    resetPasswordState: "",
    productsOperation: localStorage.getItem("productsOperation") || "",
    categoriesOperation: localStorage.getItem("categoriesOperation") || "",
    customersOperation: localStorage.getItem("customersOperation") || "",

    // 
    products: [],
    orderId: localStorage.getItem("orderId") || 0,
    orderItems: 0,
    orderProducts: [],
  },

  mutations: {
    // User
    setJWTToken(state, token) {
      state.token = token;

      if (token === "") {
        state.tokenJWT = "";
      } else {
        state.tokenJWT = decode(token);
        //router.push({ name: "Notas" });
      }
    },

    setUserData(state, userData) {
      state.userData = userData;
      console.log("user seteado en el setUserData del Store: ");
      console.log(userData);
    },

    // Register
    getResetPasswordState(state, resetPasswordState) {
      state.resetPasswordState = resetPasswordState;
    },

    // Orders
    setOrderId(state, orderId) {
      state.orderId = orderId;
      console.log("orderId seteado en el setOrderId del Store: ");
      console.log(orderId);
    },

    setOrderProducts(state, orderProducts) {
      state.orderProducts = orderProducts;
      console.log("productos seteados en el setOrderProducts del Store: ");
      console.log(orderProducts);
    },

    setProducts(state, products) {
      state.products = products;
      console.log("productos seteados en el setProducts del Store: ");
      console.log(products);
    },

    setAddProduct(state, product) {
      state.products = state.products.push(product);
      console.log("nuevo array de productos desde el setAddProduct del Store: ");
      console.log(products);
    },

    setOrderItems(state, itemsCount) {
      console.log("orderItems seteado en el setOrderItems del Store: ");
      console.log(itemsCount);
      state.orderItems = itemsCount;
    },

    setAddOrderItem(state, product) {
      const existingProduct = state.orderProducts.find(p => p.id === product.id);
      
      console.log("productId que llega al setAddOrderItem: " + product.id);
      //state.orderItems = state.orderItems + 1;
      //state.orderProducts.push(product);

      if (existingProduct) {  
        existingProduct.quantity += product.quantity;
        //existingProduct.price += product.price;
      } else {
        state.orderItems = state.orderItems + 1;
        state.orderProducts.push(product);
      }
    },

    setRemoveOrderItem(state, product) {
      state.orderItems = state.orderItems - 1;
      state.orderProducts = state.orderProducts.filter(p => p.id !== product.id);

      if (state.orderItems === 0) {
        localStorage.setItem("orderId", 0);
        state.orderId = 0;
      };
      
      //console.log("orderItems seteado en el setRemoveOrderItem del Store: " + state.orderItems);
    },

    setEmptyCart(state) {
      state.orderItems = 0;
      localStorage.setItem("orderId", 0);
      state.orderId = 0;
      state.orderProducts = [];
    }
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
    setJWTToken({ commit }, token) {
      localStorage.setItem("token", token);
      console.log("token en el setJWTToken: " + token);
      commit("setJWTToken", token);
    },

    // setUserData({commit}, userData) {
    //   commit("setUserData", userData);
    // },

    async getUserData({commit}, tokenJWT) {
      const tokenJWTDecoded = decode(tokenJWT);

      //console.log(tokenJWTDecoded);

      if (tokenJWT !== null && tokenJWT !== "") {
          let resource = "/users/email/" + tokenJWTDecoded['Email'];
          
          await axios.get(resource)
          .then(res => {
              //console.log("res.data del getUserData(): ");
              //console.log(res.data);

              if (res.data) {
                commit('setUserData', res.data);
              }
          })
          .catch(e => {
              console.log("Error en getUserData del Store:  " + e);
              this.showNotification("error", "No fue posible obtener el detalle del Cliente. Error: " + e);
          })
          .finally(e => { })
      }
    },

    logOut({ commit }) {
      //commit("getUser", "");
      localStorage.removeItem("token");
      //router.push({ name: "Login" });
    },

    getToken({ commit }) {
      const token = localStorage.getItem("token");
      
      // if (token) {
      //   commit("getUser", token);
      // } else {
      //   commit("getUser", "");
      // }
    },

    // Orders
    async getOrderDetails({commit}, orderId) {
      if (orderId > 0) {
          let resource = "/orders/" + orderId;
          
          await axios.get(resource)
          .then(res => {
              console.log("res.data del getOrderDetails(): ");
              console.log(res.data);

              if (res.data) {
                commit('setOrderProducts', res.data?.products);
                commit('setOrderItems', res.data?.products?.length);
                commit('setOrderId', res.data?.id);
              }
          })
          .catch(e => {
              console.log("Error en getOrderDetails del Store:  " + e);
              //this.showNotification("error", "No fue posible obtener el detalle del Producto. Error: " + e);
          })
          .finally(e => { })
      } else {
        commit('setOrderItems', 0);
      }
    },

    setAddOrderItem({commit}, product) {
      commit('setAddOrderItem', product);
    },

    setRemoveOrderItem({commit}, product) {
      commit('setRemoveOrderItem', product);
    },

    setEmptyCart({commit}) {
      commit('setEmptyCart');
    },

    setOrderId({commit}, orderId) {
      localStorage.setItem("orderId",  orderId);

      commit('setOrderId', orderId);
    },

    // Products
    async getAllProducts({commit}) {
      let resource = "/products";

      await axios.get(resource)
      .then(res => {
        if (res.data) {
          commit('setProducts', res.data);
        }
      })
      .catch(e => {
          console.log("Error en getAllProducts del Store:  " + e);
          //this.showNotification("error", "No fue posible cargar los Productos. Error: " + e);
      })
      .finally(e => { })
    },

    setAddProduct({commit}, product) {
      console.log("producto en el setAddProduct: ")
      console.log(product)
      commit('setAddProduct', product);
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

    getJWTToken: state => state.tokenJWT,

    getCustomerData: state => state.userData,

    getCustomersOperation: state => state.customersOperation,

    getProductsOperation: state => state.productsOperation,
    
    getCategoriesOperation: state => state.categoriesOperation,
    
    getProducts: state => state.products,
    
    getOrderId: state => state.orderId,

    getOrderItems: state => state.orderItems,

    getOrderProducts: state => state.orderProducts,

    getSubtotal: state => {
      return state.orderProducts.reduce((total, product) => {
        return total + product.price * product.quantity;
      }, 0);
    },

    getTotalQuantity: state => {
      return state.orderProducts.reduce((quantity, product) => {
        return quantity + product.quantity;
      }, 0);
    }
  },

  modules: { }
})