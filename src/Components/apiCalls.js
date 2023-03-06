export const getQuestions = async () => {
  try {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=1&category=22"
    );
    const data = await response.json();
    return data;
  } catch {
    throw new Error("There was a problem");
  }
};
