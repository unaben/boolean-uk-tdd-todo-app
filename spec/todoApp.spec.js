const todoApp = require("../src/todoApp.js");

describe("Todo App", () => {
  // manual teardown
  beforeEach(() => {
    todoApp.id = 0;
    todoApp.items = [];
  });

  it("creates a todo item", () => {
    //setup
    const expected = {
      id: 1,
      text: "turn the heating on!",
      status: "incomplete",
    };
    //execute
    expect(todoApp.create("turn the heating on!")).toEqual(expected);
    //verify
  });

  it("creates multiple todo items", () => {
    //setup
    const item1 = todoApp.create("Make a pot of tea!");
    const item2 = todoApp.create("turn the heating on!");
    //execute
    expect(item1.id).toEqual(1);
    expect(item2.id).toEqual(2);
    //verify
  });

  it("shows all the todo items", () => {
    //setup
    todoApp.create("Make a pot of tea!");
    todoApp.create("turn the heating on!");
    //execute
    const expected = [
      {
        id: 1,
        text: "Make a pot of tea!",
        status: "incomplete",
      },
      {
        id: 2,
        text: "turn the heating on!",
        status: "incomplete",
      },
    ];

    const items = todoApp.showAll();
    //verify
    expect(items).toEqual(expected);
  });

  it("sets an incomplete item to complete", () => {
    //setup
    todoApp.create("Make a pot of tea!");
    const expected = {
      id: 1,
      text: "Make a pot of tea!",
      status: "complete",
    };
    //execute
    //verify
    expect(todoApp.setComplete(1)).toEqual(expected);
  });

  it("returns a message if item not found", () => {
    expect(todoApp.setComplete(1)).toEqual("Todo item not found");
  });

  it("if already complete, set complete again", () => {
    //setup
    todoApp.create("turn the heating on!");
    const expected = {
      id: 1,
      text: "turn the heating on!",
      status: "complete",
    };
    todoApp.setComplete(1);
    //execute
    //verify
    expect(todoApp.setComplete(1)).toEqual(expected);
  });

  describe("filtering items", () => {
    let item1, item2;

    beforeEach(() => {
      console.log("in the beforeEach");

      item1 = todoApp.create("Make a pot of tea!");
      item2 = todoApp.create("turn the heating on!");

      todoApp.setComplete(item1.id);
    });

    // show only todo items that are incomplete
    it("shows only todo items that are incomplete", () => {
      //setup
      // const item1 = todoApp.create("Make a pot of tea!"); //incomplete => complete
      // const item2 = todoApp.create("turn the heating on!");// incomplete

      const expected = [
        {
          id: item2.id,
          text: item2.text,
          status: item2.status,
        },
      ];
      //execute
      const actual = todoApp.showIncomplete();
      //verify
      expect(actual).toEqual(expected);
    });

    it("shows only todo items that are complete", () => {
      //setup
      // const item1 = todoApp.create("Make a pot of tea!");
      // const item2 = todoApp.create("turn the heating on!");

      const expected = [
        {
          id: item1.id,
          text: item1.text,
          status: item1.status,
        },
      ];
      //execute
      const actual = todoApp.showComplete();
      //verify
      expect(actual).toEqual(expected);
    });

    //search for a todo item by its id and shows it

    it("searches for a todo item by id", () => {
      //setup
      //execute
      const item = todoApp.searchById(item1.id);
      //verify
      expect(item).toEqual(item1);
    });

    it("returns a message if item doesn't exist", () => {
      //setup
      //execute
      const result = todoApp.searchById(3);
      //verify
      expect(result).toEqual("Todo item not found");
    });
  });
});
