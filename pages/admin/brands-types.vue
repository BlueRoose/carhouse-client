<template>
  <div class="brands-types container mx-auto px-4">
    <div class="brands-types__side">
      <p class="brands-types__side-title">Brands</p>
      <div class="brands-types__side__main">
        <div class="brands-types__side__main__list">
          <p
            v-for="(brand, index) in brands"
            :key="index"
            class="brands-types__side__main__list-item"
          >
            {{ `${index + 1}. ${brand.name}` }}
          </p>
        </div>
        <div class="brands-types__side__main__operations">
          <div class="brands-types__side__main__operations__operation">
            <p class="brands-types__side__main__operations__operation-name">Create new brand</p>
            <input
              v-model="brandsData.brandForAdding"
              class="brands-types__side__main__operations__operation-input"
              placeholder="Enter brand name"
            />
            <Button
              :disabled="!brandsData.brandForAdding"
              :isLoading="isLoading.brand.add"
              @click="createBrand"
            >
              Create
            </Button>
          </div>
          <div class="brands-types__side__main__operations__operation">
            <p class="brands-types__side__main__operations__operation-name">Delete existing brand</p>
            <CustomSelect
              v-model="brandsData.brandForDeleting"
              class="select"
              :options="brands"
            />
            <Button
              :disabled="!brandsData.brandForDeleting"
              :isLoading="isLoading.brand.delete"
              @click="deleteBrand"
            >
              Delete
            </Button>
          </div>
          <div class="brands-types__side__main__operations__operation update">
            <p class="brands-types__side__main__operations__operation-name">Update existing brand</p>
            <div class="two-inputs">
              <CustomSelect v-model="brandsData.brandForUpdating.oldBrand" :options="brands" />
              <input
                v-model="brandsData.brandForUpdating.name"
                class="brands-types__side__main__operations__operation-input"
                placeholder="Enter new brand's name"
              />
            </div>
            <Button
              :disabled="!brandsData.brandForUpdating.oldBrand"
              :isLoading="isLoading.brand.update"
              @click="updateBrand"
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
    <div class="brands-types__side">
      <p class="brands-types__side-title">Types</p>
      <div class="brands-types__side__main">
        <div class="brands-types__side__main__list">
          <p
            v-for="(type, index) in types"
            :key="index"
            class="brands-types__side__main__list-item"
          >
          {{ `${index + 1}. ${type.name}` }}
          </p>
        </div>
        <div class="brands-types__side__main__operations">
          <div class="brands-types__side__main__operations__operation">
            <p class="brands-types__side__main__operations__operation-name">Create new type</p>
            <input
              v-model="typesData.typeForAdding"
              class="brands-types__side__main__operations__operation-input"
              placeholder="Enter type name"
            />
            <Button
              :disabled="!typesData.typeForAdding"
              :isLoading="isLoading.type.add"
              @click="createType"
            >
              Create
            </Button>
          </div>
          <div class="brands-types__side__main__operations__operation">
            <p class="brands-types__side__main__operations__operation-name">Delete existing type</p>
            <CustomSelect
              v-model="typesData.typeForDeleting"
              class="select"
              :options="types"
            />
            <Button
              :disabled="!typesData.typeForDeleting"
              :isLoading="isLoading.type.delete"
              @click="deleteType"
            >
              Delete
            </Button>
          </div>
          <div class="brands-types__side__main__operations__operation update">
            <p class="brands-types__side__main__operations__operation-name">Update existing type</p>
            <div class="two-inputs">
              <CustomSelect v-model="typesData.typeForUpdating.oldType" :options="types" />
              <input
                v-model="typesData.typeForUpdating.name"
                class="brands-types__side__main__operations__operation-input"
                placeholder="Enter new type's name"
              />
            </div>
            <Button
              :disabled="!typesData.typeForUpdating.oldType"
              :isLoading="isLoading.type.update"
              @click="updateType"
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBrandsStore } from "@/store/brands.js";
import { useTypesStore } from "@/store/types.js";
import { useNotificationsStore } from "@/store/notifications.js";
import api from "@/api";

const brandsStore = useBrandsStore();
const typesStore = useTypesStore();
const notificationsStore = useNotificationsStore();

const { brands } = storeToRefs(brandsStore);
const { types } = storeToRefs(typesStore);
const { successMessage, errorMessage } = storeToRefs(notificationsStore);

const isLoading = reactive({
  brand: {
    add: false,
    delete: false,
    update: false,
  },
  type: {
    add: false,
    delete: false,
    update: false,
  },
});
const brandsData = reactive({
  brandForAdding: "",
  brandForDeleting: "",
  brandForUpdating: {
    oldBrand: "",
    name: "",
  },
});
const typesData = reactive({
  typeForAdding: "",
  typeForDeleting: "",
  typeForUpdating: {
    oldType: "",
    name: "",
  },
});

onMounted(async () => {
  try {
    await brandsStore.getBrands();
    await typesStore.getTypes();
  } catch (e) {
    errorMessage.value = e;
    setTimeout(() => errorMessage.value = "", 2000);
  } finally {
    isLoading.value = false;
  }
});

async function createBrand() {
  isLoading.brand.add = true;
  try {
    const result = await api.createBrand(brandsData.brandForAdding);
    brands.value.push(result.brand);
    brandsData.brandForAdding = "";
  } catch (e) {
    errorMessage.value = e;
    setTimeout(() => errorMessage.value = "", 2000);
  } finally {
    isLoading.brand.add = false;
  }
}

async function deleteBrand() {
  isLoading.brand.delete = true;
  try {
    const selectedBrandId = brands.value.find(brand => brand.name === brandsData.brandForDeleting).id;

    await api.deleteBrand(selectedBrandId);
    brands.value = brands.value.filter(brand => brand.name !== brandsData.brandForDeleting);
    brandsData.brandForDeleting = "";
  } catch (e) {
    errorMessage.value = e;
    setTimeout(() => errorMessage.value = "", 2000);
  } finally {
    isLoading.brand.delete = false;
  }
}

async function updateBrand() {
  isLoading.brand.update = true;
  try {
    const selectedBrandId = brands.value.find(brand => brand.name === brandsData.brandForUpdating.oldBrand).id;

    const response = await api.updateBrand(selectedBrandId, brandsData.brandForUpdating.name);
    brands.value.find(brand => brand.name === brandsData.brandForUpdating.oldBrand).name = response.brand.name;
    brandsData.brandForUpdating = {
      brandId: "",
      name: "",
    };
  } catch (e) {
    errorMessage.value = e;
    setTimeout(() => errorMessage.value = "", 2000);
  } finally {
    isLoading.brand.update = false;
  }
}

async function createType() {
  isLoading.type.add = true;
  try {
    const result = await api.createType(typesData.typeForAdding);
    types.value.push(result.type);
    typesData.typeForAdding = "";
  } catch (e) {
    errorMessage.value = e;
    setTimeout(() => errorMessage.value = "", 2000);
  } finally {
    isLoading.type.add = false;
  }
}

async function deleteType() {
  isLoading.type.delete = true;
  try {
    const selectedTypeId = types.value.find(type => type.name === typesData.typeForDeleting).id;

    await api.deleteType(selectedTypeId);
    types.value = types.value.filter(type => type.name !== typesData.typeForDeleting);
    typesData.typeForDeleting = "";
  } catch (e) {
    errorMessage.value = e;
    setTimeout(() => errorMessage.value = "", 2000);
  } finally {
    isLoading.type.delete = false;
  }
}

async function updateType() {
  isLoading.type.update = true;
  try {
    const selectedTypeId = types.value.find(type => type.name === typesData.typeForUpdating.oldType).id;

    const response = await api.updateType(selectedTypeId, typesData.typeForUpdating.name);
    types.value.find(type => type.name === typesData.typeForUpdating.oldType).name = response.type.name;
    typesData.typeForUpdating = {
      typeId: "",
      name: "",
    };
  } catch (e) {
    errorMessage.value = e;
    setTimeout(() => errorMessage.value = "", 2000);
  } finally {
    isLoading.type.update = false;
  }
}

definePageMeta({
  layout: "admin",
});
</script>

<style lang="scss">
.brands-types {
  width: 100%;
  height: 100%;
  background-color: $color-dark;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  &__side {
    text-align: center;
    padding: 59px 25px 50px;

    &:first-of-type {
      border-right: 1px solid $color-white;
    }

    &-title {
      font-size: 36px;
      color: $color-yellow;
      margin-bottom: 20px;
    }

    &__main {
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center;
      justify-content: center;

      &__list {
        width: 100%;
        height: 200px;
        overflow: auto;
        padding: 10px;
        border: 1px solid $color-yellow;
        border-radius: 25px;
        box-sizing: border-box;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 25px;

        &-item {
          color: $color-white;
          font-size: 18px;
        }
      }

      &__operations {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 20px;

        &__operation {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          &.update {
            grid-column: 1 / span 2;
          }

          &-name {
            color: $color-white;
            font-size: 20px;
            margin-bottom: 15px;
          }

          &-input {
            width: 100%;
            height: 36px;
            padding: 10px 15px;
            border: 2px solid $color-yellow;
            outline: none;
            border-radius: 5px;
            margin-bottom: 30px;
            box-sizing: border-box;
          }

          .two-inputs {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            align-items: center;
            justify-content: center;
            gap: 15px;
            margin-bottom: 30px;

            input {
              margin-bottom: 0;
            }

            .select {
              margin-bottom: 0;
            }
          }

          .select {
            width: 100%;
            margin-bottom: 30px;
            border: 2px solid $color-yellow;
            border-radius: 5px;
          }
        }
      }
    }
  }
}
</style>