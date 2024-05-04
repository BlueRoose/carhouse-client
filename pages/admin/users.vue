<template>
  <div class="users">
    <div class="users__search">
      <p class="users__search-title">Find the user:</p>
      <SearchableSelect
        v-model="selectedUserId"
        :options="users"
        :isSearchable="true"
      />
    </div>
    <div v-if="selectedUser" class="users__main">
      <p class="users__main-title">User's information</p>
      <input
        v-model="selectedUser.name"
        class="users__main-input"
        disabled
      />
      <input
        v-model="selectedUser.surname"
        class="users__main-input"
        disabled
      />
      <input
        v-model="selectedUser.email"
        class="users__main-input"
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

<style lang="scss">
.users {
  width: 50%;
  height: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: $color-dark;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 100px;

  &__search {
    display: flex;
    align-items: center;
    gap: 15px;

    &-title {
      font-size: 24px;
      color: $color-white;
    }

    .select {
      width: 300px;
    }
  }

  &__main {
    display: flex;
    flex-direction: column;
    gap: 30px;

    &-title {
      font-size: 36px;
      font-weight: 500;
      color: $color-white;
    }

    &-input {
      width: 100%;
      height: 36px;
      padding: 10px 15px;
      border: 2px solid $color-yellow;
      outline: none;
      border-radius: 5px;
      box-sizing: border-box;

      &:disabled {
        color: $color-yellow;
      }
    }
  }
}
</style>