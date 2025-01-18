import type { Config } from 'tailwindcss'

import tailwindTypography from '@tailwindcss/typography'
// @ts-expect-error this plugin didn't have typescript support
import tailwindcssPrimeUi from 'tailwindcss-primeui'

export default <Partial<Config>>{
  plugins: [tailwindTypography, tailwindcssPrimeUi],
}
