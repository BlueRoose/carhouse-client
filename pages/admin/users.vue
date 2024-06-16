<template>
  <div class="w-1/2 h-full mx-auto p-5 bg-main-dark flex flex-col items-center gap-24 container px-4">
    <div class="flex items-center gap-4">
      <p class="text-white text-2xl">Find the user:</p>
      <SearchableSelect
        v-model="selectedUserId"
        class="w-[300px]"
        :options="users"
        :isSearchable="true"
      />
    </div>
    <div v-if="selectedUser" class="flex flex-col gap-8">
      <p class="text-white text-4xl font-medium">User's information</p>
      <input
        v-model="selectedUser.name"
        class="w-full h-9 py-2.5 px-4 border-[2px] border-main-yellow outline-none rounded :disabled:text-main-yellow"
        disabled
      />
      <input
        v-model="selectedUser.surname"
        class="w-full h-9 py-2.5 px-4 border-[2px] border-main-yellow outline-none rounded :disabled:text-main-yellow"
        disabled
      />
      <input
        v-model="selectedUser.email"
        class="w-full h-9 py-2.5 px-4 border-[2px] border-main-yellow outline-none rounded :disabled:text-main-yellow"
        disabled
      />
      <CustomSelect v-model="selectedUser.role" :options="roles" />
      <Button
        :disabled="!roleChanged"
        :isLoading="isLoading"
        @click="changeRole"
      >
        Update user's role
      </Button>
    </div>
  </div>
</template>

<script setup>
import { useNotificationsStore } from "@/store/notifications.js";
import api from "@/api";

let previousRole = "";
const roles = [
  {
    name: "User",
    value: "USER",
  },
  {
    name: "Moderator",
    value: "MODERATOR",
  },
  {
    name: "Admin",
    value: "ADMIN",
  },
];

const notificationsStore = useNotificationsStore();

const { successMessage, errorMessage } = storeToRefs(notificationsStore);

const users = ref([]);
const selectedUserId = ref(null);
const selectedUser = ref(null);
const isLoading = ref(false);

const roleChanged = computed(() => previousRole !== selectedUser.value.role);

watch(selectedUserId, () => {
  const user = users.value.find(user => user.id === selectedUserId.value);
  previousRole = user?.role;

  selectedUser.value = user;
})

onMounted(async () => {
  try {
    const response = await api.getUsers();
    users.value = response.users;
  } catch (e) {
    errorMessage.value = e;
    setTimeout(() => errorMessage.value = "");
  }
});

async function changeRole() {
  isLoading.value = true;
  try {
    await api.changeRole(selectedUserId.value, selectedUser.value.role);
    users.value.find(user => user.id === selectedUserId.value).role = selectedUser.value.role;

    previousRole = selectedUser.value.role;
  } catch (e) {
    errorMessage.value = e;
    setTimeout(() => errorMessage.value = "");
  } finally {
    isLoading.value = false;
  }
}

definePageMeta({
  layout: "admin",
});
</script>
