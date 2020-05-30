<template>
    <div class="home">
        <b-overlay no-wrap :show="false" rounded="sm"></b-overlay>
        <b-container>
            <b-carousel class="mt-3" id="carousel-1" v-model="slide" :interval="4000" controls indicators background="#ababab" img-width="1024" img-height="480" style="text-shadow: 1px 1px 2px #333;" @sliding-start="onSlideStart" @sliding-end="onSlideEnd">
            <b-carousel-slide caption="idk" text="" img-src="@/assets/img/home/slide1.png"></b-carousel-slide>
            <b-carousel-slide caption="idk" text="" img-src="@/assets/img/home/slide2.png"></b-carousel-slide>
            <b-carousel-slide img-src="@/assets/img/home/slide3.png"></b-carousel-slide>
            <b-carousel-slide caption="idk" text="" img-src="@/assets/img/home/slide4.png"></b-carousel-slide>
    </b-carousel> 
        </b-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        slide: 0,
        sliding: null,
        showOverlay: true
      }
    },
    methods: {
      onSlideStart() {
        this.sliding = true
      },
      onSlideEnd() {
        this.sliding = false
      }
    }
  }
</script>