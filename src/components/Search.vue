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
import { defineComponent, PropType } from 'vue'

interface Lecture {
  id: number;
  lectureCode: string;
  name: string;
}

const Search = defineComponent({
    props: {
        placeholder: {
            type: String
        },
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