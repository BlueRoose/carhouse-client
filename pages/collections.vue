<template>
  <div class="collections">
    <PageInfo
      subtitle="C o l l e c t i o n s"
      title="Find your dream car here"
      description="Carhouse is the best place to find your dream car. Choose it!"
    />
    <div class="collections__content">
      <div class="collections__content__search">
        <div class="collections__content__search__selects">
          <CustomSelect label="Brand" />
          <CustomSelect label="Model" />
          <CustomSelect label="Year" />
          <CustomSelect label="Type" />
        </div>
        <Button class="collections__content__search-button">Find</Button>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.collections {
  background-color: $color-white;

  &__content {
    height: 200px;
    padding: 0 240px;

    &__search {
      max-width: 1200px;
      height: 140px;
      margin: 0 auto;
      padding: 0 64px;
      box-shadow: 0 31px 81px rgba(37, 37, 37, .3);
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      &__selects {
        display: flex;
        gap: 91px;
      }

      &-button {
        width: 145px;
        height: 64px;
        border-radius: 0;
      }
    }
  }
}
</style>