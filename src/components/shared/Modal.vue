<template>
  <div
    class="z-50 fixed inset-0 flex justify-center items-center bg-black h-100 overflow-hidden bg-opacity-50"
  >
    <div
      class="relative bg-white rounded-lg cas-border-color-standard w-9/12 xl:w-1/3"
    >
      <div class="m-4 text-left">
        <div class="font-bold cas-text-color-standard text-lg">
          {{ headline }}
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
            class="flex m-4 rounded-lg border cursor-pointer cas-button-hover-indigo transition ease-in-out"
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
      <div
        class="modal-close-button m-4 object-bottom"
        @click="$emit('closeModal')"
      >
        <hr />
        <button class="mt-2">Close</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent } from "vue";
import { asFormattedDate } from "@/components/shared/DateFormat";

const Modal = defineComponent({
  props: ["headline", "description", "lecture"],
  emits: ["closeModal"],
  methods: {
    getFormattedDate(blockNumber: number, type: string): string {
      if ( this.lecture?.blocks ) {
        const blocks = this.lecture?.blocks;

        if ( blocks[blockNumber] ) {
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
      if ( this.lecture?.blocks ) {
        const blocks = this.lecture?.blocks;

        if ( blocks[blockNumber] ) {
          const block = this.lecture.blocks[blockNumber];

          return block.filename? block.filename : "";
        }
      }

      return "";
    },
  },
});

export default Modal;
</script>

<style scoped></style>
