<template>
  <Search :lectures="lectures" @search-update="updateLectures($event)" />
  <table>
    <thead>
      <tr>
        <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="lecture in viewLectures" :key="lecture.id">
        <td>{{ lecture.lectureCode }}</td>
        <td>{{ lecture.name }}</td>
      </tr>
    </tbody>
  </table>
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
    Search
  },
  props: {
    msg: String,
  },
  data() {
    return {
      headers: ["ID", "Name"] as string[],
      lectures: [] as Lecture[],
      viewLectures: [] as Lecture[]
    };
  },
  methods: {
    updateLectures(lectures: Lecture[]) {
      this.viewLectures = lectures;
    }
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
