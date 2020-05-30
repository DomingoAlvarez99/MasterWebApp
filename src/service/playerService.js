import { axiosInstance } from './api'

export default {
  async retrievePlayersByRank (rankName) {
    const response = await axiosInstance.get('/players/getByRankName/' + rankName)
    return response.data
  },
  async retrievePlayerByName (name) {
    var response = {}
    try {
      response = await await axiosInstance.get('/player/getByName/' + name)
    } catch (e) {
      response = e
    }
    return response.data
  },
  async retrievePlayersOnlineNumber () {
    var response = []
    try {
      response = await await axiosInstance.get('/players/getByOnline/true')
    } catch (e) {
      response = []
    }
    return response.data
  }
}



