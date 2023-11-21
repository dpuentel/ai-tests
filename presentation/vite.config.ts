import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  const env = loadEnv(
    'mock',
    process.cwd(),
    ''
  )
  const processEnvValues = {
    'process.env': Object.entries(env).reduce(
      (prev, [key, val]) => {
        return {
          ...prev,
          [key]: val
        }
      },
      {}
    )
  }

  return {
    server: {
      port: parseInt(processEnvValues['process.env'].PRESENTATION_PORT || '5174')
    }
  }
})
