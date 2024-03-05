<template>
  <div>
    <Header />
    <NuxtPage />
    <QuestionBlock />
    <Footer />
  </div>
</template>

<script setup>
useHead({
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com" },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" }
  ]
})
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  font-family: "Roboto";
}

a {
  text-decoration: none;
}
</style>
