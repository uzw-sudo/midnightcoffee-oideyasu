"use strict";
(() => {
  const DIMS=["tired","happy","quiet","energy"];
  function distance(score,target){ return DIMS.reduce((sum,k)=>sum+Math.abs(Number(score?.[k]||0)-Number(target?.[k]||0)),0); }
  function seed(text){ return [...String(text||"")].reduce((n,c)=>((n*31+c.charCodeAt(0))>>>0),2166136261); }
  function rank(cards,score,order){ return cards.map(card=>{ const d=distance(score,card?.selection?.target); const jitter=(seed(`${order}:${card.id}`)%1000)/100000; const weight=Math.max(.01,Number(card.weight||1)); return {card,value:d/weight+jitter}; }).sort((a,b)=>a.value-b.value); }
  function select(cards,score,options={}){ if(!Array.isArray(cards)||!cards.length) throw new Error("カードデータがありません。"); const forced=options.forcedId&&cards.find(c=>c.id===options.forcedId); if(forced)return forced; return rank(cards,score,options.orderNumber)[0].card; }
  function pick(array,key,variants){ if(!Array.isArray(array)||!array.length)return ""; if(Number.isInteger(variants[key])&&array[variants[key]])return array[variants[key]]; const index=seed(key)%array.length; variants[key]=index; return array[index]; }
  function resolve(card,stored={}){ const variants={...stored}; const id=card.id; const result={...card, diagnosisText:pick(card?.diagnosis?.bodies,`${id}:diagnosis`,variants), masterComment:pick(card?.masterComments,`${id}:comment`,variants), dessert:pick(card?.desserts,`${id}:dessert`,variants), luckyItem:pick(card?.luckyItems,`${id}:item`,variants)}; return {card:result,variants}; }
  window.MidnightCardEngine={select,resolve,rank};
})();
