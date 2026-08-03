"use strict";
(() => {
  let timer=0;
  function type(element,message,speed=55){ if(!element)return Promise.resolve(); clearInterval(timer); element.textContent=""; const chars=[...String(message||"")]; let i=0; return new Promise(resolve=>{ if(!chars.length){resolve();return;} timer=setInterval(()=>{element.textContent+=chars[i++]||""; if(i>=chars.length){clearInterval(timer);resolve();}},speed); }); }
  function stop(){clearInterval(timer);}
  function choose(lines,seedText=""){ if(!Array.isArray(lines)) return String(lines||""); if(!lines.length)return ""; const n=[...seedText].reduce((s,c)=>s+c.charCodeAt(0),0); return lines[n%lines.length]; }
  window.MidnightDialogue={type,stop,choose};
})();
