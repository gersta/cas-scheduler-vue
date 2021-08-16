import { shallowMount } from "@vue/test-utils";
import  Modal from "@/components/shared/Modal.vue";

describe('Modal', () => {

    describe('Download Filename', () => {
        it('should build filename from lecure block', () => {
            let lecture = {
                blocks: [
                    {
                        filename: "Example_Filename.ics"
                    }
                ]
            };

            let modal = shallowMount(Modal, {
                props: { lecture }
            });

            const result = modal.vm.getDownloadFilename(0);

            expect(result).toBe('/ics/Example_Filename.ics');
        });
    
        it('should return empty filename for invalid lecture block', () => {
            let lecture = {
                blocks: [
                    {
                        wrongPropertyName: "Example_Filename.ics"
                    }
                ]
            };

            let modal = shallowMount(Modal, {
                props: { lecture }
            });

            const result = modal.vm.getDownloadFilename(0);

            expect(result).toBe('');
        })

        it('should return empty filename for missing lecture block', () => {
            let lecture = {};

            let modal = shallowMount(Modal, {
                props: { lecture }
            });

            const result = modal.vm.getDownloadFilename(0);

            expect(result).toBe('');
        })

        it('should return empty filename for empty lecture block filename', () => {
            let lecture = {
                blocks: [
                    {
                        filename: ""
                    }
                ]
            };

            let modal = shallowMount(Modal, {
                props: { lecture }
            });

            const result = modal.vm.getDownloadFilename(0);

            expect(result).toBe('');
        })
    
        it('should prepend hostname to filename', () => {

        })
    });

    describe('Formatted Block Date', () => {

        it('should return block start for start type', () => {
            let lecture = {
                blocks: [
                    {
                        blockStart: "2020-10-08"
                    }
                ]
            };

            let modal = shallowMount(Modal, {
                props: { lecture }
            });

            const result = modal.vm.getFormattedDate(0, "start");

            expect(result).toBe("08.10.2020")
        });

        it('should return block end for end type', () => {
            let lecture = {
                blocks: [
                    {
                        blockEnd: "2020-10-08"
                    }
                ]
            };

            let modal = shallowMount(Modal, {
                props: { lecture }
            });

            const result = modal.vm.getFormattedDate(0, "end");

            expect(result).toBe("08.10.2020")
        })

        it('should return block end for any other type', () => {
            let lecture = {
                blocks: [
                    {
                        blockEnd: "2020-10-08"
                    }
                ]
            };

            let modal = shallowMount(Modal, {
                props: { lecture }
            });

            const result = modal.vm.getFormattedDate(0, "other");

            expect(result).toBe("08.10.2020")
        })

        it('should return fallback character for missing block', () => {
            let lecture = {
                blocks: [
                ]
            };

            let modal = shallowMount(Modal, {
                props: { lecture }
            });

            const result = modal.vm.getFormattedDate(0, "end");

            expect(result).toBe("")
        })
    })

    describe('Formatted updated-on date', () => {        


        it('should return lecture updatedOn date', () => {
            let lecture = {
                updatedOn: '2021-05-22'
            };

            const modal = shallowMount(Modal, {
                props: { lecture }
            });

            const result = modal.vm.updatedOnFormatted;

            expect(result).toBe("22.05.2021");
        })

        xit('should return fallback character for missing lecture updatedOn date', () => {
            let lecture = {};

            const modal = shallowMount(Modal, {
                props: { lecture }
            });

            const result = modal.vm.updatedOnFormatted;

            expect(result).toEqual("");
        })
    })

    describe('English lecture name', () => {
        it('should display english lecture name from lecture', () => {
            let lecture = {};
            let lectureNameEnglish = "English lecture";

            const modal = shallowMount(Modal, {
                props: { lecture, lectureNameEnglish }
            });

            const result = modal.vm.lectureNameEnglishOrGermanReplacement;

            expect(result).toEqual("English lecture");
        })

        it('should display standard lecture name if english lecture name is not available', () => {
            let lecture = {
                lectureName: "German name"
            };
            let lectureNameEnglish = null;

            const modal = shallowMount(Modal, {
                props: { lecture, lectureNameEnglish }
            });

            const result = modal.vm.lectureNameEnglishOrGermanReplacement;

            expect(result).toEqual("German name");
        })
    })
});