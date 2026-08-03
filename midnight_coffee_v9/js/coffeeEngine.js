/*==================================
    Project Nocturne
    Coffee Engine
==================================*/

"use strict";

/**
 * プレイヤースコアとカードの性格値の距離を計算します。
 *
 * @param {Object} player
 * @param {Object} card
 * @returns {number}
 */
function calculateDistance(player, card) {
    const personality = card?.personality ?? {};
    const keys = ["tired", "happy", "quiet", "energy"];

    return keys.reduce((total, key) => {
        const playerValue = Number(player?.[key] ?? 0);
        const cardValue = Number(personality?.[key] ?? 0);

        return total + Math.abs(playerValue - cardValue);
    }, 0);
}

/**
 * プレイヤーに最も近いカードを返します。
 * 同点の場合は、coffee.jsonで先に記載されたカードを採用します。
 *
 * @param {Object} player
 * @param {Array<Object>} cardList
 * @returns {Object|null}
 */
function getBestCoffee(player, cardList = window.cards ?? []) {
    if (!player || !Array.isArray(cardList) || cardList.length === 0) {
        return null;
    }

    let bestCard = null;
    let shortestDistance = Infinity;

    cardList.forEach((card) => {
        const distance = calculateDistance(player, card);

        if (distance < shortestDistance) {
            shortestDistance = distance;
            bestCard = card;
        }
    });

    return bestCard;
}

window.calculateDistance = calculateDistance;
window.getBestCoffee = getBestCoffee;
