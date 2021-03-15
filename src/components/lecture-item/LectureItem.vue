<template>
  <tr
    class="lecture-item hover:bg-gray-100 border-b"
    @click="$emit('click')"
    v-if="!isMobile"
  >
    <td class="py-2 px-4">{{ lecture.lectureCode }}</td>
    <td class="py-2 px-4">{{ lecture.name }}</td>
    <td>
      <span class="py-2 px-4">{{ firstBlockStart }}</span> -
      <span class="py-2 px-4">{{ firstBlockEnd }}</span>
    </td>
    <td>
      <span class="py-2 px-4">{{ secondBlockStart }}</span> -
      <span class="py-2 px-4">{{ secondBlockEnd }}</span>
    </td>
  </tr>

  <div
    class="lecture-item p-8 mt-4 mx-2 bg-white rounded-xl overflow-hidden border border-black"
    @click="$emit('click')"
    v-if="isMobile"
  >
    <div>
      <div
        class="text-left uppercase tracking-wide font-semibold cas-text-color-standard"
      >
        {{ lecture.lectureCode }}
      </div>
      <p
        class="text-left block mt-1 text-lg leading-tight font-medium text-black"
      >
        {{ lecture.name }}
      </p>
      <hr class="mt-2" />
    </div>
    <div class="mt-2 text-left">
      <div>
        <span>First Lecture Block</span>
        <div>
          <span class="cas-text-color-standard">{{ firstBlockStart }}</span> -
          <span class="cas-text-color-standard">{{ firstBlockEnd }}</span>
        </div>
      </div>
      <div class="mt-2">
        <span>Second Lecture Block</span>
        <div>
          <span class="cas-text-color-standard">{{ secondBlockStart }}</span> -
          <span class="cas-text-color-standard">{{ secondBlockEnd }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { asFormattedDate } from "../shared/DateFormat";

const LectureItem = defineComponent({
  props: ["lecture", "isMobile"],
  computed: {
    firstBlockStart: function(): string {
      return asFormattedDate(this.lecture.blocks[0].blockStart);
    },
    secondBlockStart: function(): string {
      return asFormattedDate(this.lecture.blocks[1].blockStart);
    },
    firstBlockEnd: function(): string {
      return asFormattedDate(this.lecture.blocks[0].blockEnd);
    },
    secondBlockEnd: function(): string {
      return asFormattedDate(this.lecture.blocks[1].blockEnd);
    },
  },
  emits: ["click"],
});
export default LectureItem;
</script>

<style scoped></style>
