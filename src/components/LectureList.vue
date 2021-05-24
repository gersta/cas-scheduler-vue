<template>
  <div data-view>
    <div class="xl:h-auto sticky top-0 py-4 mt-2 mx-2 bg-white h-20">
      <Search
        class="lecture-search w-full h-full lg:w-max placeholder-indigo-500 text-center border rounded-lg border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        :items="lectures"
        :placeholder="'Type to search lectures'"
        @search-update="updateLectures($event)"
      />
    </div>

    <table class="my-4 mx-4 w-full hidden xl:table text-left ">
      <thead>
        <colgroup></colgroup>
        <colgroup></colgroup>
        <colgroup span="3"></colgroup>
        <tr
          class="cas-text-color-standard font-bolt uppercase"
        >
          <th rowspan="2" class="py-2 px-4">Code</th>
          <th rowspan="2" class="py-2 px-4">Name</th>
          <th colspan="3" class="py-2">Blocks</th>
        </tr>
        <tr>
          <th>Start</th>
          <th>End</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        <LectureItem
          v-for="lecture in viewLectures"
          :key="lecture.id"
          :lecture="lecture"
          :isMobile="false"
          @click="toggleModal(lecture)"
        />
      </tbody>
    </table>

    <div class="xl:hidden mb-2">
      <LectureItem
        v-for="lecture in viewLectures"
        :key="lecture.id"
        :lecture="lecture"
        :isMobile="true"
        @click="toggleModal(lecture)"
      />
    </div>

    <Modal
      class="lecture-modal"
      @closeModal="toggleModal({})"
      v-if="modal.isVisible"
      :lecture="modal.lecture"
      :lectureName="modal.lecture.lectureName"
      :lectureNameEnglish="modal.lecture.lectureNameEnglish"
      :description="
        'Download the ics files for the lecture to save in your personal calendar.'
      "
    />
  </div>
</template>

<script lang="ts">
import lectures from "@/assets/lecture-modules.json";
import { defineComponent } from "vue";
import Search from "./shared/Search.vue";
import LectureItem from "./lecture-item/LectureItem.vue";
import Modal from "@/components/shared/Modal.vue";

const LectureList = defineComponent({
  components: {
    Search,
    LectureItem,
    Modal,
  },
  data() {
    return {
      lectures: [] as any[],
      viewLectures: [] as any[],
      modal: {
        isVisible: false,
        lecture: {} as any,
      },
    };
  },
  methods: {
    updateLectures(lectures: any[]) {
      this.viewLectures = lectures;
    },
    toggleModal(lecture: any) {
      this.modal.isVisible = !this.modal.isVisible;

      this.modal.lecture = lecture;
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
<style scoped></style>
