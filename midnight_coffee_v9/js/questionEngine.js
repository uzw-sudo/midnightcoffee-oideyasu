/*==================================
    Project Nocturne
    Question Engine
==================================*/

"use strict";

const RESULT_PAGE_PATH = "result/index.html";
const REPLY_DELAY = 1200;
const RESULT_DELAY = 2500;

const initialScore = Object.freeze({
    tired: 0,
    happy: 0,
    quiet: 0,
    energy: 0
});

const replies = [
    "なるほどなぁ",
    "いいねぇ",
    "お前らしいな",
    "ふむ……そうだなぁ"
];

const questions = [
    {
        question: "今日はどんな夜だった？",
        answers: [
            {
                text: "🌙 少し疲れた",
                score: { tired: 2, quiet: 1, happy: 0, energy: 0 }
            },
            {
                text: "✨ 楽しい一日だった",
                score: { tired: 0, quiet: 0, happy: 2, energy: 1 }
            },
            {
                text: "🍃 静かな夜だった",
                score: { tired: 0, quiet: 2, happy: 1, energy: 0 }
            },
            {
                text: "☕ まだ終わってない",
                score: { tired: 1, quiet: 0, happy: 0, energy: 2 }
            }
        ]
    },
    {
        question: "今、一番近い気持ちは？",
        answers: [
            {
                text: "☕ ゆっくりしたい",
                score: { tired: 2, quiet: 1, happy: 0, energy: 0 }
            },
            {
                text: "🌙 誰かと話したい",
                score: { tired: 0, quiet: 0, happy: 2, energy: 1 }
            },
            {
                text: "🍃 一人でいたい",
                score: { tired: 0, quiet: 2, happy: 1, energy: 0 }
            },
            {
                text: "✨ 少し元気が欲しい",
                score: { tired: 1, quiet: 0, happy: 0, energy: 2 }
            }
        ]
    },
    {
        question: "珈琲と一緒に欲しいものは？",
        answers: [
            {
                text: "🍰 甘いもの",
                score: { tired: 2, quiet: 1, happy: 0, energy: 0 }
            },
            {
                text: "📖 静かな時間",
                score: { tired: 0, quiet: 0, happy: 2, energy: 1 }
            },
            {
                text: "🎵 音楽",
                score: { tired: 0, quiet: 2, happy: 1, energy: 0 }
            },
            {
                text: "🌌 夜空",
                score: { tired: 1, quiet: 0, happy: 0, energy: 2 }
            }
        ]
    }
];

let score = { ...initialScore };
let currentQuestion = 0;
let isAnswering = false;

function addScore(answerScore) {
    Object.keys(initialScore).forEach((key) => {
        score[key] += Number(answerScore?.[key] ?? 0);
    });
}

function saveScore() {
    localStorage.setItem("playerScore", JSON.stringify(score));
}

function finishDiagnosis(questionElement, choicesElement) {
    saveScore();
    choicesElement.replaceChildren();
    questionElement.textContent = "じゃあ、最高の一杯を淹れるわなぁ？";

    window.setTimeout(() => {
        window.location.href = RESULT_PAGE_PATH;
    }, RESULT_DELAY);
}

function showQuestion() {
    const questionElement = document.getElementById("question");
    const choicesElement = document.getElementById("choices");

    if (!questionElement || !choicesElement) {
        return;
    }

    const current = questions[currentQuestion];

    if (!current) {
        finishDiagnosis(questionElement, choicesElement);
        return;
    }

    isAnswering = false;
    questionElement.textContent = current.question;
    choicesElement.replaceChildren();

    current.answers.forEach((answer) => {
        const button = document.createElement("button");

        button.type = "button";
        button.textContent = answer.text;

        button.addEventListener("click", () => {
            if (isAnswering) {
                return;
            }

            isAnswering = true;
            addScore(answer.score);
            choicesElement.replaceChildren();
            questionElement.textContent =
                replies[currentQuestion] ?? "なるほどなぁ";

            currentQuestion += 1;

            window.setTimeout(() => {
                if (currentQuestion < questions.length) {
                    showQuestion();
                } else {
                    finishDiagnosis(questionElement, choicesElement);
                }
            }, REPLY_DELAY);
        });

        choicesElement.appendChild(button);
    });
}

function resetDiagnosis() {
    score = { ...initialScore };
    currentQuestion = 0;
    isAnswering = false;
    localStorage.removeItem("playerScore");
}

function initializeQuestionEngine() {
    const questionElement = document.getElementById("question");
    const choicesElement = document.getElementById("choices");

    if (!questionElement || !choicesElement) {
        return;
    }

    resetDiagnosis();
    showQuestion();
}

window.showQuestion = showQuestion;
window.resetDiagnosis = resetDiagnosis;

document.addEventListener("DOMContentLoaded", initializeQuestionEngine);
