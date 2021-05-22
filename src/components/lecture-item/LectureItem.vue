<template>
  <tr
    data-view
    class="lecture-item hover:bg-gray-100 border-b"
    @click="$emit('click')"
    v-if="!isMobile"
  >
    <td class="cas-lecture-code py-2 px-4">{{ lecture.lectureCode }}</td>
    <td class="cas-lecture-name py-2 px-4">{{ lecture.lectureName }}</td>
    <td class="cas-lecture-name-eng py-2 px-4">{{ lecture.lectureNameEnglish }}</td>
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
    data-view
    class="lecture-item p-8 mt-4 mx-2 bg-white rounded-xl overflow-hidden border border-black"
    @click="$emit('click')"
    v-if="isMobile"
  >
    <div>
      <div
        class="cas-lecture-code text-left uppercase tracking-wide font-semibold cas-text-color-standard"
      >
        {{ lecture.lectureCode }}: {{ lecture.lectureName }}
      </div>
      <p
        class="cas-lecture-name-eng text-left block mt-1 text-sm leading-tight font-medium text-black"
      >
        {{ lecture.lectureNameEnglish }}
      </p>
      <hr class="mt-2" />
    </div>
    <div class="mt-2 text-left">
      <div class="cas-lecture-block">
        <span>First Lecture Block</span>
        <div>
          <span class="cas-text-color-standard">{{ firstBlockStart }}</span> -
          <span class="cas-text-color-standard">{{ firstBlockEnd }}</span>
        </div>
      </div>
      <div class="mt-2 cas-lecture-block">
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
