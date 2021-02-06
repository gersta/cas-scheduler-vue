<template>
  <Search
    :lectures="lectures"
    :placeholder="'Type to search lectures'"
    @search-update="updateLectures($event)"
  />

  <div
    class="max-w-md mx-2 lg:mx-auto bg-wite rounded-xl shadow-md overflow-hidden"
    v-for="lecture in viewLectures"
    :key="lecture.id"
  >
    <div class="p-8 text-left">
      <div>
        <div class="uppercase tracking-wide font-semibold text-indigo-500">
          {{ lecture.lectureCode }}
        </div>
        <p class="block mt-1 text-lg leading-tight font-medium text-black">{{ lecture.name }}</p>
      </div>
      <div class="mt-2">
        <div>
          First Block <span class="text-indigo-500">{{ lecture.blocks[0].blockStart }}</span> - <span class="text-indigo-500">{{ lecture.blocks[0].blockEnd }}</span>
        </div>
        <div>
          Second Block <span class="text-indigo-500">{{ lecture.blocks[1].blockStart }}</span> - <span class="text-indigo-500">{{ lecture.blocks[1].blockEnd }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import lectures from "@/assets/lectures.json";
import { defineComponent } from "vue";
import Search from "./Search.vue";

interface Lecture {
  id: number;
  lectureCode: string;
  name: string;
}

const LectureList = defineComponent({
  components: {
    Search,
  },
  props: {
    msg: String,
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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
