<template>
  <div class="container">
    {{ toggleFlashMessage }}
    <section id="main-heading">
      <h1>Student Demo Test</h1>
      <h3>Add, edit and delete students</h3>
    </section>
    <nuxt/>
  </div>
</template>

<script>
import flashMessagesMixin from '~/mixins/flashMessages.mixin';

export default {
  mixins: [flashMessagesMixin],
};
</script>


<style lang="scss">
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

:root {
  font-size: 16px;
}

body {
  background-color: #f7f7f7;
}

.container {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

@media (min-width: 1200px) {
  .container {
    width: 960px;
  }
}

#main-heading {
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1rem;
  }
}

.flex-1 {
  flex: 1;
}
</style>
