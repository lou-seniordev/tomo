import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
  test("status from props should be in the state", () => {
    const component = create(<ProfileStatus status ="test status"/>);
    const instance = component.getInstance();
    if(instance != null)
    expect(instance.state.status).toBe("test status");
  });
  test("after creation span should be displayed", () => {
    const component = create(<ProfileStatus status ="test status"/>);
    const instance = component.root;
    let span = instance.findByType("span");
    expect(span).not.toBeNull();
  });
  test("after creation input should't be displayed", () => {
    const component = create(<ProfileStatus status ="test status"/>);
    const instance = component.root;
    
    expect(()=>{
      let input = instance.findByType("input");
    }).toThrow();
  });
  test("after creation span should be displayed with correct status", () => {
    const component = create(<ProfileStatus status ="test status"/>);
    const instance = component.root;
    let span = instance.findByType("span");
    expect(span.children[0]).toBe("test status");
  });
  test("input should be displayed in edit mode", () => {
    const component = create(<ProfileStatus status ="test status"/>);
    const instance = component.root;
    let span = instance.findByType("span"); 
    span.props.onClick();
    let input = instance.findByType("input");
    expect(input.props.value).toBe("test status");
  });
  test("callBeck should be called", () => {
    let mockCallBeck = jest.fn();
    const component = create(<ProfileStatus status ="test status" updateStatus = {mockCallBeck}/>);
    const instance = component.getInstance();
    if(instance != null)
    instance.deActivateEditMode();
    expect(mockCallBeck.mock.calls.length).toBe(1);
  });
});