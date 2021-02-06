<template>
    <input
        type="text"
        v-model="searchValue"
        @input="search()"
        placeholder="Type to search"
    />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface Lecture {
  id: number;
  lectureCode: string;
  name: string;
}

const Search = defineComponent({
    props: {
        lectures: {
            type: Array as PropType<Lecture[]>,
            default: () => {
                return [] as Lecture[];
            }
        }
    },
    data() {
        return {
            searchValue: ""
        }
    },
    methods: {
        search() {
            this.$emit('search-update', this.activeLectures)
        }
    },
    emits: ['search-update'],
    computed: {
        activeLectures(): Lecture[] {
            return this.lectures.filter(lecture => lecture.name.includes(this.searchValue));
        }
    }
})
export default Search;

</script>

<style scoped>

</style>