<template>
  <div
    data-view
    class="z-50 fixed inset-0 flex justify-center items-center bg-black h-100 bg-opacity-50"
  >
    <div
      class="relative bg-white rounded-lg cas-border-color-standard w-9/12 xl:w-1/3 h-5/6 overflow-y-scroll"
    >
      <div class="m-4 text-left">
        <div class="flex flex-row font-bold cas-text-color-standard text-lg">
          <div class="flex-auto">{{ headline }}</div>

          <div
            class="modal-close-button flex-auto text-right"
            @click="$emit('closeModal')"
          >
            <button>X</button>
          </div>
        </div>
        <div class="font-semibold text-black text-sm">
          {{ subline }}
        </div>
        <div class="mb-2 text-sm">
          {{ description }}
        </div>
        <hr />
      </div>

      <div class="flex flex-col lg:flex-row justify-around ">
        <button
          v-for="(block, index) in lecture.blocks"
          :key="index"
          class="lg:w-2/3"
        >
          <a
            :href="getDownloadFilename(index)"
            download
            class="block-download flex m-4 rounded-lg border cursor-pointer cas-button-hover-indigo transition ease-in-out"
          >
            <div
              class="w-1/3 rounded-lg rounded-r-none bg-gray-100 flex justify-center items-center"
            >
              {{ block.location }}
            </div>
            <div class="p-1 w-full flex flex-col justify-center items-center">
              <div>
                <span class="cas-text-small">Start:</span>
                {{ getFormattedDate(index, "start") }}
              </div>
              <div>
                <span class="cas-text-small">End:</span>
                {{ getFormattedDate(index, "end") }}
              </div>
            </div>
          </a>
        </button>
      </div>

      <div class="cas-lecture-details m-4 text-left">
        <hr />
        <h1 class="cas-text-color-standard font-bold text-center my-2">
          Lecture details
        </h1>

        <div class="general mt-2">
          <h4 class="cas-text-color-standard font-semibold">General</h4>

          <div>
            <h5 class="font-semibold">Code</h5>
            <span class="cas-lecture-code">{{ lecture.lectureCode }}</span>
          </div>

          <div>
            <h5 class="font-semibold">Owner</h5>
            <span class="cas-lecture-owner">{{ lecture.owner }}</span>
          </div>

          <div>
            <h5 class="font-semibold">Language</h5>
            <span class="cas-lecture-language">{{ lecture.language }}</span>
          </div>

          <div class="mb-2">
            <h5 class="font-semibold">ECTS Points</h5>
            <span class="cas-lecture-ects">{{ lecture.ectsPoints }}</span>
          </div>

          <hr />
        </div>

        <div class="lecturing mt-2">
          <h4 class="cas-text-color-standard font-semibold">Lecturing</h4>

          <div>
            <h5 class="font-semibold">Lecturing forms</h5>
            <ul class="cas-lecture-forms">
              <li v-for="(form, index) in lecture.lecturingForms" :key="index">
                {{ form }}
              </li>
            </ul>
          </div>

          <div class="mb-2">
            <h5 class="font-semibold">Lecturing methods</h5>
            <ul class="cas-lecture-methods">
              <li
                v-for="(method, index) in lecture.lecturingMethods"
                :key="index"
              >
                {{ method }}
              </li>
            </ul>
          </div>

          <hr />
        </div>

        <div class="exam mt-2">
          <h4 class="cas-text-color-standard font-semibold">Exam</h4>

          <div>
            <h5 class="font-semibold">Type of Exam</h5>
            <span class="cas-lecture-exam">{{ lecture.exam }}</span>
          </div>

          <div>
            <h5 class="font-semibold">Duration</h5>
            <span class="cas-lecture-exam-duration">{{
              lecture.examDuration
            }}</span>
          </div>

          <div class="mb-2">
            <h5 class="font-semibold">Marked</h5>
            <span class="cas-lecture-exam-marking">{{
              lecture.examMarking
            }}</span>
          </div>

          <hr />
        </div>

        <div class="workload mt-2">
          <h4 class="cas-text-color-standard font-semibold">Workload</h4>

          <div>
            <h5 class="font-semibold">Total workload</h5>
            <span class="cas-lecture-workload-total">{{
              lecture.totalWorkload
            }}</span>
          </div>

          <div>
            <h5 class="font-semibold">Present workload</h5>
            <span class="cas-lecture-workload-present">{{
              lecture.presentWorkload
            }}</span>
          </div>

          <div class="mb-2">
            <h5 class="font-semibold">Self study workload</h5>
            <span class="cas-lecture-workload-selfstudy">{{
              lecture.selfStudyWorkload
            }}</span>
          </div>

          <hr />
        </div>

        <div class="cas-lecture-updated-on mt-2 text-sm text-gray-500">
          Updated on:
          <span class="cas-lecture-updated-on float-right">{{
            updatedOnFormatted
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent } from "vue";
import { asFormattedDate } from "@/components/shared/DateFormat";

const Modal = defineComponent({
  props: ["headline", "subline", "description", "lecture"],
  emits: ["closeModal"],
  computed: {
    updatedOnFormatted(): any {
      return asFormattedDate(this.lecture?.updatedOn);
    },
  },
  methods: {
    getFormattedDate(blockNumber: number, type: string): string {
      if (this.lecture?.blocks) {
        const blocks = this.lecture?.blocks;

        if (blocks[blockNumber]) {
          const block = this.lecture.blocks[blockNumber];

          if (type === "start") {
            return asFormattedDate(block.blockStart);
          } else {
            return asFormattedDate(block.blockEnd);
          }
        }
      }

      return "";
    },
    getDownloadFilename(blockNumber: number): string {
      if (this.lecture?.blocks) {
        const blocks = this.lecture?.blocks;

        if (blocks[blockNumber]) {
          const block = this.lecture.blocks[blockNumber];

          return block.filename ? "/ics/" + block.filename : "";
        }
      }

      return "";
    },
  },
});

export default Modal;
</script>

<style scoped></style>
