import Search from "@/components/shared/Search.vue";
import { mount, shallowMount } from "@vue/test-utils";

describe("Search.vue", () => {
  describe("getPropertyString", () => {
    const search = mount(Search, {});

    it("returns concatenated string for two string values", () => {
      const item = { name: "Dude", age: 18 };

      const result = search.vm.getPropertyString(item);

      expect(result).toBe("Dude18");
    });

    it("returns empty string for null object", () => {
      const result = search.vm.getPropertyString(null);

      expect(result).toBe("");
    });

    it("returns single value for primitive object", () => {
      const result = search.vm.getPropertyString("");

      expect(result).toBe("");
    });

    it("returns concatenated string of nested list properties", () => {
      const nestedItem = {
        name: "Dude",
        lectureCode: "T3M",
        blocks: [{ start: "2020-01-13", end: "2020-01-15" }],
      };

      const result = search.vm.getPropertyString(nestedItem);

      expect(result).toBe("DudeT3M2020-01-132020-01-15");
    });

    it("returns concatenated string of nested object properties", () => {
      const nestedItem = {
        name: "Dude",
        lectureCode: "T3M",
        block: { start: "2020-01-13", end: "2020-01-15" },
      };

      const result = search.vm.getPropertyString(nestedItem);

      expect(result).toBe("DudeT3M2020-01-132020-01-15");
    });

    it("returns non-string values as strings", () => {
      const item = {
        name: "Dude",
        age: 13,
      };

      const result = search.vm.getPropertyString(item);

      expect(result).toBe("Dude13");
    });

    it("returns only values for truthy properties on object", () => {
      const itemWithNullAsProperty = {
        name: null,
        age: 18,
      };

      const result = search.vm.getPropertyString(itemWithNullAsProperty);

      expect(result).toBe("18");
    });

    it("returns properties as strings", () => {
      const itemAsDigit = 9;

      const result = search.vm.getPropertyString(itemAsDigit);

      expect(result).toBe("9");
      expect(typeof result).toEqual("string");
    });
  });

  describe("search", () => {
    it("returns complete list for empty search string", () => {
      const items = [
        { name: "Dude", age: 18 },
        { name: "Mate", age: 15 },
      ];

      const search = shallowMount(Search, {
        data: function() {
          return { searchValue: "" };
        },
        props: { items },
      });

      expect(search.vm.activeItems).toEqual(items);
    });

    it("returns empty list for non matching search string", () => {
      const items = [
        { name: "Dude", age: 18 },
        { name: "Mate", age: 15 },
      ];

      const search = shallowMount(Search, {
        data: function() {
          return { searchValue: "XXXXXXXXX" };
        },
        props: { items },
      });

      expect(search.vm.activeItems).toEqual([]);
    });

    it("returns empty search list of null objects", () => {
      const items = [null, null];

      const search = shallowMount(Search, {
        data: function() {
          return { searchValue: "ABC" };
        },
        props: { items },
      });

      expect(search.vm.activeItems).toEqual([]);
    });

    it("returns non-empty list for list of primitive objects", () => {
      const items = ["Batman", "Superman"];

      const search = shallowMount(Search, {
        data: function() {
          return { searchValue: "Super" };
        },
        props: { items },
      });

      expect(search.vm.activeItems).toEqual(["Superman"]);
    });

    it("returns non-empty list for list of mixed objects", () => {
      const items = ["Batman", 9, null];

      const search = shallowMount(Search, {
        data: function() {
          return { searchValue: "Bat" };
        },
        props: { items },
      });

      expect(search.vm.activeItems).toEqual(["Batman"]);
    });

    it("returns complete list for lowercase searchValue", () => {
      const items = ["Hero"];

      const search = shallowMount(Search, {
        data: function() {
          return { searchValue: "hero" };
        },
        props: { items },
      });

      expect(search.vm.activeItems).toEqual(["Hero"]);
    });

    it("returns complete list for uppercase searchValue", () => {
      const items = ["hero"];

      const search = shallowMount(Search, {
        data: function() {
          return { searchValue: "HERO" };
        },
        props: { items },
      });

      expect(search.vm.activeItems).toEqual(["hero"]);
    });
  });
});
