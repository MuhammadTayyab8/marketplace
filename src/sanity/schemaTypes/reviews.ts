export default {
    name: "review",
    title: "Review",
    type: "document",
    fields: [
      { name: "reviewText", title: "Review Text", type: "text" },
      { name: "rating", title: "Rating", type: "number"},
      { name: "reviewer", title: "Reviewer Name", type: "string" },
      { name: "product", title: "Product", type: "reference", to: [{ type: "product" }] },
    ],
  };
  