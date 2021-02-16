<template>
  <div>
    <Search
    class="placeholder-indigo-500 text-center border rounded-lg border-indigo-500"
    :items="lectures"
    :placeholder="'Type to search lectures'"
    @search-update="updateLectures($event)"
  />
    <div
      class="xl:hidden mt-4 mx-2 bg-white rounded-xl shadow-md overflow-hidden "
      v-for="lecture in viewLectures"
      :key="lecture.id"
    >
      <div class="p-8 text-left">
        <div>
          <div class="uppercase tracking-wide font-semibold text-indigo-500">
            {{ lecture.lectureCode }}
          </div>
          <p class="block mt-1 text-lg leading-tight font-medium text-black">
            {{ lecture.name }}
          </p>
        </div>
        <div class="mt-2">
          <div>
            First Block
            <span class="text-indigo-500">{{
              lecture.blocks[0].blockStart
            }}</span>
            -
            <span class="text-indigo-500">{{
              lecture.blocks[0].blockEnd
            }}</span>
          </div>
          <div>
            Second Block
            <span class="text-indigo-500">{{
              lecture.blocks[1].blockStart
            }}</span>
            -
            <span class="text-indigo-500">{{
              lecture.blocks[1].blockEnd
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <table
      class="mt-2 mx-4 w-full sm:hidden xl:table text-left "
    >
      <thead>
        <tr class="text-indigo-500 font-bolt uppercase border-b border-indigo-500">
          <th class="py-2 px-4 bg-gray-50">Code</th>
          <th class="py-2 px-4 bg-gray-50">Name</th>
          <th class="py-2 px-4 bg-gray-50">First Block</th>
          <th class="py-2 px-4 bg-gray-50">Second Block</th>
        </tr>
      </thead>
      <tbody>
        <LectureItem v-for="lecture in viewLectures" :key="lecture.id" :lecture="lecture" />
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import lectures from "@/assets/lectures.json";
import { defineComponent } from "vue";
import Search from "./shared/Search.vue";
import LectureItem from "./lecture-item/LectureItem.vue";

interface Lecture {
  id: number;
  lectureCode: string;
  name: string;
}

const LectureList = defineComponent({
  components: {
    Search,
    LectureItem
  },
  data() {
    return {
      headers: ["ID", "Name"] as string[],
      lectures: [] as Lecture[],
      viewLectures: [] as Lecture[],
    };
  },
  methods: {
    updateLectures(lectures: Lecture[]) {
      this.viewLectures = lectures;
    },
  },
  mounted() {
    this.lectures = lectures;
    this.viewLectures = lectures;
  },
});
export default LectureList;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
