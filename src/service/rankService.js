import { axiosInstance } from './api'

export default {
  async retrievePlayersByRank (rankName) {
    const response = await axiosInstance.get('/rank/getByName', rankName)
    return response.data
  }
}



