<template>
  <div class="select">
    <p v-if="label" class="text-[#848484] text-sm mb-4 max-md:mb-2">{{ label }}</p>
    <el-select
      v-model="selectValue"
      placeholder="Select"
      :disabled="disabled"
      clearable
    >
      <el-option
        v-for="(option, index) in options"
        :key="index"
        :label="option.name"
        :value="option.value || option.name"
      />
    </el-select>
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  options: Array,
  modelValue: String | Number,
  disabled: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const selectValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<style lang="scss">
.select {
  .el-select {
    min-width: 150px;
  }
}

.el-select__wrapper.is-focused {
  box-shadow: 0 0 0 1px #ffd600 inset !important;
}

.el-select-dropdown__item.is-selected {
  color: #ffd600 !important;
}
</style>