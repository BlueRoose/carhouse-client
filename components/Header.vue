<template>
  <div class="bg-main-dark border-b border-white">
    <header class="h-[127px] flex justify-between items-center container px-4 mx-auto">
      <Logo />
      <div class="flex gap-12 max-lg:gap-6 max-md:hidden list-none">
        <NuxtLink
          v-for="(link, index) in links"
          :key="index"
          class="text-main-gray text-xl transition-colors ease-linear hover:text-white"
          :to="link.url"
        >
          {{ link.label }}
        </NuxtLink>
      </div>
      <div
        v-if="isAuth"
        class="flex items-center gap-3 cursor-pointer relative group max-md:hidden"
        @click="isUserClicked = true"
      >
        <IconsUserIcon class="icon group-hover:text-main-yellow" :class="{ '!text-main-yellow': isUserClicked }" />
        <p class="transition-all ease-linear text-white group-hover:text-main-yellow data" :class="{ '!text-main-yellow': isUserClicked }">
          {{ `${user.name} ${user.surname}` }}
        </p>
        <Transition name="fade">
          <div
            v-if="isUserClicked"
            ref="userBlock"
            class="w-[300px] py-5 bg-white rounded-2xl shadow-[rgba(99,99,99,0.2)_0_2px_8px_0] absolute top-[110%] right-0 z-[5] cursor-auto"
          >
            <p class="text-xl font-semibold pl-2.5 mb-1">{{ `${user.name} ${user.surname}` }}</p>
            <p class="text-sm pl-2.5 mb-4">{{ user.email }}</p>
            <div
              class="py-1 px-2.5 flex items-center gap-4 cursor-pointer transition-all ease-linear border-b border-transparent hover:border-main-yellow"
              :class="{  'text-main-yellow': route.path === '/favourites' }"
              @click="event => openPage('favourites', event)"
            >
              <IconsHeartIcon class="w-6 h-6" />
              <p>Favourites</p>
            </div>
            <div
              class="py-1 px-2.5 flex items-center gap-4 cursor-pointer transition-all ease-linear border-b border-transparent hover:border-main-yellow"
              :class="{  'text-main-yellow': route.path === '/orders' }"
              @click="event => openPage('orders', event)"
            >
              <IconsCartIcon class="w-6 h-6" />
              <p>Orders</p>
            </div>
            <div
              v-if="user.role === 'ADMIN'"
              class="py-1 px-2.5 flex items-center gap-4 cursor-pointer transition-all ease-linear border-b border-transparent hover:border-main-yellow"
              @click="event => openPage('admin/brands-types', event)"
            >
              <IconsLockIcon class="w-6 h-6" />
              <p>Admin panel</p>
            </div>
            <div class="py-1 px-2.5 flex items-center gap-4 cursor-pointer transition-all ease-linear border-b border-transparent hover:border-main-yellow" @click="logout">
              <IconsLogoutIcon class="w-6 h-6" />
              <p>Logout</p>
            </div>
          </div>
        </Transition>
      </div>
      <Button v-else class="max-md:hidden" @click="openAuthModal">Login</Button>
      <div
        class="p-2 bg-main-yellow rounded-xl hidden max-md:block cursor-pointer"
        @click="handleClickBurger"
      >
        <XMarkIcon v-if="isBurgerOpened" />
        <BurgerIcon v-else />
      </div>
      <div class="w-full h-[0%] bg-main-dark hidden max-md:block fixed top-[127px] left-0 z-10 transition-all ease-linear px-4" :class="{ '!h-full border-t': isBurgerOpened }">
        <template v-if="isAuth">
          <div
            v-if="isBurgerOpened"
            class="w-full flex flex-col gap-3 cursor-pointer relative md:hidden mx-auto pt-4"
            @click="isUserClicked = true"
          >
            <div class="text-white flex flex-col">
              <p class="text-xl font-semibold pl-2.5 mb-1">{{ `${user.name} ${user.surname}` }}</p>
              <p class="text-sm pl-2.5 mb-4">{{ user.email }}</p>
              <div class="grid grid-cols-2 gap-4">
                <div
                    class="w-full h-20 rounded-2xl text-black bg-main-yellow flex flex-col justify-center items-center gap-1 cursor-pointer transition-all ease-linear border-b border-transparent hover:border-main-yellow"
                    @click="event => openPage('favourites', event)"
                >
                  <IconsHeartIcon class="w-6 h-6" />
                  <p>Favourites</p>
                </div>
                <div
                    class="w-full h-20 rounded-2xl text-black bg-main-yellow flex flex-col justify-center items-center gap-1 cursor-pointer transition-all ease-linear border-b border-transparent hover:border-main-yellow"
                    @click="event => openPage('orders', event)"
                >
                  <IconsCartIcon class="w-6 h-6" />
                  <p>Orders</p>
                </div>
                <div
                    v-if="user.role === 'ADMIN'"
                    class="w-full h-20 rounded-2xl text-black bg-main-yellow flex flex-col justify-center items-center gap-1 cursor-pointer transition-all ease-linear border-b border-transparent hover:border-main-yellow"
                    @click="event => openPage('admin/brands-types', event)"
                >
                  <IconsLockIcon class="w-6 h-6" />
                  <p>Admin panel</p>
                </div>
                <div class="w-full h-20 rounded-2xl text-black bg-main-yellow flex flex-col justify-center items-center gap-1 cursor-pointer transition-all ease-linear border-b border-transparent hover:border-main-yellow" @click="logout">
                  <IconsLogoutIcon class="w-6 h-6" />
                  <p>Logout</p>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <Button
            v-if="isBurgerOpened"
            class="md:hidden mx-auto mt-5"
            @click="openAuthModal"
          >
            Login
          </Button>
        </template>
        <div v-if="isBurgerOpened" class="flex flex-col gap-4 mt-10 items-center list-none">
          <p class="text-white text-2xl font-bold">Quick links</p>
          <NuxtLink
            v-for="(link, index) in links"
            :key="index"
            class="text-main-gray text-xl transition-colors ease-linear hover:text-white"
            :to="link.url"
            @click="isBurgerOpened = false"
          >
            {{ link.label }}
          </NuxtLink>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/store/auth.js";
import { useModalsStore } from "@/store/modals.js";
import BurgerIcon from "@/components/Icons/BurgerIcon.vue";
import XMarkIcon from "@/components/Icons/XMarkIcon.vue";

const links = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "About",
    url: "/about",
  },
  {
    label: "Services",
    url: "/services",
  },
  {
    label: "Collections",
    url: "/collections",
  },
];

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();
const modalsStore = useModalsStore();

const { isAuth, user } = storeToRefs(authStore);

const userBlock = ref(null);
const isUserClicked = ref(false);
const isBurgerOpened = ref(false);

onClickOutside(userBlock, () => isUserClicked.value = false);

function handleClickBurger() {
  isBurgerOpened.value = !isBurgerOpened.value;
  if (isBurgerOpened.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}

function openAuthModal() {
  modalsStore.showAuthModal();
  modalsStore.toggleIsModal();
}

function openPage(page, event) {
  event.stopPropagation();
  router.push(`/${page}`);
  isUserClicked.value = false;
  isBurgerOpened.value = false;
  document.body.style.overflow = "auto";
}

function logout() {
  authStore.logout();
}
</script>

<style lang="scss" scoped>
.router-link-active {
  color: $color-yellow !important;
}
</style>