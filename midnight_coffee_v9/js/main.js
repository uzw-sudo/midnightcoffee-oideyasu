/*==================================
    真夜中珈琲屋台

    Version 1.0

==================================*/


/*==================================
    HTML取得
==================================*/

const moon = document.getElementById("moon");
const message = document.getElementById("message");
const button = document.getElementById("startButton");
const opening = document.getElementById("opening");
const shop = document.getElementById("shop");


let cards = [];
fetch("mooncard/data/coffee.json")
    .then(response => response.json())
    .then(data => {
        cards = data;
        console.log("Coffee Database 読み込み完了", cards);
    });

/*==================================
    店主のセリフ
==================================*/

const messages = [

    "……ん？",

    "はい、こんばんは",

    "真夜中珈琲屋台へようこそ",

    "今夜は月が綺麗なぁ",

    "まぁ…一杯飲んでくか？"

];

/* ==========================================
   流れ星
========================================== */

const shootingStar = document.querySelector(".shooting-star");

function shootingStarStart() {

    // 一度アニメーションをリセット
    shootingStar.style.animation = "none";

    // ブラウザにリセットを認識させる
    shootingStar.offsetWidth;

    // アニメーション開始
    shootingStar.style.animation = "shooting 6.2s linear";

    // 次の流れ星までの時間（20～50秒）
    const nextTime = Math.random() * 30000 + 20000;

    setTimeout(shootingStarStart, nextTime);

}

// 最初は10～20秒後に流れる
setTimeout(shootingStarStart, Math.random() * 10000 + 10000);

/*==================================
    イベント
==================================*/

moon.addEventListener("click", startStory);

moon.classList.add("active");

setTimeout(() => {

    moon.classList.remove("active");

}, 800);

/*==================================
    ストーリー開始
==================================*/

function startStory() {

    // 月を光らせる
    moon.classList.add("glow");

    // 二度押し防止
    moon.style.pointerEvents = "none";

    // 0.8秒後に光を戻して物語開始
    setTimeout(() => {

        moon.classList.remove("glow");

        showMessage(0);

    }, 800);

}

/*==================================
    セリフ表示
==================================*/

function showMessage(index) {

    // 全部表示し終わった
    if (index >= messages.length) {

        console.log("ボタン表示！");

        button.classList.add("show");

        return;

    }

    typeMessage(messages[index], () => {

        setTimeout(() => {

            showMessage(index + 1);

        }, 1000);

    });

}

/*==================================
    一文字ずつ表示
==================================*/

function typeMessage(text, callback) {

    message.textContent = "";

    let i = 0;

    const timer = setInterval(() => {

        message.textContent += text[i];

        i++;

        if (i >= text.length) {

            clearInterval(timer);

            callback();

        }

    }, 80);

}

/*==================================
    フェードアウトからの店内移行
==================================*/

startButton.addEventListener("click", () => {

    opening.classList.add("fade-out");

    setTimeout(() => {

        opening.style.display = "none";

        shop.style.display = "block";

        // ←ここから2秒待つ
        setTimeout(() => {
            // ←質問開始
            questionBox.classList.add("show");

            showQuestion();

        }, 2000);

    }, 1500);

});