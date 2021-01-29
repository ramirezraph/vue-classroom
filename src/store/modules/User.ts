import { User } from "@/model/User";

export default {
  namespaced: true,
  state: {
    currentUser: new User(
      'u65UaYYgNGccqlsFUVGC',
      'Raphael',
      'Legaspi',
      'Ramirez',
      'ramirez.raph@yahoo.com',
    ),
  },
  getters: {
    getCurrentUser (state): User {
      return state.currentUser
    }
  },
  mutations: {
    SET_CURRENT_USER (state, payload: User) {
      state.currentUser = payload
    }
  },
  action: {
    // set user once logged in
  },
}
