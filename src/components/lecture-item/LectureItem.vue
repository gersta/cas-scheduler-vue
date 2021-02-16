<template>
  <tr
    class="hover:bg-gray-100 border-b"
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { asFormattedDate } from "../shared/DateFormat"

interface Lecture {
  id: number;
  lectureCode: string;
  name: string;
}

const LectureItem = defineComponent({
  props: ['lecture'],
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
    }
  }
});
export default LectureItem;
</script>

<style scoped></style>
