<template>
  <section>
    <h2>Simple, yet powerful...</h2>
    <q-icon
      id="down-icon"
      name="arrow_downward"
      size="50px"
      @click="scrollDown"
    ></q-icon>
  </section>
  <div id="catalog"></div>
</template>

<script>
export default {
  name: "Welcome",

  methods: {
    scrollDown() {
      document.querySelector("#catalog").scrollIntoView({
        behavior: 'smooth'
      })
    }
  },

}
</script>

<style scoped>

section {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
}

section > h2 {
  transform: translateY(-80px);
}


#down-icon {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 30%;
  cursor: pointer;
}

#catalog {
  transform: translateY(-100px);
}


</style>
