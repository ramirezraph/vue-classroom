"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var vuex_1 = require("vuex");
var Classes_1 = require("@/store/modules/Classes");
vue_1["default"].use(vuex_1["default"]);
exports["default"] = new vuex_1["default"].Store({
    modules: {
        classes: Classes_1["default"]
    },
    state: {
        barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
        barImage: 'https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-1.jpg',
        drawer: null
    },
    getters: {
        drawer: function (state) {
            return state.drawer;
        }
    },
    mutations: {
        SET_BAR_IMAGE: function (state, payload) {
            state.barImage = payload;
        },
        SET_DRAWER: function (state, payload) {
            state.drawer = payload;
        },
        SET_SCRIM: function (state, payload) {
            state.barColor = payload;
        }
    },
    actions: {}
});
