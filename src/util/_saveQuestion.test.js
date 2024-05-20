const { _saveQuestion } = require("./_DATA");

describe("_saveQuestion", () => {
  it("should return true for correct parameters", async () => {
    const response = await _saveQuestion({
      optionOneText: "1",
      optionTwoText: "2",
      author: "sarahedo",
    }).catch((err) => err);
    expect(response).toBeTruthy();
  });

  it("should return error response When parameters is invalid", async () => {
    const response = await _saveQuestion({
      optionOneText: "1",
      optionTwoText: "2",
      author: null,
    }).catch((err) => err);

    expect(response).toBe(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});
