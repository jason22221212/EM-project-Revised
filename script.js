document.addEventListener('DOMContentLoaded', () => {
    // 모든 섹션 요소 가져오기
    const quizStartSection = document.getElementById('quiz-start');
    const quizQuestionSection = document.getElementById('quiz-question');
    const quizCompleteSection = document.getElementById('quiz-complete');
    const caseStudySection = document.getElementById('case-study-section');

    // 퀴즈 시작 관련 요소
    const startQuizBtn = document.getElementById('start-quiz-btn');

    // 퀴즈 문제 관련 요소
    const questionText = document.querySelector('.question-text');
    const optionBtns = document.querySelectorAll('.option-btn');
    const explanationDiv = document.querySelector('.explanation');
    const explanationText = document.querySelector('.explanation-text');
    const nextQuestionBtn = document.getElementById('next-question-btn');

    // 퀴즈 완료 관련 요소
    const restartQuizBtn = document.getElementById('restart-quiz-btn');
    const goToCaseBtn = document.getElementById('go-to-case-btn');

    // 판례 섹션 관련 요소
    const caseDescription = document.querySelector('.case-description');
    const attachYearsInput = document.getElementById('attach-years');
    const submitYearsBtn = document.getElementById('submit-years-btn');
    const caseResultDiv = document.querySelector('.case-result');
    const actualVerdictText = document.querySelector('.actual-verdict-text');
    const verdictExplanationText = document.querySelector('.verdict-explanation-text');
    const restartFromCaseBtn = document.getElementById('restart-from-case-btn');

    let currentQuestionIndex = 0;
    // 퀴즈 질문 데이터
    const quizQuestions = [
        {
            question: "전자발찌는 모든 범죄자에게 부착됩니다.",
            answer: "X",
            explanation: "전자발찌는 성범죄, 미성년자 유괴, 살인, 강도 등 특정 강력범죄를 저지른 사람 중 재범 위험성이 있다고 판단될 때 법원의 명령에 따라 부착됩니다. 모든 범죄자에게 일괄적으로 부착되는 것은 아닙니다."
        },
        {
            question: "전자발찌 부착 기간은 최대 30년입니다.",
            answer: "O",
            explanation: "현행법상 전자발찌 부착 기간은 1개월 이상 30년 이하로 규정되어 있습니다. 법원이 범죄의 심각성과 재범 위험성 등을 종합적으로 고려하여 기간을 결정합니다."
        },
        {
            question: "전자발찌를 훼손하면 처벌받지 않습니다.",
            answer: "X",
            explanation: "전자발찌를 고의로 훼손하거나, 부착 명령을 위반하여 위치추적 장치를 신체에서 이탈하게 할 경우 '전자장치 부착 등에 관한 법률'에 따라 7년 이하의 징역 또는 2천만 원 이하의 벌금에 처해질 수 있습니다. 이는 전자감독제도의 실효성을 확보하기 위함입니다."
        },
        {
            question: "전자발찌 부착자는 특정 시간 외출이 제한될 수 있습니다.",
            answer: "O",
            explanation: "전자발찌 부착자에게는 특정 시간대 외출 제한, 특정 지역 접근 금지, 피해자 접근 금지 등 다양한 준수 사항이 부과될 수 있습니다. 이를 통해 재범을 효과적으로 예방하고 관리합니다."
        },
        {
            question: "전자발찌는 단순히 위치만 추적하는 장치이다.",
            answer: "X",
            explanation: "전자발찌는 단순히 위치 추적뿐만 아니라, 음성 인식, 비상 호출, 충격 감지 등 다양한 기능을 통해 부착자의 이상 행동을 감지하고 관리할 수 있습니다. 이는 재범 방지 및 신속한 대응에 중요한 역할을 합니다."
        }
    ];

    // 판례 정보 (수정 및 추가 설명 포함)
    const caseStudy = {
        description: `20대 남성 김 씨는 채팅 앱을 통해 만난 미성년자 A양(15세)에게 접근하여 강제로 성폭행했습니다. 김 씨는 과거에도 유사한 성범죄 전과가 있었으며, 당시에는 전자발찌 부착 명령을 받지 않고 출소했습니다. 출소 후 직장생활을 하며 평범하게 사는 듯했지만, 결국 다시 미성년자를 대상으로 재범에 이르렀습니다.
        사건 조사 과정에서 김 씨는 재범 위험성이 매우 높다는 전문가 진단 결과가 나왔고, 재판 과정에서는 자신의 죄를 뉘우치는 듯한 모습을 일부 보였으나, 정작 피해자에게는 어떠한 사과도 하지 않았습니다.`,
        actualVerdict: "이 사건에서 법원은 김 씨에게 징역 7년과 전자발찌 15년 부착을 명령했습니다.",
        verdictExplanation: `법원은 김 씨의 **과거 동종 전과**와 **재범 위험성**이 매우 높다고 판단했습니다. 특히 **피해자가 미성년자라는 점**과 이로 인한 **피해자의 심각한 정신적 충격**을 깊이 고려했습니다.
        또한, 김 씨가 겉으로는 뉘우치는 듯했으나 피해자에게 진심으로 사과하지 않은 점 등을 들어 죄질이 불량하다고 보았습니다.
        이례적으로 긴 기간인 15년의 전자발찌 부착 명령은 성범죄자의 재범을 강력히 억제하고 사회로부터 격리하여 시민을 보호하려는 전자감독제도의 중요한 판례로 남아있습니다.`
    };


    // 섹션 전환 함수
    function showSection(sectionElement) {
        document.querySelectorAll('.section').forEach(s => {
            s.classList.remove('active');
            s.style.display = 'none'; // DOM에서 숨겨서 레이아웃 영향 최소화
        });
        sectionElement.style.display = 'block'; // 먼저 보이게 하고
        sectionElement.classList.add('active'); // 애니메이션 적용
    }

    // 퀴즈 문제 로드 함수
    function loadQuestion() {
        if (currentQuestionIndex < quizQuestions.length) {
            const question = quizQuestions[currentQuestionIndex];
            questionText.textContent = question.question;
            explanationDiv.style.display = 'none'; // 해설 숨기기
            optionBtns.forEach(btn => {
                btn.style.backgroundColor = '#3498db'; // O/X 버튼 색상 초기화
                btn.disabled = false; // 버튼 활성화
            });
            nextQuestionBtn.style.display = 'none'; // 다음 문제 버튼 숨기기
        } else {
            // 모든 퀴즈 완료 시
            showSection(quizCompleteSection);
        }
    }

    // 정답 확인 및 피드백 함수
    function checkAnswer(selectedAnswer) {
        const question = quizQuestions[currentQuestionIndex];
        const isCorrect = (selectedAnswer === question.answer);

        optionBtns.forEach(btn => {
            btn.disabled = true; // 선택 후 O/X 버튼 비활성화
            if (btn.dataset.value === question.answer) {
                btn.style.backgroundColor = '#27ae60'; // 정답은 초록색
            } else if (btn.dataset.value === selectedAnswer) {
                btn.style.backgroundColor = '#e74c3c'; // 오답은 빨간색
            }
        });

        explanationText.textContent = question.explanation;
        explanationDiv.style.display = 'block'; // 해설 보이기
        nextQuestionBtn.style.display = 'block'; // 다음 문제 버튼 보이기
    }

    // --- 이벤트 리스너 ---

    // 퀴즈 시작 버튼
    startQuizBtn.addEventListener('click', () => {
        currentQuestionIndex = 0; // 퀴즈 인덱스 초기화
        showSection(quizQuestionSection);
        loadQuestion();
    });

    // O/X 선택 버튼
    optionBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            checkAnswer(e.target.dataset.value);
        });
    });

    // 다음 문제 버튼
    nextQuestionBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        loadQuestion();
    });

    // 퀴즈 완료 후 '다시 시작' 버튼
    restartQuizBtn.addEventListener('click', () => {
        showSection(quizStartSection);
    });

    // 퀴즈 완료 후 '판례 보기' 버튼
    goToCaseBtn.addEventListener('click', () => {
        showSection(caseStudySection);
        caseDescription.textContent = caseStudy.description; // 판례 개요 로드
        caseResultDiv.style.display = 'none'; // 결과 숨기기
        attachYearsInput.value = ''; // 입력창 초기화
        attachYearsInput.disabled = false; // 입력창 활성화
        submitYearsBtn.style.display = 'inline-block'; // 결정하기 버튼 보이기
    });

    // 판례 질문 '결정하기' 버튼
    submitYearsBtn.addEventListener('click', () => {
        const years = attachYearsInput.value;
        if (years === "" || isNaN(years) || parseInt(years) < 0) {
            alert("유효한 부착 기간(년)을 숫자로 입력해주세요.");
            return;
        }

        // 실제 판결과 해설 표시
        actualVerdictText.textContent = caseStudy.actualVerdict;
        verdictExplanationText.textContent = caseStudy.verdictExplanation;
        caseResultDiv.style.display = 'block'; // 결과 섹션 보이기
        attachYearsInput.disabled = true; // 입력창 비활성화
        submitYearsBtn.style.display = 'none'; // 결정하기 버튼 숨기기
    });

    // 판례 섹션에서 '다시 시작' 버튼
    restartFromCaseBtn.addEventListener('click', () => {
        showSection(quizStartSection);
    });

    // 초기 화면 설정 (페이지 로드 시)
    showSection(quizStartSection);
});