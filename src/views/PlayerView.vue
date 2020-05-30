<template>
    <div>
        <player :name ="$route.params.name"/>
    </div>
</template>

<script>

import player from "@/components/Player.vue"
export default {
    components:{
        player
    }
}
</script>