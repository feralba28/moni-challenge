import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.moni.com.ar/api/v4',
  headers: {
    credential: 'ZGpzOTAzaWZuc2Zpb25kZnNubm5u',
  },
})
