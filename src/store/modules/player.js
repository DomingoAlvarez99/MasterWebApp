import playerService from "../../service/playerService";

const state = () => ({
    players: [],
    player: {},
    playersOnline : 0
})

const getters = {
    getPlayers (state) {
        return state.players
    },
    getPlayer (state) {
        return state.player
    },
    getPlayersOnline (state) {
        return state.playersOnline
    }
}

const actions = {
    async retrievePlayersByRank({ commit }, name) {
        const players = await playerService.retrievePlayersByRank(name)
        commit('setPlayers', players)
    },
    async retrievePlayerByName({ commit }, name) {
        const player = await playerService.retrievePlayerByName(name)
        commit('setPlayer', player)
    },
    async retrievePlayersOnlineNumber({ commit }) {
        const player = await playerService.retrievePlayersOnlineNumber()
        var playersOnline = 0
        if (typeof player === 'undefined') {
            playersOnline = 0
        } else {
            playersOnline = player.length
        }
        commit('setPlayersOnline', playersOnline)
    }
}

const mutations = {
    setPlayers (state, players) {
        state.players = players
    },
    setPlayer (state, player) {
        state.player = player
    },
    setPlayersOnline (state, playersOnline) {
        state.playersOnline = playersOnline
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

