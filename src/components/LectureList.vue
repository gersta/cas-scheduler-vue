<template>
  <div>
    <Search
    class="mt-2 placeholder-indigo-500 text-center border rounded-lg border-indigo-500"
    :items="lectures"
    :placeholder="'Type to search lectures'"
    @search-update="updateLectures($event)"
  />

  <table
    class="my-4 mx-4 w-full hidden xl:table text-left "
  >
    <thead>
      <tr class="text-indigo-500 font-bolt uppercase border-b border-black">
        <th class="py-2 px-4 bg-gray-50">Code</th>
        <th class="py-2 px-4 bg-gray-50">Name</th>
        <th class="py-2 px-4 bg-gray-50">First Block</th>
        <th class="py-2 px-4 bg-gray-50">Second Block</th>
      </tr>
    </thead>
    <tbody>
      <LectureItem v-for="lecture in viewLectures" :key="lecture.id" :lecture="lecture" :isMobile="false" />
    </tbody>
  </table>

  <div
    class="xl:hidden mb-2"
  >
    <hr class="mt-4 w-4/5 mx-auto">

    <LectureItem
    v-for="lecture in viewLectures"
    :key="lecture.id"
    :lecture="lecture"
    :isMobile="true" />
  </div>
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
