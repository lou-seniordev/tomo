import React from "react";
import { create } from "react-test-renderer";
import Pagination from "./pagination";

describe("Pagination component", () => {
    test("pages count should be 10", () => {
      const component = create(<Pagination totalItemsCount={11} pageSize={1} portionSize={10} />);
      const root = component.root;
      let spans = root.findAllByType("span")
      expect(spans.length).toBe(10);
    });
    test("if pagecount more then 1 next button should be enable", () => {
        const component = create(<Pagination totalItemsCount={11} pageSize={1} portionSize={10} />);
        const root = component.root;
        let buttons = root.findAllByType("button")
        expect(buttons.length).toBe(1);
      });
    //   test("if pagecount more then 1 and we are not at first page should be both of buttons", () => {
    //     const component = create(<Pagination totalItemsCount={11} pageSize={1} portionSize={10} currentPage={2}/>);
    //     const root = component.root;
    //     let button = root.findByType("button");
    //     button.props.onClick();
    //     let buttons = root.findAllByType("button");
    //     expect(buttons.length).toBe(2);
    //   });
});
