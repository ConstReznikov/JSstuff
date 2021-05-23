// all answer options
const option1 = document.querySelector(".option1"),
  option2 = document.querySelector(".option2"),
  option3 = document.querySelector(".option3"),
  option4 = document.querySelector(".option4");
// all options
const optionElements = document.querySelectorAll(".option");

const question = document.getElementById("question"),
  numberOfQuestion = document.getElementById("number-of-question"),
  numberOfAllQuestions = document.getElementById("number-of-all-questions");

let indexOfQuestion,
  indexOfPage = 0;

const answersTracker = document.getElementById("answers-tracker");
const btnNext = document.getElementById("btn-next");

let score = 0;

const correctAnswer = document.getElementById("correct-answer");
const myOpinion = document.getElementById("my-opinion");
const numberOfAllQuestions2 = document.getElementById(
  "number-of-all-questions-2"
);
const btnTryAgain = document.getElementById("btn-try-again");

const questions = [
  {
    question: "Who is this",
    options: ["Zook", "ereh", "Galliard", "Reiner"],
    rightAnswer: 0,
    img: true,
    imgsrc: "img/1.jpg",
  },
  {
    question: "Who is this",
    options: ["Reze", "Makima", "Ayaka", "Misato"],
    rightAnswer: 1,
    img: true,
    imgsrc: "img/2.png",
  },
  {
    question: "What is Klee's algorithm",
    options: [
      "Jumpy Dumpies",
      "Given starting and ending positions of segments on a line, the task is to take the union of all given segments and find length covered by these segments.",
      "I dont know",
      "Help me",
    ],
    rightAnswer: 1,
    img: false,
  },
  {
    question: "Who is this",
    options: ["Cuckold", "Loser", "'Comedian'", "Idiot"],
    rightAnswer: 0,
    img: true,
    imgsrc: "img/3.jpg",
  },
  {
    question: "Who is this",
    options: ["Zero Two", "Reze", "Power", "First President"],
    rightAnswer: 0,
    img: true,
    imgsrc: "img/4.jpg",
  },
  {
    question: "Who is this",
    options: ["Eula", "Jean", "Lisa", "Klee"],
    rightAnswer: 0,
    img: true,
    imgsrc: "img/5.jpg",
  },
  {
    question: "Who is this",
    options: ["Tartaglia", "Shirou", "John Wick", "Hiro"],
    rightAnswer: 0,
    img: true,
    imgsrc: "img/6.jpg",
  },
];
//
numberOfAllQuestions.innerHTML = questions.length;

const load = () => {
  if (questions[indexOfQuestion].img == true) {
    let image = document.createElement("img");
    image.src = questions[indexOfQuestion].imgsrc;
    image.classList.add("image");
    question.innerHTML = questions[indexOfQuestion].question;

    question.appendChild(image);
    // image.src = "IMAGE URL/PATH"
  } else {
    question.innerHTML = questions[indexOfQuestion].question;
  }
  option1.innerHTML = questions[indexOfQuestion].options[0];
  option2.innerHTML = questions[indexOfQuestion].options[1];
  option3.innerHTML = questions[indexOfQuestion].options[2];
  option4.innerHTML = questions[indexOfQuestion].options[3];

  numberOfQuestion.innerHTML = indexOfPage + 1;
  indexOfPage++;
};

let completedAnswers = [];

const randomQuestion = () => {
  let randomNumber = Math.floor(Math.random() * questions.length);
  let hitDuplicate = false;

  if (indexOfPage == questions.length) {
    quizOver();
  } else {
    if (completedAnswers.length > 0) {
      completedAnswers.forEach((item) => {
        if (item == randomNumber) {
          hitDuplicate = true;
        }
      });
      if (hitDuplicate) {
        randomQuestion();
      } else {
        indexOfQuestion = randomNumber;
        load();
      }
    }
    if (completedAnswers == 0) {
      indexOfQuestion = randomNumber;
      load();
    }
  }
  completedAnswers.push(indexOfQuestion);
};

const checkAnswer = (el) => {
  if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
    el.target.classList.add("correct");
    updateAnswerTracker("correct");
    score++;
  } else {
    el.target.classList.add("wrong");
    updateAnswerTracker("wrong");
  }
  disabledOptions();
};
const disabledOptions = () => {
  optionElements.forEach((item) => {
    item.classList.add("disabled");
    if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
      item.classList.add("correct");
    }
  });
};

const enableOptions = () => {
  optionElements.forEach((item) => {
    item.classList.remove("disabled", "correct", "wrong");
  });
};

const answerTracker = () => {
  questions.forEach(() => {
    const div = document.createElement("div");
    answersTracker.appendChild(div);
  });
};

const updateAnswerTracker = (status) => {
  answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
};

const validate = () => {
  if (!optionElements[0].classList.contains("disabled")) {
    alert("Choose one");
  } else {
    randomQuestion();
    enableOptions();
  }
};

btnNext.addEventListener("click", validate);

for (option of optionElements) {
  option.addEventListener("click", (e) => checkAnswer(e));
}

const quizOver = () => {
  document.querySelector(".quiz-over-modal").classList.add("active");

  switch (score) {
    case 0:
      myOpinion.innerHTML = "You are trash";
      break;
    case 1:
    case 2:
    case 3:
      myOpinion.innerHTML = "Not Great not terrible";
      break;
    case 4:
    case 5:
    case 6:
      myOpinion.innerHTML = "Almost Perfect, Almost";
      break;
    case 7:
      myOpinion.innerHTML = "Supre lit, based and def not cringe";
      break;
  }

  correctAnswer.innerHTML = score;
  numberOfAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
  window.location.reload();
};
btnTryAgain.addEventListener("click", tryAgain);

window.addEventListener("load", () => {
  randomQuestion();
  answerTracker();
});
