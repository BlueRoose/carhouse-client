<template>
  <div class="select">
    <p class="select-label">{{ label }}</p>
    <select
      :value="modelValue"
      class="select-input"
      placeholder="Select"
      @change="handleChangeSelect"
    >
      <option>Lambo</option>
      <option>BMW</option>
      <option>Audi</option>
    </select>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  options: Array,
  modelValue: String
});

function handleChangeSelect() {
  console.log(1);
}
</script>

<style lang="scss" scoped>
.select {

  &-label {
    font-size: 14px;
    color: #848484;
    margin-bottom: 16px;
  }

  &-input {
    border: none;
    outline: none;
    border-bottom: 1px solid $color-yellow;
    font-size: 20px;
    font-weight: 600;
  }
}
</style>