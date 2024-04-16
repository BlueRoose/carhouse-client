<template>
  <div class="select">
    <p class="select-label">{{ label }}</p>
    <el-select
      :value="modelValue"
      placeholder="Select"
      @change="handleChangeSelect"
    >
      <el-option
        v-for="option, index in options"
        :key="index"
        :label="option.name"
        :value="option.name"
      />
    </el-select>
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

<style lang="scss">
.select {
  &-label {
    font-size: 14px;
    color: #848484;
    margin-bottom: 16px;
  }

  .el-select {
    min-width: 150px;
  }
}

.el-select__wrapper.is-focused {
  box-shadow: 0 0 0 1px #ffd600 inset !important;
}
</style>