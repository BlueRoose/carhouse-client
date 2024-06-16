<template>
  <div
    class="w-full bg-[#f1f1f1] py-3.5 shadow-[0_4px_39.79999923706055px_0_#00000040] rounded-3xl flex gap-6 relative cursor-pointer"
    :class="{ 'border-1 border-main-yellow': selected }"
  >
    <img
      class="max-w-[30%]"
      :src="buyRequest.car.imgs[0]"
      alt="ordered car"
    />
    <div class="flex flex-col">
      <p class="text-3xl font-semibold">{{ carName }}</p>
      <p class="text-2xl font-medium">
        Client: {{ userName }}(<a :href="`tel:${buyRequest.phone}`">{{ buyRequest.phone }}</a>)
      </p>
      <p class="text-2xl font-medium mb-6">Price: ${{ buyRequest.car.price }}</p>
      <p class="text-2xl font-medium">
        Order's status:
        <span :class="`${buyRequest.status.toLowerCase()}`">
          {{ buyRequest.status }}
        </span>
      </p>
    </div>
    <p class="opacity-80 font-medium absolute right-3.5 top-2.5">Ordered {{ orderDate }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  buyRequest: {
    type: Object,
    default() {
      return {};
    },
  },
  selected: {
    type: Boolean,
    default: false,
  },
});

const carName = computed(() => `Order id: ${props.buyRequest.id}. ${props.buyRequest.car.brand} ${props.buyRequest.car.name}`);

const orderDate = computed(() => props.buyRequest.createdAt.split("T")[0].split("-").reverse().join("."));

const userName = computed(() => `${props.buyRequest.user.name} ${props.buyRequest.user.surname}`);
</script>

<style lang="scss" scoped>
.pending {
  border-bottom: 2px solid rgb(151, 150, 150);
}

.canceled {
  border-bottom: 2px solid red;
}

.completed {
  border-bottom: 2px solid greenyellow;
}

.in-progress {
  border-bottom: 2px solid orange;
}
</style>