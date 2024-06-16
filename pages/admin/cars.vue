<template>
  <div class="w-full h-fit p-5 pt-14 flex relative overflow-hidden container mx-auto px-4">
    <div
        v-if="selectedAction"
        class="flex gap-2 items-center text-white hover:text-main-yellow transition-colors ease-linear absolute top-5 left-5 cursor-pointer"
        @click="selectedAction = ''"
    >
      <ArrowLeftIcon/>
      Return
    </div>
    <div v-if="!selectedAction" class="mx-auto mt-20">
      <p class="text-white text-2xl text-center mb-4">Select action</p>
      <div class="w-fit flex items-center gap-4 mx-auto">
        <Button @click="selectAction('add')">Add new car</Button>
        <Button @click="selectAction('manage')">Manage existing cars</Button>
      </div>
    </div>
    <div v-else class="w-full h-full overflow-auto">
      <div v-if="selectedAction === 'add'">
        <p class="text-white text-center text-2xl font-bold mb-4">Add new car</p>
        <form class="max-w-[1080px] mx-auto mb-5">
          <div class="grid grid-cols-3 gap-5 items-end mb-5">
            <CustomSelect
              v-model="carData.brand"
              label="Brand"
              :options="brands"
            />
            <CustomSelect
              v-model="carData.type"
              label="Type"
              :options="types"
            />
            <div>
              <p class="text-[#848484] text-sm mb-4">Name</p>
              <input
                v-model="carData.name"
                class="w-full h-8 rounded border-none outline-none px-2 text-sm"
              />
            </div>
            <div>
              <p class="text-[#848484] text-sm mb-4">Year</p>
              <input
                v-model="carData.year"
                class="w-full h-8 rounded border-none outline-none px-2 text-sm"
              />
            </div>
            <div>
              <p class="text-[#848484] text-sm mb-4">Color</p>
              <input
                v-model="carData.color"
                class="w-full h-8 rounded border-none outline-none px-2 text-sm"
              />
            </div>
            <div>
              <p class="text-[#848484] text-sm mb-4">Price in USD</p>
              <input
                v-model="carData.price"
                class="w-full h-8 rounded border-none outline-none px-2 text-sm"
                type="number"
              />
            </div>
            <CustomSelect
              v-model="carData.transmission"
              label="Transmission"
              :options="transmissions"
            />
            <div>
              <p class="text-[#848484] text-sm mb-4">Passenger</p>
              <input
                v-model="carData.passenger"
                class="w-full h-8 rounded border-none outline-none px-2 text-sm"
                type="number"
              />
            </div>
            <div>
              <p class="text-[#848484] text-sm mb-4">Top speed</p>
              <input
                v-model="carData.topSpeed"
                class="w-full h-8 rounded border-none outline-none px-2 text-sm"
                type="number"
              />
            </div>
            <div>
              <p class="text-[#848484] text-sm mb-4">Horse power</p>
              <input
                v-model="carData.horsePower"
                class="w-full h-8 rounded border-none outline-none px-2 text-sm"
                type="number"
              />
            </div>
            <div>
              <p class="text-[#848484] text-sm mb-4">Time to 100 km/h</p>
              <input
                v-model="carData.time"
                class="w-full h-8 rounded border-none outline-none px-2 text-sm"
                type="number"
              />
            </div>
          </div>
          <div class="mb-5">
            <p class="text-[#848484] text-sm mb-4">Description</p>
            <textarea
              v-model="carData.description"
              class="w-full h-16 rounded border-none outline-none px-2 text-sm resize-none p-2"
            />
          </div>
          <div>
            <p class="text-[#848484] text-sm mb-4">Images</p>
            <el-upload
              v-model:file-list="fileList"
              :auto-upload="false"
              action="#"
              list-type="picture-card"
            >
              <el-icon>
                <Plus/>
              </el-icon>
              <template #file="{ file }">
                <div>
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url"
                    alt=""
                  />
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <el-icon><zoom-in/></el-icon>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                    >
                      <el-icon><Delete/></el-icon>
                    </span>
                  </span>
                </div>
              </template>
            </el-upload>
            <el-dialog v-model="dialogVisible">
              <img
                class="w-full"
                :src="dialogImageUrl"
                alt="Preview Image"
              />
            </el-dialog>
          </div>
        </form>
        <Button class="mx-auto" :isLoading="isLoading.add" @click="addCar">Add new car</Button>
      </div>
      <div v-else class="w-full h-full flex">
        <div class="w-1/2 h-full pr-10 overflow-auto">
          <div v-if="cars.length" class="grid grid-cols-2 gap-5">
            <CollectionCard
              v-for="(car, index) in cars"
              :key="index"
              class="border-[5px] border-transparent"
              :class="{ '!border-main-yellow': car.id === selectedCar?.id }"
              :car="car"
              @click="selectCar(car)"
            />
          </div>
          <div v-else class="w-fit h-fit fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-white">
            <h2>No cars were found</h2>
          </div>
        </div>
        <div v-if="selectedCar?.id" class="w-1/2 overflow-auto pr-10">
          <p class="text-white text-center text-2xl font-bold mb-4">Update car</p>
          <form class="max-w-[1080px] mx-auto mb-5">
            <div class="grid grid-cols-3 gap-5 items-end mb-5">
              <CustomSelect
                v-model="selectedCar.brand"
                label="Brand"
                :options="brands"
              />
              <CustomSelect
                v-model="selectedCar.type"
                label="Type"
                :options="types"
              />
              <div>
                <p class="text-[#848484] text-sm mb-4">Name</p>
                <input
                  v-model="selectedCar.name"
                  class="w-full h-8 rounded border-none outline-none px-2 text-sm"
                />
              </div>
              <div>
                <p class="text-[#848484] text-sm mb-4">Year</p>
                <input
                  v-model="selectedCar.year"
                  class="w-full h-8 rounded border-none outline-none px-2 text-sm"
                />
              </div>
              <div>
                <p class="text-[#848484] text-sm mb-4">Color</p>
                <input
                  v-model="selectedCar.color"
                  class="w-full h-8 rounded border-none outline-none px-2 text-sm"
                />
              </div>
              <div>
                <p class="text-[#848484] text-sm mb-4">Price in USD</p>
                <input
                  v-model="selectedCar.price"
                  class="w-full h-8 rounded border-none outline-none px-2 text-sm"
                  type="number"
                />
              </div>
              <CustomSelect
                v-model="selectedCar.transmission"
                label="Transmission"
                :options="transmissions"
              />
              <div>
                <p class="text-[#848484] text-sm mb-4">Passenger</p>
                <input
                  v-model="selectedCar.passenger"
                  class="w-full h-8 rounded border-none outline-none px-2 text-sm"
                  type="number"
                />
              </div>
              <div>
                <p class="text-[#848484] text-sm mb-4">Top speed</p>
                <input
                  v-model="selectedCar.topSpeed"
                  class="w-full h-8 rounded border-none outline-none px-2 text-sm"
                  type="number"
                />
              </div>
              <div>
                <p class="text-[#848484] text-sm mb-4">Horse power</p>
                <input
                  v-model="selectedCar.horsePower"
                  class="w-full h-8 rounded border-none outline-none px-2 text-sm"
                  type="number"
                />
              </div>
              <div>
                <p class="text-[#848484] text-sm mb-4">Time to 100 km/h</p>
                <input
                  v-model="selectedCar.time"
                  class="w-full h-8 rounded border-none outline-none px-2 text-sm"
                  type="number"
                />
              </div>
            </div>
            <div class="mb-5">
              <p class="text-[#848484] text-sm mb-4">Description</p>
              <textarea
                v-model="selectedCar.description"
                class="w-full h-16 rounded border-none outline-none px-2 text-sm resize-none p-2"
              />
            </div>
            <div>
              <p class="text-[#848484] text-sm mb-4">Images</p>
              <el-upload
                v-model:file-list="fileList"
                :auto-upload="false"
                action="#"
                list-type="picture-card"
              >
                <el-icon>
                  <Plus/>
                </el-icon>
                <template #file="{ file }">
                  <div>
                    <img
                      class="el-upload-list__item-thumbnail"
                      :src="file.url"
                      alt=""
                    />
                    <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <el-icon><zoom-in/></el-icon>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                    >
                      <el-icon><Delete/></el-icon>
                    </span>
                  </span>
                  </div>
                </template>
              </el-upload>
              <el-dialog v-model="dialogVisible">
                <img
                  class="w-full"
                  :src="dialogImageUrl"
                  alt="Preview Image"
                />
              </el-dialog>
              <div class="flex gap-4 items-center flex-wrap mt-4">
                <div
                  v-for="(img, index) in carImages"
                  :key="index"
                  class="max-w-[148px] relative"
                >
                  <img
                    class=""
                    :src="img"
                    alt="img"
                  />
                  <XMarkIcon class="bg-main-yellow absolute top-0 right-0 cursor-pointer" @click="deleteImage(img)" />
                </div>
              </div>
            </div>
          </form>
          <Button
            class="mx-auto mb-10"
            :isLoading="isLoading.add"
            @click="updateCar"
          >
            Update car
          </Button>
          <p class="text-white text-center text-2xl font-bold mb-4">Delete car</p>
          <Button
            class="mx-auto"
            :isLoading="isLoading.add"
            @click="deleteCar"
          >
            Delete car
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {Delete, Plus, ZoomIn} from "@element-plus/icons-vue";
import {useCarsStore} from "@/store/cars.js";
import {useTypesStore} from "@/store/types.js";
import {useBrandsStore} from "@/store/brands.js";
import {useNotificationsStore} from "@/store/notifications.js";
import ArrowLeftIcon from "@/components/Icons/ArrowLeftIcon.vue";
import axios from "axios";
import XMarkIcon from "~/components/Icons/XMarkIcon.vue";

definePageMeta({
  layout: "admin",
});

const transmissions = [
  {
    name: "Automatic"
  },
  {
    name: "Manual"
  },
];

const config = useRuntimeConfig();

const route = useRoute();
const router = useRouter();

const carsStore = useCarsStore();
const brandsStore = useBrandsStore();
const typesStore = useTypesStore();
const notificationsStore = useNotificationsStore();

const {cars} = storeToRefs(carsStore);
const {brands} = storeToRefs(brandsStore);
const {types} = storeToRefs(typesStore);
const {successMessage, errorMessage} = storeToRefs(notificationsStore);

const selectedAction = ref(route.query.action || "");
const selectedCar = ref(null);
const carData = reactive({
  brand: "",
  type: "",
  name: "",
  description: "",
  year: "",
  color: "",
  price: "",
  transmission: "",
  passenger: "",
  topSpeed: "",
  horsePower: "",
  time: "",
});
const fileList = ref([]);
const carImages = ref([]);
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const disabled = ref(false);
const isLoading = reactive({
  add: false,
  update: false,
  delete: false,
});

onMounted(async () => {
  await Promise.all([carsStore.getCars(), brandsStore.getBrands(), typesStore.getTypes()]);
});

watch(
  () => selectedAction.value,
  async () => {
    await carsStore.getCars();
  },
);

function selectAction(action) {
  selectedAction.value = action;
  router.push({query: {action}});
}

function selectCar(car) {
  if (selectedCar.value?.id === car.id) {
    selectedCar.value = null;
  } else {
    selectedCar.value = car;
    carImages.value = [...car.imgs];
  }
}

function handleRemove(file) {
  fileList.value = fileList.value.filter(uploadedFile => uploadedFile?.uid !== file.uid);
}

function handlePictureCardPreview(file) {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
}

function deleteImage(img) {
  carImages.value = carImages.value.filter(image => image !== img);
}

async function addCar() {
  try {
    isLoading.add = true;
    const brandId = brands.value.find(brand => brand.name === carData.brand).id;
    const typeId = types.value.find(type => type.name === carData.type).id;

    const formData = new FormData();
    formData.append("brandId", brandId);
    formData.append("typeId", typeId);
    formData.append("name", carData.name);
    formData.append("description", carData.description);
    formData.append("color", carData.color);
    formData.append("price", carData.price);
    formData.append("transmission", carData.transmission);
    formData.append("horsePower", carData.horsePower);
    formData.append("passenger", carData.passenger);
    formData.append("time", carData.time);
    formData.append("rating", 5);
    formData.append("year", carData.year);
    formData.append("topSpeed", carData.topSpeed);
    fileList.value.forEach((file, index) => {
      formData.append(`file${index}`, file.raw);
    });

    await axios.post(
      `https://carhouse-backend.onrender.com/api/car/create-car`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${useCookie("token").value}`,
        },
      },
    );
  } catch (e) {
    errorMessage.value = e;
    setTimeout(() => errorMessage.value = "", 2000);
  } finally {
    isLoading.add = false;
  }
}

async function updateCar() {
  try {
    isLoading.delete = true;

    const brandId = brands.value.find(brand => brand.name === selectedCar.value.brand).id;
    const typeId = types.value.find(type => type.name === selectedCar.value.type).id;

    const formData = new FormData();
    formData.append("id", selectedCar.value.id);
    formData.append("brandId", brandId);
    formData.append("typeId", typeId);
    formData.append("name", selectedCar.value.name);
    formData.append("description", selectedCar.value.description);
    formData.append("color", selectedCar.value.color);
    formData.append("price", selectedCar.value.price);
    formData.append("transmission", selectedCar.value.transmission);
    formData.append("horsePower", selectedCar.value.horsePower);
    formData.append("passenger", selectedCar.value.passenger);
    formData.append("time", selectedCar.value.time);
    formData.append("rating", 5);
    formData.append("year", selectedCar.value.year);
    formData.append("topSpeed", selectedCar.value.topSpeed);
    fileList.value.forEach((file, index) => {
      formData.append(`file${index}`, file.raw);
    });
    formData.append("imgs", JSON.stringify(carImages.value));
    await axios.patch(
      `https://carhouse-backend.onrender.com/api/car/update-car`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${useCookie("token").value}`,
        },
      },
    );
    await carsStore.getCars();
  } catch (e) {
    errorMessage.value = e;
    setTimeout(() => errorMessage.value = "", 2000);
  } finally {
    isLoading.delete = false;
  }
}

async function deleteCar() {
  try {
    isLoading.delete = true;
    await axios.delete(
      `https://carhouse-backend.onrender.com/api/car/delete-car`,
      {
        data: {
          carId: selectedCar.value.id,
        },
        headers: {
          Authorization: `Bearer ${useCookie("token").value}`,
        },
      },
    );
    cars.value = cars.value.filter(car => car.id !== selectedCar.value.id);
    selectedCar.value = null;
  } catch (e) {
    errorMessage.value = e;
    setTimeout(() => errorMessage.value = "", 2000);
  } finally {
    isLoading.delete = false;
  }
}
</script>
