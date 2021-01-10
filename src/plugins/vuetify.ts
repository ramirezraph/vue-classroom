import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import i18n from '@/i18n'
import '@/sass/overrides.sass'

Vue.use(Vuetify)

const theme = {
  primary: '#B71C1C',
  secondary: '#E53935',
  accent: '#9C27b0',
  info: '#00CAE3',
  lightRed: '#FF8A80',
}

export default new Vuetify({
  theme: {
    themes: {
      dark: theme,
      light: theme,
    },
  },
  breakpoint: {
    thresholds: {
      xs: 500,
      sm: 1280,
      md: 1440,
      lg: 1680,
    },
    scrollBarWidth: 24,
  },
})
