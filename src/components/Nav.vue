<template>
    <div id="nav">
        <b-navbar class="nav" toggleable="sm">
            <b-navbar-brand>
                <img src="@/assets/img/MasterLogo.png" id="nav-logo" alt="logo">
            </b-navbar-brand> 
            <b-navbar-toggle v-model="expanded" @click="expanded = !expanded" target="nav-collapse">
                <i class="light_gray-font fas fa-angle-up" v-if="expanded"></i>
                <i class="light_gray-font fas fa-angle-down" v-else></i>
            </b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="navbar-container ml-auto text-center">
                    <div class="d-flex align-items-center flag-container">
                        <img class="flag" :src="getFlag">
                        <b-form-select class="flag-select"  v-model="$root.$i18n.locale" :options="options"></b-form-select>
                    </div>
                    <b-nav-item :to="{name: 'home'}" exact>{{ $t('home') }}</b-nav-item>
                    <b-nav-item :to="{name: 'players'}">{{ $t('players') }}</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default{
    data(){
        return{
            currentId: null,
            expanded: false,
            langs: ['en', 'es'],
            options: [
                { value: 'en', text: 'en' },
                { value: 'es', text: 'es' },
            ]
        }
    },
    computed: {
        getFlag(){
            return  require(`../assets/img/flags/${this.$root.$i18n.locale}.svg`)
        }
    },
    mounted() {
        this.setCurrentId()
    },
    methods: {
        setCurrentId() {
            this.currentId = this.$store.state.id
        },
        logout(){
            localStorage.removeItem('id')
            this.$store.commit('setStore')
            this.currentId = this.$store.state.id
        }
    }
}
</script>

<style scoped>
    .flag {
        width: 30px;
        height: 20px;
    }
</style>

<i18n>
{
  "en": {
    "home": "Home",
    "players": "Players",
    "dashboard": "Dashboard",
    "logout": "Logout",
    "login": "Login"
  },
  "es": {
    "home": "Inicio",
    "players": "Jugadores",
    "dashboard": "Tablero",
    "logout": "Cerrar sesión",
    "login": "Iniciar sesión"
  }
}
</i18n>