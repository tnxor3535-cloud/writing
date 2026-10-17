// 고려 및 조선 시대 주요 역사 문제 리스트 (원하시는 만큼 수정/추가 가능합니다)
const quizData = [
    {
        question: "1. 후삼국을 통일하고 고려를 건국한 왕은 누구인가요?",
        options: ["① 견훤", "② 왕건", "③ 궁예", "④ 이성계"],
        answer: 1 // 0부터 시작하므로 두 번째 보기(왕건)가 정답
    },
    {
        question: "2. 고려 시대에 노비안검법을 실시하여 호족의 세력을 약화시키고 왕권을 강화한 왕은?",
        options: ["① 광종", "② 성종", "③ 태조", "④ 공민왕"],
        answer: 0
    },
    {
        question: "3. 1392년 고려를 무너뜨리고 새로운 나라 조선을 건국한 인물은?",
        options: ["① 최영", "② 정몽주", "③ 이성계", "④ 정도전"],
        answer: 2
    },
    {
        question: "4. 조선 제4대 왕으로 백성을 위해 훈민정음을 창제한 왕은 누구인가요?",
        options: ["① 태종", "② 세종", "③ 영조", "④ 정조"],
        answer: 1
    },
    {
        question: "5. 임진왜란 당시 거북선을 제작하여 왜군에 맞서 큰 승리를 거둔 장군은?",
        options: ["① 을지문덕", "② 강감찬", "③ 권율", "④ 이순신"],
        answer: 3
    }
];

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

const questionNumberEl = document.getElementById("question-number");
const questionTextEl = document.getElementById("question-text");
const optionsContainerEl = document.getElementById("options-container");
const nextBtnEl = document.getElementById("next-btn");
const quizBoxEl = document.getElementById("quiz-box");
const resultBoxEl = document.getElementById("result-box");
const scoreTextEl = document.getElementById("score-text");

function loadQuiz() {
    answered = false;
    nextBtnEl.classList.add("hidden");
    optionsContainerEl.innerHTML = "";

    const currentQuiz = quizData[currentQuestionIndex];
    questionNumberEl.innerText = `문제 ${currentQuestionIndex + 1} / ${quizData.length}`;
    questionTextEl.innerText = currentQuiz.question;

    currentQuiz.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectOption(index, button));
        optionsContainerEl.appendChild(button);
    });
}

function selectOption(selectedIndex, selectedButton) {
    if (answered) return; // 중복 클릭 방지
    answered = true;

    const currentQuiz = quizData[currentQuestionIndex];
    const optionButtons = optionsContainerEl.querySelectorAll(".option-btn");

    if (selectedIndex === currentQuiz.answer) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
        // 정답 버튼도 초록색으로 표시
        optionButtons[currentQuiz.answer].classList.add("correct");
    }

    // 모든 버튼 비활성화
    optionButtons.forEach(btn => btn.disabled = true);

    // 마지막 문제가 아니면 다음 버튼 표시, 마지막이면 결과 보기
    if (currentQuestionIndex < quizData.length - 1) {
        nextBtnEl.classList.remove("hidden");
    } else {
        nextBtnEl.innerText = "결과 확인하기 📊";
        nextBtnEl.classList.remove("hidden");
    }
}

nextBtnEl.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuiz();
    } else {
        showResult();
    }
});

function showResult() {
    quizBoxEl.classList.add("hidden");
    resultBoxEl.classList.remove("hidden");
    
    let message = "";
    if (score === quizData.length) {
        message = `만점입니다! 🌟 역사 박사님이시네요!`;
    } else if (score >= 3) {
        message = `잘했어요! 👏 조금만 더 복습하면 완벽해요!`;
    } else {
        message = `복습이 조금 필요해요! 교과서를 다시 살펴볼까요? 📚`;
    }

    scoreTextEl.innerHTML = `총 <strong>${quizData.length}문제</strong> 중 <strong>${score}문제</strong>를 맞혔습니다!<br><br>${message}`;
}

// 퀴즈 초기 실행
loadQuiz();
