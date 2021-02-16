import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import '@/sass/overrides.sass'

Vue.use(Vuetify)

const theme = {
  primary: '#2C5F2D',
  secondary: '#B3CC8D',
  accent: '#5B785C',
  info: '#078282',
  primaryBlack: '#2F2F2B',
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
