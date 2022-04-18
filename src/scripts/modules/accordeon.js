const initAccordeon = () => {
  const questions = document.querySelectorAll(".question");

  questions.forEach((question) => {
    const btn = question.querySelector(".question__btn");
    const answer = question.querySelector(".question__answer");
    btn.addEventListener("click", () => {
      question.classList.toggle("active");
      questions.forEach((item) => {
        if (item !== question) {
          item.classList.remove("active");
        }
      })
    });
  });
}

export default initAccordeon;