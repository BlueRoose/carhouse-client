<template>
  <div class="request-card" :class="{ 'selected': selected }">
    <div class="request-card__info">
      <p class="request-card__info-client">
        Client: {{ request.name }}(<a :href="`mailto:${request.email}`">{{ request.email }}</a>)
      </p>
      <p class="request-card__info-subject">Subject: {{ request.subject }}</p>
      <p class="request-card__info-subject">Message: {{ request.text }}</p>
    </div>
    <div v-if="request.isResolved" class="request-card-dark"></div>
    <p v-if="request.isResolved" class="request-card-title">RESOLVED</p>
  </div>
</template>

<script setup>
const props = defineProps({
  request: {
    type: Object,
    default() {
      return {};
    },
  },
  selected: Boolean,
});
</script>

<style lang="scss" scoped>
.request-card {
  width: 100%;
  background-color: #f1f1f1;
  padding: 15px 10px;
  box-shadow: 0px 4px 39.79999923706055px 0px #00000040;
  border-radius: 25px;
  box-sizing: border-box;
  display: flex;
  gap: 25px;
  position: relative;
  cursor: pointer;

  &.selected {
    border: 5px solid $color-yellow;
  }

  &__info {
    display: flex;
    flex-direction: column;

    &-name {
      font-size: 28px;
      font-weight: 600;
    }

    &-client {
      font-size: 24px;
      font-weight: 500;
    }

    &-subject {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 25px;
    }
  }

  &-dark {
    width: 100%;
    height: 100%;
    background-color: black;
    border-radius: 25px;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 70%;
  }

  &-title {
    font-size: 36px;
    font-weight: 700;
    color: $color-yellow;
    z-index: 10;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>