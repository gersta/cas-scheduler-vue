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

    describe('Formatted Date', () => {

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

        it('should return fallback charecter for missing block', () => {
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
});