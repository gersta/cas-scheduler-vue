import LectureItem from "@/components/lecture-item/LectureItem.vue";
import { shallowMount } from "@vue/test-utils";

describe('LectureItem', () => {
    it('should return formatted date for firstBlockStart', () => {
        let anyDate = "2000-01-01";
        let anySecondBlock = { blockStart: anyDate, blockEnd: anyDate };

        let lecture = {
            blocks: [
                { blockStart: "2020-10-08", blockEnd: anyDate },
                anySecondBlock
            ]
        }

        let lectureItem = shallowMount(LectureItem, {
            props: { lecture }
        });

        expect(lectureItem.vm.firstBlockStart).toBe("08.10.2020");
    })

    it('should return formatted date for firstBlockEnd', () => {
        let anyDate = "2000-01-01";
        let anySecondBlock = { blockStart: anyDate, blockEnd: anyDate };

        let lecture = {
            blocks: [
                { blockStart: anyDate, blockEnd: "2020-10-08" },
                anySecondBlock
            ]
        }

        let lectureItem = shallowMount(LectureItem, {
            props: { lecture }
        });

        expect(lectureItem.vm.firstBlockEnd).toBe("08.10.2020");
    });

    it('should return formatted date for secondBlockStart', () => {
        let lecture = {
            blocks: [
                { },
                { blockStart: "2021-01-02" }
            ]
        }

        let lectureItem = shallowMount(LectureItem, {
            props: { lecture }
        });

        expect(lectureItem.vm.secondBlockStart).toBe("02.01.2021");
    });

    it('should return formatted date for secondBlockEnd', () => {
        let lecture = {
            blocks: [
                { },
                { blockEnd: "2021-01-02" }
            ]
        }

        let lectureItem = shallowMount(LectureItem, {
            props: { lecture }
        });

        expect(lectureItem.vm.secondBlockEnd).toBe("02.01.2021");
    });

    it('should return english lecture name if present', () => {
        let lecture = {
            blocks: [{}, {}],
            lectureNameEnglish: 'English lecture'
        }

        let lectureItem = shallowMount(LectureItem, {
            props: { lecture }
        });

        expect(lectureItem.vm.lectureNameEnglishOrNotAvailable).toBe("English lecture");
    })

    it('should return N/A info if english name not present', () => {
        let lecture = {
            blocks: [{}, {}],
            lectureNameEnglish: null
        }

        let lectureItem = shallowMount(LectureItem, {
            props: { lecture }
        });

        expect(lectureItem.vm.lectureNameEnglishOrNotAvailable).toBe("English name not available");
    })

    it('should render single day blocks as start and end on the same day', () => {
        let lecture = {
            blocks: [{
				"blockStart": "2021-01-23",
				"blockEnd": "2021-01-23",
				"singleDayBlock": true,
				"location": "HN",
				"filename": "W3M10001_start_2021-01-23_1st-Block.ics"
			}]
        }

        let lectureItem = shallowMount(LectureItem, {
            props: { lecture }
        });

        expect(lectureItem.vm.firstBlockStart).toBe("23.01.2021");
        expect(lectureItem.vm.firstBlockEnd).toBe("23.01.2021");
        expect(lectureItem.vm.firstBlockLocation).toBe("HN");
    })

    it('should set first block information to empty string for single blocks', () => {
        let lecture = {
            blocks: [{
				"blockStart": "2021-01-23",
				"blockEnd": "2021-01-23",
				"singleDayBlock": true,
				"location": "HN",
				"filename": "W3M10001_start_2021-01-23_1st-Block.ics"
			}]
        }

        let lectureItem = shallowMount(LectureItem, {
            props: { lecture }
        });

        expect(lectureItem.vm.secondBlockStart).toBe("");
        expect(lectureItem.vm.secondBlockEnd).toBe("");
        expect(lectureItem.vm.secondBlockLocation).toBe("");
    })
});