<template>
  <div v-if="requests.length" class="h-full p-5 bg-main-dark flex overflow-hidden container mx-auto px-4">
    <div class="w-1/2 pr-5 overflow-auto flex flex-col gap-5">
      <RequestCard
        v-for="(request, index) in requests"
        :key="index"
        :request="request"
        :selected="request.id === selectedRequestId"
        @click="selectRequest(request.id)"
      />
    </div>
    <div v-if="selectedRequest" class="w-1/2 flex flex-col items-center">
      <div v-if="!selectedRequest.isResolved" class="text-white mb-12">
        <p class="text-white text-2xl mb-5">Write an answear</p>
        <div v-if="editor" class="mb-4">
          <button class="py-[3px] px-1.5 bg-main-yellow rounded-2xl border-[2px] border-transparent cursor-pointer" @click="editor.chain().focus().toggleBold().run()" :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ '!border-white': editor.isActive('bold') }">
            Bold
          </button>
          <button class="py-[3px] px-1.5 bg-main-yellow rounded-2xl border-[2px] border-transparent cursor-pointer" @click="editor.chain().focus().toggleItalic().run()" :disabled="!editor.can().chain().focus().toggleItalic().run()" :class="{ '!border-white': editor.isActive('italic') }">
            Italic
          </button>
          <button class="py-[3px] px-1.5 bg-main-yellow rounded-2xl border-[2px] border-transparent cursor-pointer" @click="editor.chain().focus().toggleStrike().run()" :disabled="!editor.can().chain().focus().toggleStrike().run()" :class="{ '!border-white': editor.isActive('strike') }">
            Strike
          </button>
          <button class="py-[3px] px-1.5 bg-main-yellow rounded-2xl border-[2px] border-transparent cursor-pointer" @click="editor.chain().focus().setParagraph().run()" :class="{ '!border-white': editor.isActive('paragraph') }">
            Paragraph
          </button>
          <button class="py-[3px] px-1.5 bg-main-yellow rounded-2xl border-[2px] border-transparent cursor-pointer" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ '!border-white': editor.isActive('heading', { level: 1 }) }">
            h1
          </button>
          <button class="py-[3px] px-1.5 bg-main-yellow rounded-2xl border-[2px] border-transparent cursor-pointer" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ '!border-white': editor.isActive('heading', { level: 2 }) }">
            h2
          </button>
          <button class="py-[3px] px-1.5 bg-main-yellow rounded-2xl border-[2px] border-transparent cursor-pointer" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ '!border-white': editor.isActive('heading', { level: 3 }) }">
            h3
          </button>
          <button class="py-[3px] px-1.5 bg-main-yellow rounded-2xl border-[2px] border-transparent cursor-pointer" @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ '!border-white': editor.isActive('heading', { level: 4 }) }">
            h4
          </button>
          <button class="py-[3px] px-1.5 bg-main-yellow rounded-2xl border-[2px] border-transparent cursor-pointer" @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" :class="{ '!border-white': editor.isActive('heading', { level: 5 }) }">
            h5
          </button>
          <button class="py-[3px] px-1.5 bg-main-yellow rounded-2xl border-[2px] border-transparent cursor-pointer" @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" :class="{ '!border-white': editor.isActive('heading', { level: 6 }) }">
            h6
          </button>
          <button class="py-[3px] px-1.5 bg-main-yellow rounded-2xl border-[2px] border-transparent cursor-pointer" @click="editor.chain().focus().toggleBulletList().run()" :class="{ '!border-white': editor.isActive('bulletList') }">
            Bullet list
          </button>
          <button class="py-[3px] px-1.5 bg-main-yellow rounded-2xl border-[2px] border-transparent cursor-pointer" @click="editor.chain().focus().toggleOrderedList().run()" :class="{ '!border-white': editor.isActive('orderedList') }">
            Ordered list
          </button>
        </div>
        <editor-content :editor="editor" />
        <Button
          class="mt-6"
          :isLoading="isLoading.send"
          @click="sendAnswear"
        >
          Send an answear
        </Button>
      </div>
      <p class="text-white text-2xl mb-5">Delete request</p>
      <Button :isLoading="isLoading.delete" @click="deleteRequest">Delete</Button>
    </div>
  </div>
  <div v-else class="w-fit h-fit fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-white">
    <h2>No user requests were found</h2>
  </div>
</template>

<script setup>
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { useNotificationsStore } from "@/store/notifications.js";
import api from "@/api";

const notificationsStore = useNotificationsStore();

const { successMessage, errorMessage } = storeToRefs(notificationsStore);

const isLoading = reactive({
  send: false,
  delete: false,
});
const requests = ref([]);
const selectedRequestId = ref(null);
const editor = ref(null);
const editorValue = ref("");

const selectedRequest = computed(() => requests.value.find(request => request.id === selectedRequestId.value));

onMounted(async () => {
  editor.value = new Editor({
    content: '<p>Write your answear</p>',
    extensions: [
      StarterKit,
    ],
    onUpdate: (event) => {
      editorValue.value = event.editor.getHTML();
    },
  });

  try {
    const response = await api.getAllRequests();
    requests.value = response.requests;
  } catch (e) {
    errorMessage.value = e;
    setTimeout(() => errorMessage.value = "", 2000);
  }
});

onBeforeUnmount(() => editor.value.destroy());

function selectRequest(id) {
  if (selectedRequest.value === id) {
    selectedRequestId.value = null;
  } else {
    selectedRequestId.value = id;
  }
}

async function sendAnswear() {
  isLoading.delete = true;
  try {
    await api.sendAnswear(selectedRequestId.value, editorValue.value);
    requests.value.find(request => request.id === selectedRequestId.value).isResolved = true;
  } catch (e) {
    errorMessage.value = e;
    setTimeout(() => errorMessage.value = "", 2000);
  } finally {
    isLoading.delete = false;
  }
}

async function deleteRequest() {
  isLoading.delete = true;
  try {
    await api.deleteRequest(selectedRequestId.value);
    requests.value = requests.value.filter(request => request.id !== selectedRequestId.value);
    selectedRequestId.value = null;
  } catch (e) {
    errorMessage.value = e;
    setTimeout(() => errorMessage.value = "", 2000);
  } finally {
    isLoading.delete = false;
  }
}

definePageMeta({
  layout: "admin",
});
</script>

<style lang="scss">
.user-requests {
  height: 100%;
  padding: 20px;
  background-color: $color-dark;
  display: flex;
  overflow: hidden;

  &__requests {
    width: 50%;
    padding-right: 20px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__actions {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;

    &-title {
      font-size: 24px;
      color: $color-white;
      margin-bottom: 20px;
    }

    &__editor {
      color: $color-white;
      margin-bottom: 50px;

      .editor-button {
        padding: 3px 6px;
        background-color: $color-yellow;
        border-radius: 15px;
        cursor: pointer;

        &.is-active {
          border: 2px solid $color-white;
        }
      }

      p {
        margin: 25px 0;
      }

      .button {
        margin: 0 auto;
      }
    }
  }
}

.no-requests {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  color: $color-white;
}
</style>