!function(e,t){function n(){if(!t.getElementById("overlay")){const e=t.createElement("div");e.id="overlay",t.body.appendChild(e)}if(!t.getElementById("popupContainer")){const e=t.createElement("div");e.id="popupContainer";const n=t.createElement("h2");n.id="greeting",n.textContent="Hello, ",e.appendChild(n);const a=t.createElement("h3");a.textContent="Hope you are doing Well!",e.appendChild(a);const l=t.createElement("h4");l.id="holidays",e.appendChild(l);const i=t.createElement("button");i.textContent="Close",i.onclick=o,e.appendChild(i),t.body.appendChild(e)}}function o(){const e=t.getElementById("popupContainer"),n=t.getElementById("overlay");e&&n&&(e.style.display="none",n.style.display="none")}const{timeOnly:a,dateOnly:l}=function(){const e=new Date;return{timeOnly:e.toLocaleTimeString("en-US",{hour12:!1}),dateOnly:e.toLocaleDateString("en-US")}}(),i=function(){const e=parseInt(a.split(":")[0],10);switch(!0){case e>=0&&e<12:return"Good Morning";case e>=12&&e<16:return"Good Afternoon";case e>=16&&e<20:return"Good Evening";default:return"Good Night"}}();function r(e){t.getElementById("popupContainer"),"Christmas"===e||"Christmas Eve"===e?(s=setInterval((()=>{u||function(){if(u)return;const e=t.createElement("div");e.classList.add("snowflake"),e.textContent="❄️",e.style.left=100*Math.random()+"vw",e.style.animationDuration=3*Math.random()+2+"s",e.style.opacity=Math.random(),t.body.appendChild(e),e.addEventListener("animationend",(()=>{e.remove()}))}()}),300),d=setTimeout((()=>{u=!0,clearInterval(s)}),15e3)):"Onam"===e?(h(),function(){let e=t.getElementById("flowerContainer");e||(e=t.createElement("div"),e.id="flowerContainer",t.body.appendChild(e)),e.style.display="block",y=setInterval(v,300),p=setTimeout(E,7e3)}(),function(){const e=t.getElementById("popupContainer"),n=t.createElement("div");n.id="onamImageContainer";const o=t.createElement("img");o.src="./img/onam12.webp",o.alt="Maveli and Kids",o.id="onamImage";const a=t.createElement("div");a.id="speechBubble",a.textContent="Happy Onam!";const l=t.createElement("div");l.className="speechBubbleArrow",a.appendChild(l),n.appendChild(a),n.appendChild(o),e.insertBefore(n,e.firstChild)}()):"New Year"!==e&&"Republic Day"!==e&&"Independence Day"!==e&&"Diwali"!==e&&"Holi"!==e||h()}let s,d,c,m,y,p,u=!1;function h(){t.getElementById("fireworksContainer").style.display="block",c=setInterval(f,500),m=setTimeout(g,1e4)}function g(){const e=t.getElementById("fireworksContainer");clearInterval(c),e.style.display="none",e.innerHTML=""}function f(){t.getElementById("fireworksContainer");const n=Math.random()*e.innerWidth,o=Math.random()*e.innerHeight*.5;for(let e=0;e<30;e++)C(n,o)}function C(e,n){const o=t.getElementById("fireworksContainer"),a=t.createElement("div");a.classList.add("firework");const l=2*Math.random()*Math.PI,i=4*Math.random()+2,r=Math.cos(l)*i,s=Math.sin(l)*i;a.style.left=`${e}px`,a.style.top=`${n}px`,a.style.backgroundColor=function(){const e=["#FF5733","#33FF57","#3357FF","#FF33A1","#FFBD33"];return e[Math.floor(Math.random()*e.length)]}(),o.appendChild(a);let d=0;const c=setInterval((()=>{d+=1,a.style.transform=`translate(${r*d}px, ${s*d}px)`,a.style.opacity=Math.max(1-d/20,0),d>25&&(clearInterval(c),a.remove())}),16)}function E(){const e=t.getElementById("flowerContainer");clearInterval(y),e&&(e.style.display="none",e.innerHTML="")}function v(){const e=t.getElementById("flowerContainer"),n=t.createElement("div");n.classList.add("flower"),n.style.left=100*Math.random()+"vw",n.style.animationDuration=3*Math.random()+2+"s",e.appendChild(n),n.addEventListener("animationend",(()=>{n.remove()}))}e.onload=function(){n(),n(),t.getElementById("popupContainer").style.display="block",t.getElementById("overlay").style.display="block",t.getElementById("greeting").textContent=`Hello, ${i}`,fetch("https://www.googleapis.com/calendar/v3/calendars/en.indian%23holiday@group.v.calendar.google.com/events?key=AIzaSyDK1VxJA97m6HCraScyH1zcHObzPwR57Vk").then((e=>{if(!e.ok)throw new Error("API request failed");return console.log("API request successful"),e.json()})).then((e=>{const n=e.items;if(console.log(n.summary),!n||0===n.length)return void console.log("No holiday data found.");const o=new Date(l);n.forEach((e=>{const n=new Date(e.start.date);if(o.getTime()===n.getTime())console.log("Today is a holiday:",e.summary),t.getElementById("holidays").textContent=`Happy ${e.summary}`,r(e.summary);else{const a=n.getTime()-o.getTime(),l=Math.ceil(a/864e5);l>0&&l<=10&&(r(e.summary),console.log(`Holiday '${e.summary}' is coming up in ${l} days on ${e.start.date}`),t.getElementById("holidays").textContent=`${e.summary} is coming up in ${l} Days`)}}))})).catch((e=>{console.error("Error fetching holiday data:",e)}))}}(window,document);