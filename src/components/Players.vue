<template>
    <div id="players">
        <b-overlay no-wrap :show="showOverlay" rounded="sm"></b-overlay>
        <div class="players-header mt-3">
            <b-container>
                <div class="container">
                    <b-row>
                        <b-col class="pl-1 pr-1 mx-auto">
                            <img class="img-fluid" src="https://crafatar.com/renders/body/6cd90ad8b04e4fa583593ac763193cfc">
                        </b-col>
                        <b-col class="pl-1 pr-1 mx-auto">
                            <img class="img-fluid" src="https://crafatar.com/renders/body/6cd90ad8b04e4fa583593ac763193cfc">
                        </b-col>
                        <b-col class="pl-1 pr-1 mx-auto">
                            <img class="img-fluid" src="https://crafatar.com/renders/body/6cd90ad8b04e4fa583593ac763193cfc">
                        </b-col>
                        <b-col class="pl-1 pr-1 mx-auto">
                            <img class="img-fluid rotate-skin" src="https://crafatar.com/renders/body/6cd90ad8b04e4fa583593ac763193cfc">
                        </b-col>
                        <b-col class="pl-1 pr-1 mx-auto">
                            <img class="img-fluid rotate-skin" src="https://crafatar.com/renders/body/6cd90ad8b04e4fa583593ac763193cfc">
                        </b-col>
                        <b-col class="pl-1 pr-1 mx-auto">
                            <img class="img-fluid rotate-skin" src="https://crafatar.com/renders/body/6cd90ad8b04e4fa583593ac763193cfc">
                        </b-col>
                    </b-row>
                </div>
                <b-row class="search-player">
                    <b-col class="input-group">
                        <b-form-input size="xl" @keyup.capture="setState(null)" @keyup.enter="navigate" v-model="search" class="mr-sm-2" :state="playerFound" :placeholder="$t('searchPlayer')"></b-form-input>
                        <b-button size="xl"  @click="navigate" type="submit"><i class="fas fa-search" aria-hidden="true"></i></b-button>
                        <b-form-invalid-feedback  class="search-player-error" id="input-live-feedback">{{ $t('playerNotFound') }}</b-form-invalid-feedback>
                    </b-col>
                </b-row>
                <b-row class="align-items-center m-2">
                    <span><i class="staff-icon fa fa-users fa-3x" aria-hidden="true"></i></span><p class="staff m-0 ml-2">{{ $t('staff') }}</p>
                </b-row>
                <div v-if="owners.length > 0">
                    <b-row class="m-0">
                        <b-col class="admin-rank-section block mb-3 p-1 pl-3">
                            <span class="rank-header white-font">{{ $t('owners') }}</span>
                            <b-button class="collapse-button float-right p-0"></b-button>
                        </b-col>
                    </b-row>
                    <b-collapse visible id="collapse-1">
                        <b-row class="text-center">
                            <b-col v-for="player in owners" :key="player.id" cols="4" sm="3" md="2" lg="2">
                                <img :src="getRenderPath(player.uuid)" class="img-fluid"  alt="Player head">
                                <p class="player-name">{{player.name}}</p>
                            </b-col>
                        </b-row>
                    </b-collapse>
                </div>
            </b-container>
        </div>
    </div>
</template>

<script>
    import config from '@/config.js'
    export default {
        data(){
            return {
                owners: [],
                members: [],
                search: '',
                playerFound: null,
                errorMessage: '',
                showOverlay: true
            }
        },
        mounted() {
            this.getOwners()
        },
        methods: {
            async getOwners(){
                console.log('entra')
                await this.$store.dispatch('player/retrievePlayersByRank', 'owner')
                this.owners = await this.$store.getters['player/getPlayers']
                this.showOverlay = !this.showOverlay
                console.log(this.owners)
            },
            getRenderPath(uuid){
                return config.HEAD_RENDER + uuid
            },
            async getPlayerByName(){
                await this.$store.dispatch('player/retrievePlayerByName', this.search)
            },
            async navigate(){
                if(this.search.length > 0){
                    await this.getPlayerByName()
                    const playerFound = await this.$store.getters['player/getPlayer']
                    if (typeof playerFound === 'undefined') {
                        this.playerFound = false
                    } else if(playerFound.id > 0){
                            this.playerFound = null
                            this.$router.push({ name: 'player', params: { name: this.search } })
                    }else{
                            this.playerFound = false
                    }
                }else{
                    this.playerFound = false
                }
            },
            setState(state){
                if(!this.playerFound){
                    this.playerFound = state
                }
            }
        }, 
        name: 'players'
    }
</script>

<i18n>
{
  "en": {
    "staff": "Staff",
    "owners": "Owners",
    "playerNotFound": "Player not found",
    "searchPlayer": "Search for a player"
  },
  "es": {
    "staff": "Personal",
    "owners": "Dueños",
    "playerNotFound": "Jugador no encontrado",
    "searchPlayer": "Busca a un jugador"
  }
}
</i18n>