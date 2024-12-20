const config = {
  development: {
    baseURL: 'http://localhost:3000/api'
  },
  production: {
    baseURL: 'https://api.example.com'
  }
}

export default config[import.meta.env.MODE || 'development'] 