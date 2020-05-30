<template>
    <div id="socials-nav">
        <b-navbar class="socials-nav">
            <b-navbar-brand class="players-online pl-1">{{ $t('online') }}: {{playersOnline}}</b-navbar-brand>
            <b-navbar-nav class="socials-navbar-container ml-auto text-center">
                <b-nav-item class="pr-1" target="_blank" href="https://discord.gg/b3mQv9F"><span><i class="white-font fab fa-discord"></i></span></b-nav-item>
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                playersOnline: 0
            }
        },
        mounted() {
            this.getPlayersOnline()
        },
        methods: {
            async getPlayersOnline(){
                await this.$store.dispatch('player/retrievePlayersOnlineNumber')
                this.playersOnline = await this.$store.getters['player/getPlayersOnline']
            }
        },
        name: 'socials'
    }
</script>

<i18n>
{
  "en": {
    "online": "Players online"
  },
  "es": {
    "online": "Jugadores en línea"
  }
}
</i18n>