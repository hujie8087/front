//全局用户信息

import { http } from '~/plugins/axios'

const state = () => ({
    _id: '',
    email: '',
    nickname: '',
    token: '',
    avatar: ''
})

const mutations = {
    SET_USER(state, user = {}) {
        state._id = user._id
        state.email = user.email
        state.nickname = user.nickname
        state.avatar = user.avatar
    },
    SET_TOKEN(state, token) {
        state.token = token
    }
}
const actions = {
    // dispatch('user/login触发的')

    login: async({ state, commit }, data) => {
        let ret = await http.post('/user/login', data)
        localStorage.setItem('token', ret.data.token)
        commit('SET_TOKEN', ret.data.token)
        return ret
    },
    detail: async({ state, commit }, data) => {
        let ret = await http.get('/user/info')
        console.log(ret)
        if (ret.code == 1) {
            commit('SET_USER', ret.data)
            return ret
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}