import Vue from 'vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import upperFirst from 'lodash/upperFirst'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  '@/components/base', true, /\.vue$/,
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')),
  )

  Vue.component(`Base${componentName}`, componentConfig.default || componentConfig)
})
