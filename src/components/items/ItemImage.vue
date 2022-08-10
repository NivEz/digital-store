<template>
  <img :src="imageUrl" :style="[imageHeight, imageWidth]" alt="product image"/>
</template>

<script>
export default {
  name: "ItemImage",
  props: ['size', 'imageUrl'],

  data() {
    return {
      imageHeight: '',
      imageWidth: ''
    }
  },

  methods: {
    setImageSize() {
      this.imageHeight = `height: ${this.size.height}`
      this.imageWidth = `max-width: ${this.size.width}`
    }
  },

  created() {
    this.setImageSize()
  }
}
</script>

<style scoped>

.image-size {
  background: #9C27B0;
  width: 100%;
  border-radius: 10px;
}

.img-wrapper {
  display: flex;
  justify-content: center;
}

</style>
