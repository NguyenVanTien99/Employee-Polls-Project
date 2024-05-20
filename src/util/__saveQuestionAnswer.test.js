const { _saveQuestionAnswer } = require("./_DATA");
describe("_saveQuestionAnswer", () => {
  it("should return true for correct parameters", async () => {
    const response = await _saveQuestionAnswer({
      authedUser: "sarahedo",
      qid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionTwo",
    });

    expect(response).toBeTruthy();
  });

  it("should return error response When parameters is invalid", async () => {
    const response = await _saveQuestionAnswer({
      authedUser: "sarahedo",
      qid: null,
      answer: "optionTwo",
    }).catch((err) => err);

    expect(response).toBe("Please provide authedUser, qid, and answer");
  });
});
