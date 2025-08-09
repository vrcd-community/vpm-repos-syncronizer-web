// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
      name: 'app/disable-no-multiple-template-root',
      files: ['**/*.vue'],
      rules: {
          'vue/no-multiple-template-root': 'off',
      },
  },
)
