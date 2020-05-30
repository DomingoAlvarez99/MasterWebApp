<template>
    <div id="player">
        <b-overlay no-wrap :show="showOverlay" rounded="sm"></b-overlay>
        <b-container>
            <div v-if="this.player.id > 0" class="player-found">
                <b-row class="mt-3">
                    <b-col xl="3" class="mb-2">
                        <b-card class="player-profile">
                            <div class="header">
                                <div v-if="nameColorClass == 'rainbow-font' && rankColorClass == 'rainbow-font'" class="player-header text-center p-2" :class="nameColorClass">
                                    <span class="text-center" :class="rankColorClass">[{{rank.name}}]</span>
                                    <span class="text-center" :class="nameColorClass">{{player.name}}</span>
                                </div>
                                <div v-else class="player-header text-center p-2">
                                    <span class="text-center" :class="rankColorClass">[{{rank.name}}]</span>
                                    <span class="text-center" :class="nameColorClass">{{player.name}}</span>
                                </div>
                            </div>
                            <div class="skin-container">
                                <img class="img-fluid mx-auto d-block pt-3 pb-3" :src="bodyRenderPath">
                            </div>
                        </b-card>
                    </b-col>
                    <b-col xl="9">
                        <b-row>
                            <b-col sm="6" md="6" lg="4" xl="4" class="mt-2 mb-3">
                                <b-card class="player-card">
                                    <b-button block class="green-background player-card-header text-center p-2" @click="setVisibility('stats')" aria-controls="collapse-stats">
                                        <span>{{ $t('stats') }}<i class="ml-1 fas fa-calendar-alt"></i></span><span class="float-right"><i :class="getIcon('stats')" aria-hidden="true"></i></span>
                                    </b-button>
                                    <b-collapse v-model="visibleAreas.stats" id="collapse-stats">
                                        <b-row class="ml-0 mr-0" v-for="(value, key, index) in stats" :key="index">
                                            <b-col :class="getRowClass(Object.keys(stats).length,index,'light-green-1-background','light-green-2-background')">
                                                <div class="d-flex justify-content-between p-2">
                                                    <span>{{key}}</span><span>{{value}}</span>
                                                </div>
                                            </b-col>
                                        </b-row>
                                    </b-collapse>
                                </b-card>
                            </b-col>
                            <b-col class="mt-2 mb-3" sm="6" md="6" lg="4" xl="4" v-if="Object.keys(stats).length > 0">
                                <b-card class="player-card">
                                    <b-button block class="yellow-background player-card-header text-center p-2" @click="setVisibility('achievements')" aria-controls="collapse-achievements">
                                        <span>{{ $t('achievements') }}<i class="ml-1 fas fa-trophy"></i></span><span class="float-right"><i :class="getIcon('achievements')" aria-hidden="true"></i></span>
                                    </b-button>
                                    <b-collapse v-model="visibleAreas.achievements" id="collapse-achievements">
                                        <b-row class="ml-0 mr-0" v-for="item in achievements" :key="item.id">
                                            <b-col :class="getRowClass(Object.keys(achievements).length,index,'light-yellow-1-background','light-yellow-2-background')">
                                                <div class="text-center p-2">
                                                    <span>{{item.name.replace('_',' ').toLowerCase()}}</span>
                                                </div>
                                            </b-col>
                                        </b-row>
                                        <b-row v-if="achievements.length == 0" class="ml-0 mr-0">
                                            <b-col :class="getRowClass(1,0,'light-yellow-1-background','light-yellow-2-background')">
                                                <div class="text-center p-2">
                                                    <span>The player has no achievements</span>
                                                </div>
                                            </b-col>
                                        </b-row>
                                    </b-collapse>
                                </b-card>
                            </b-col>
                            <b-col class="mt-2 mb-3" sm="6" md="6" lg="4" xl="4" v-if="Object.keys(stats).length > 0">
                                <b-card class="player-card">
                                    <b-button block class="gray-background player-card-header text-center p-2" @click="setVisibility('punishments')" aria-controls="collapse-punishments">
                                        <span>{{ $t('punishments') }}<i class="ml-1 fas fa-exclamation"></i></span><span class="float-right"><i :class="getIcon('punishments')" aria-hidden="true"></i></span>
                                    </b-button>
                                    <b-collapse v-model="visibleAreas.punishments" id="collapse-punishments">
                                        <b-row class="ml-0 mr-0" v-for="item in punishments" :key="item.id">
                                            <b-col :class="getRowClass(Object.keys(punishments).length,index,'light-gray-1-background','light-gray-2-background')">
                                                <div class="d-flex justify-content-between p-2">
                                                    <span>{{item.type}}</span><span>{{item.date.substring(0, this.player.firstLogin.length - 9)}}</span>
                                                </div>
                                            </b-col>
                                        </b-row>
                                        <b-row v-if="punishments.length == 0" class="ml-0 mr-0">
                                            <b-col :class="getRowClass(1,0,'light-gray-1-background','light-gray-2-background')">
                                                <div class="text-center p-2">
                                                    <span>The player has no punishments</span>
                                                </div>
                                            </b-col>
                                        </b-row>
                                    </b-collapse>
                                </b-card>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </div>
            <div v-if="this.player.id == 0">
                <h2>Player not found</h2>
            </div>
        </b-container>
    </div>
</template>

<script>
    import config from '@/config.js'

    export default {
        data(){
            return {
                player: {},
                rank: {},
                stats: {},
                achievements: [],
                punishments: [],
                bodyRenderPath: '',
                visibleAreas: {stats: true, achievements: true, punishments: true},
                showOverlay: true,
                nameColorClass: 'font-white',
                rankColorClass: 'font-white'
            }
        }, mounted(){
            this.getPlayerData()
        }, methods: {
            async getPlayerData(){
                await this.$store.dispatch('player/retrievePlayerByName', this.name)
                this.player = await this.$store.getters['player/getPlayer']
                this.rank = this.player.rank
                this.bodyRenderPath = config.BODY_RENDER + this.player.uuid + '?scale=8'
                this.getColorClass()
                this.setStats()
                this.achievements = this.player.achievements
                this.punishments = this.player.punishments
                this.showOverlay = !this.showOverlay
            },
            setStats() {
                var stats = {}
                stats['first login'] = this.player.firstLogin.substring(0, this.player.firstLogin.length - 9)
                stats['last login'] = stats['first login']
                stats['kills'] = this.player.assasins.length
                stats['deaths'] = this.player.murdereds.length
                stats['time played'] = this.player.timePlayed
                this.stats = stats
            },
            getRowClass(size,index,color1,color2){
                var rowClass = ''
                var colorClass = ''
                if(index % 2 == 1){
                    colorClass = color1
                    rowClass = 'pair';
                    if(size - 1 == index){
                        rowClass += ' last-row'
                    }
                }else{
                    colorClass = color2
                    rowClass = 'impair';
                    if(size - 1 == index){
                        rowClass += ' last-row'
                    }
                }
                return [rowClass,colorClass]
            },
            setVisibility(area){
                this.visibleAreas[area] = !this.visibleAreas[area]
            },
            getIcon(area){
                return this.visibleAreas[area] ? 'fas fa-minus' : 'fas fa-plus'
            },
            getColorClass(){
                for (const value of config.COLORS){
                    if(value.code == this.player.nameColor){
                        this.nameColorClass = value.color.toLowerCase() + '-font'
                    }
                    if(value.code == this.player.prefixColor){
                        this.rankColorClass = value.color.toLowerCase() + '-font'
                    }
                }
                if(this.player.nameColor == 'rainbow'){
                    this.nameColorClass = 'rainbow-font'
                }
                if(this.player.prefixColor == 'rainbow'){
                    this.rankColorClass = 'rainbow-font'
                }
            }
        },
        name: 'player',
        props: {
            name: String,
        }
    }
</script>

<i18n>
{
  "en": {
    "stats": "Statistics",
    "achievements": "Achievements",
    "punishments": "Punishments"
  },
  "es": {
    "stats": "Estadísticas",
    "achievements": "Logros",
    "punishments": "Penalizaciones"
  }
}
</i18n>
