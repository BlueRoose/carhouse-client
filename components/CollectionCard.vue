<template>
  <div class="w-full h-fit bg=[#FBFBFB] rounded-3xl shadow-[0_4px_39.79999923706055px_0_#00000040] relative">
    <div class="relative">
      <NuxtLink :to="`/car/${car.id}`">
        <img
            class="w-full h-1/2 object-cover rounded-t-3xl cursor-pointer"
            :src="car.imgs[0]"
            :alt="car.name"
        />
      </NuxtLink>
      <NuxtLink :to="`/car/${car.id}`">
        <Button class="text-2xl font-semibold py-4 px-5 absolute top-full right-3 -translate-y-1/2 cursor-pointer">$ {{ car.price }}</Button>
      </NuxtLink>
    </div>
    <div class="p-9 bg-white rounded-b-3xl">
      <p class="text-3xl font-semibold mb-9">{{ car.brand + ' ' + car.name }}</p>
      <div class="grid grid-cols-3 max-xl:grid-cols-2 gap-4">
        <CardInfoItem title="Type" :value="car.type" />
        <CardInfoItem title="Transmission" :value="car.transmission" />
        <CardInfoItem title="Passenger" :value="`${car.passenger} Person`" />
        <CardInfoItem title="Top Speed" :value="car.topSpeed" />
        <CardInfoItem title="Horse Power" :value="car.horsePower" />
        <CardInfoItem title="0-100 km/h" :value="car.time" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  car: Object,
  default() {
    return {};
  },
});
</script>
