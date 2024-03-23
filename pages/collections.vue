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
      <div class="collections__content__info">
        <p class="collections__content__info-showed">Showing 9 from 98 result</p>
        <CustomSelect label="Sort By" />
      </div>
      <div class="collections__content__cards">
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
      </div>
      <div class="collections__content__pagination">
        <Button class="collections__content__pagination-button active-button">1</Button>
        <Button class="collections__content__pagination-button">2</Button>
        <Button class="collections__content__pagination-button">3</Button>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.collections {
  background-color: $color-white;
  padding-bottom: 220px;

  &__content {
    padding: 0 240px;

    &__search {
      max-width: 1200px;
      height: 140px;
      margin: 0 auto;
      padding: 0 64px;
      margin-bottom: 150px;
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

    &__info {
      margin-bottom: 80px;
      display: flex;
      justify-content: space-between;
      align-items: bottom;

      &-showed {
        font-size: 30px;
        font-weight: 600;
        color: $color-black;
      }
    }

    &__cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
      grid-column-gap: 54px;
      grid-row-gap: 94px;
      margin-bottom: 90px;
    }

    &__pagination {
      width: fit-content;
      margin: 0 auto;
      display: flex;
      gap: 14px;

      &-button {
        background-color: #E1E1E1;
        transition: all 0.2s linear;
      }
    }
  }
}

.active-button {
  background-color: #464646;
  color: $color-white;
}
</style>