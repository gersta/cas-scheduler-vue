<template>
  <tr
    data-view
    class="lecture-item hover:bg-gray-100 border-b"
    @click="$emit('click')"
    v-if="!isMobile"
  >
    <td class="cas-lecture-code py-2 px-4">{{ lecture.lectureCode }}</td>
    <td class="py-2 px-4">
      <div class="cas-lecture-name cas-text-color-standard">{{ lecture.lectureName }}</div>
      <div class="cas-lecture-name-eng">{{ lectureNameEnglishOrGermanReplacement }}</div>
      <ul v-if="lecture.additionalInformation?.length > 0" class="inline-flex text-sm">
        <li v-for="(add, index) in lecture.additionalInformation" :key="index">{{ index !== 0 ? "," : "" }} {{ add }}</li>
      </ul>
    </td>

    <td class="py-2">
      <div class="cas-lecture-first-block-start">{{ firstBlockStart }}</div>
      <div v-if="this.lecture.blocks[1]" class="cas-lecture-second-block-start">{{ secondBlockStart }}</div>
    </td>
    <td class="py-2">
      <div class="cas-lecture-first-block-end">{{ firstBlockEnd }}</div>
      <div v-if="this.lecture.blocks[1]" class="cas-lecture-second-block-end">{{ secondBlockEnd }}</div>
    </td>
    <td class="py-2">
      <div class="cas-lecture-first-block-location">{{ firstBlockLocation }}</div>
      <div v-if="this.lecture.blocks[1]" class="cas-lecture-second-block-location">{{ secondBlockLocation }}</div>
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
        class="text-left uppercase tracking-wide font-semibold cas-text-color-standard"
      >
        <span class="cas-lecture-code cas-text-color-standard">{{ lecture.lectureCode }}</span>: <span class="cas-lecture-name">{{ lecture.lectureName }}</span>
      </div>
      <p
        class="cas-lecture-name-eng text-left mt-1 text-sm font-medium text-black"
      >
        {{ lectureNameEnglishOrGermanReplacement }}
      </p>
      <ul v-if="lecture.additionalInformation?.length > 0" class="flex flex-row text-sm text-left text-black">
        <li v-for="(add, index) in lecture.additionalInformation" :key="index">{{ index !== 0 ? "," : "" }} {{ add }}</li>
      </ul>
      <hr class="mt-2" />
    </div>
    <div class="mt-2 text-left">
      <div class="cas-lecture-block">
        <span>First Lecture Block in <span class="cas-lecture-first-block-location">{{ firstBlockLocation }}</span></span>
        <div>
          <span class="cas-lecture-first-block-start cas-text-color-standard">{{ firstBlockStart }}</span> -
          <span class="cas-lecture-first-block-end cas-text-color-standard">{{ firstBlockEnd }}</span>
        </div>
      </div>
      <div class="mt-2 cas-lecture-block" v-if="this.lecture.blocks[1]">
        <span>Second Lecture Block in <span class="cas-lecture-second-block-location">{{ secondBlockLocation }}</span></span>
        <div>
          <span class="cas-lecture-second-block-start cas-text-color-standard">{{ secondBlockStart }}</span> -
          <span class="cas-lecture-second-block-end cas-text-color-standard">{{ secondBlockEnd }}</span>
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
    lectureNameEnglishOrGermanReplacement: function(): string {
      if (this.lecture?.lectureNameEnglish) {
        return this.lecture.lectureNameEnglish;
      }

      return this.lecture.lectureName;
    },
    firstBlockStart: function(): string {
      return asFormattedDate(this.lecture.blocks[0].blockStart);
    },
    secondBlockStart: function(): string {
      return this.lecture.blocks[1] ? asFormattedDate(this.lecture.blocks[1].blockStart) : "";
    },
    firstBlockEnd: function(): string {
      return asFormattedDate(this.lecture.blocks[0].blockEnd);
    },
    secondBlockEnd: function(): string {
      return this.lecture.blocks[1] ? asFormattedDate(this.lecture.blocks[1].blockEnd): "";
    },
    firstBlockLocation: function(): string {
      return this.lecture.blocks[0].location;
    },
    secondBlockLocation: function(): string {
      return this.lecture.blocks[1] ? this.lecture.blocks[1].location: "";
    },
  },
  emits: ["click"],
});
export default LectureItem;
</script>

<style scoped></style>
