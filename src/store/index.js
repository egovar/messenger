import Vue from "vue";
import Vuex from "vuex";
import { messengerModule } from "@/store/messenger/messenger";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    userName: "petya",
  },
  getters: {
    userName: ({ userName }) => userName,
  },
  modules: {
    messenger: messengerModule,
  },
});
