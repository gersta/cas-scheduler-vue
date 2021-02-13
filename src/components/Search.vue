<template>
  <div class="flex flex-col max-w-md mx-2 lg:mx-auto">
    <input
      class="h-9 border rounded-xl shadow-md text-center placeholder-indigo-500"
      type="text"
      v-model="searchValue"
      @input="search()"
      :placeholder="placeholder"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

const Search = defineComponent({
  props: {
    placeholder: {
      type: String,
    },
    items: {
      type: Array as PropType<any[]>,
      default: () => {
        return [] as any[];
      },
    },
  },
  data() {
    return {
      searchValue: "",
    };
  },
  methods: {
    search() {
      this.$emit("search-update", this.activeItems);
    },
    getPropertyString(item: any): string {
      let propertyString = "";

      if (!item) {
        return propertyString;
      }

      if (typeof item === "object") {
        Object.keys(item).forEach((prop) => {
          if (typeof item[prop] === "object") {
            propertyString =
              propertyString + this.getPropertyString(item[prop]);
          } else {
            propertyString = propertyString + item[prop].toString();
          }
        });
      } else {
        return item.toString();
      }

      return propertyString;
    },
  },
  emits: ["search-update"],
  computed: {
    activeItems(): any[] {
      return this.items.filter((item) =>
        this.getPropertyString(item)
          .toLowerCase()
          .includes(this.searchValue.toLowerCase())
      );
    },
  },
});
export default Search;
</script>

<style scoped></style>
