document.addEventListener('DOMContentLoaded', () => {
    const quizStartSection = document.getElementById('quiz-start');
    const quizQuestionSection = document.getElementById('quiz-question');
    const quizCompleteSection = document.getElementById('quiz-complete');
    const caseStudySection = document.getElementById('case-study-section'); // 새로 추가

    const startQuizBtn = document.getElementById('start-quiz-btn');
    const questionText = document.querySelector('.question-text');
    const optionBtns = document.querySelectorAll('.option-btn');
    const explanationDiv = document.querySelector('.explanation');
    const explanationText = document.querySelector('.explanation-text');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const restartQuizBtn = document.getElementById('restart-quiz-btn');
    const goToCaseBtn = document.getElementById('go-to-case-btn'); // 새로 추가

    const caseDescription = document.querySelector('.case-description'); // 새로 추가
    const attachYearsInput = document.getElementById('attach-years'); // 새로 추가
    const submitYearsBtn = document.getElementById('submit-years-btn'); // 새로 추가
    const caseResultDiv = document.querySelector('.case-result'); // 새로 추가
    const actualVerdictText = document.querySelector('.actual-verdict-text'); // 새로 추가
    const verdictExplanationText = document.querySelector('.verdict-explanation-text'); // 새로 추가
    const restartFromCaseBtn = document.getElementById('restart-from-case-btn'); // 새로 추가

    let currentQuestionIndex = 0;
    let quizQuestions = [
        {
            question: "전자발찌는 모든 범죄자에게 부착됩니다.",
            answer: "X",
            explanation: "전자발찌는 성범죄, 미성년자 유괴, 살인, 강도 등 특정 강력범죄를 저지른 사람 중 재범 위험성이 있다고 판단될 때 부착 명령이 내려집니다."
        },
        {
            question: "전자발찌 부착 기간은 최대 30년입니다.",
            answer: "O",
            explanation: "현행법상 전자발찌 부착 기간은 1개월 이상 30년 이하입니다. 법원의 판단에 따라 기간이 결정됩니다."
        },
        {
            question: "전자발찌를 훼손하면 처벌받지 않습니다.",
            answer: "X",
            explanation: "전자발찌를 훼손하거나 장치 부착 명령을 위반할 경우 7년 이하의 징역 또는 2천만 원 이하의 벌금에 처해질 수 있습니다."
        }
        // 여기에 더 많은 퀴즈 문제를 추가할 수 있습니다.
    ];

    // 판례 정보 (새로 추가)
    const caseStudy = {
        description: "20대 남성 김 씨는 채팅 앱을 통해 만난 미성년자 A양(15세)에게 접근하여 강제로 성폭행했습니다. 김 씨는 과거에도 유사한 성범죄 전과가 있었으나, 당시에는 전자발찌 부착 명령을 받지 않았습니다. 출소 후 직장생활을 하며 평범하게 사는 듯했지만, 결국 재범에 이르렀습니다. 전문가 진단 결과 재범 위험성이 매우 높다고 판단되었으며, 재판 과정에서 자신의 죄를 뉘우치는 듯한 모습을 보였으나, 피해자에게는 어떠한 사과도 하지 않았습니다.",
        actualVerdict: "이 사건에서 법원은 김 씨에게 징역 7년과 전자발찌 15년 부착을 명령했습니다.",
        verdictExplanation: "법원은 김 씨의 재범 위험성이 매우 높다고 판단했고, 피해자의 연령과 정신적 충격, 그리고 과거 동종 전과를 종합적으로 고려하여 이례적으로 긴 기간의 전자발찌 부착을 명령했습니다. 이는 사회로부터 성범죄자를 격리하고, 잠재적 재범을 억제하려는 전자감독제도의 강력한 의지를 보여주는 판례입니다."
    };


    function showSection(section) {
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        section.classList.add('active');
    }

    function loadQuestion() {
        if (currentQuestionIndex < quizQuestions.length) {
            const question = quizQuestions[currentQuestionIndex];
            questionText.textContent = question.question;
            explanationDiv.style.display = 'none'; // 해설 숨기기
            optionBtns.forEach(btn => {
                btn.style.backgroundColor = '#007bff'; // 버튼 색상 초기화
                btn.disabled = false; // 버튼 활성화
            });
            nextQuestionBtn.style.display = 'none'; // 다음 문제 버튼 숨기기
        } else {
            showSection(quizCompleteSection);
        }
    }

    function checkAnswer(selectedAnswer) {
        const question = quizQuestions[currentQuestionIndex];
        const isCorrect = (selectedAnswer === question.answer);

        optionBtns.forEach(btn => {
            btn.disabled = true; // 선택 후 버튼 비활성화
            if (btn.dataset.value === question.answer) {
                btn.style.backgroundColor = '#28a745'; // 정답은 초록색
            } else if (btn.dataset.value === selectedAnswer) {
                btn.style.backgroundColor = '#dc3545'; // 오답은 빨간색
            }
        });

        explanationText.textContent = question.explanation;
        explanationDiv.style.display = 'block'; // 해설 보이기
        nextQuestionBtn.style.display = 'block'; // 다음 문제 버튼 보이기
    }

    // 이벤트 리스너
    startQuizBtn.addEventListener('click', () => {
        currentQuestionIndex = 0;
        showSection(quizQuestionSection);
        loadQuestion();
    });

    optionBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            checkAnswer(e.target.dataset.value);
        });
    });

    nextQuestionBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        loadQuestion();
    });

    restartQuizBtn.addEventListener('click', () => {
        showSection(quizStartSection);
    });

    // 판례 섹션으로 이동하는 버튼 (새로 추가)
    goToCaseBtn.addEventListener('click', () => {
        showSection(caseStudySection);
        caseDescription.textContent = caseStudy.description;
        caseResultDiv.style.display = 'none'; // 결과 숨기기
        attachYearsInput.value = ''; // 입력창 초기화
        attachYearsInput.disabled = false; // 입력창 활성화
        submitYearsBtn.style.display = 'inline-block'; // 결정하기 버튼 보이기
    });

    // 판례 질문에 대한 답변 제출 (새로 추가)
    submitYearsBtn.addEventListener('click', () => {
        const years = attachYearsInput.value;
        if (years === "" || isNaN(years) || years < 0) {
            alert("유효한 연도를 입력해주세요.");
            return;
        }
        
        // 실제 판결과 해설 표시
        actualVerdictText.textContent = caseStudy.actualVerdict;
        verdictExplanationText.textContent = caseStudy.verdictExplanation;
        caseResultDiv.style.display = 'block'; // 결과 보이기
        attachYearsInput.disabled = true; // 입력창 비활성화
        submitYearsBtn.style.display = 'none'; // 결정하기 버튼 숨기기
    });

    // 판례 섹션에서 다시 시작 (새로 추가)
    restartFromCaseBtn.addEventListener('click', () => {
        showSection(quizStartSection);
    });

    // 초기 화면 설정
    showSection(quizStartSection);
});