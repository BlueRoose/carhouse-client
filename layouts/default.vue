<template>
  <div>
    <ClientOnly>
      <Header />
    </ClientOnly>
    <slot />
    <QuestionBlock />
    <Footer />
  </div>
</template>