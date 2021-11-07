const todoApp = {
  id: 0,
  items: [],

  create: function (text) {
    this.id++; // increment id
    const item = {
      id: this.id, // sets property id to
      text: text,
      status: "incomplete",
    };
    this.items.push(item);
    return item;
  },

  showAll: function () {
    return this.items;
  },

  setComplete: function (id) {
    // find the item
    const item = this.items.find((item) => item.id === id);
    //if undefined, return a string
    if (item === undefined) return "Todo item not found";
    //set the property
    item.status = "complete";
    // return the item
    return item;
  },

  showIncomplete: function () {
    return this.items.filter((item) => item.status === "incomplete");
  },

  showComplete: function () {
    return this.items.filter((item) => item.status === "complete");
  },

  searchById: function (id) {
  const item = this.items.find((item) => item.id === id);
  if (item === undefined) return "Todo item not found";
  return item
  },
};
module.exports = todoApp;
