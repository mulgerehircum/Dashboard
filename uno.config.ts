import { defineConfig, presetWind, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetWind(),      
    presetIcons({      
      scale: 1.2,      
      extraProperties: {
        'display': 'inline-block',   
        'vertical-align': 'middle',
      },
    }),
  ],
  theme: {
    colors: {
      'primary-blue-4': '#8a6a50', 
      'primary-light': '#f7f2e8',
      'state-success': '#76ca66',
      'state-error': '#ba0000',
      'state-warning': '#fbc756'
    },
  },
})