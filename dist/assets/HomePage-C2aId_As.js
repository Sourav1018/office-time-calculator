import{o as S,c as x,t as C,a as k,r as T,b as t,n as B,d as g,e as K,f as D,w as m,g as M,v as $,h as j}from"./index-1MyS58TI.js";const R={key:0,class:"mb-3"},U={key:0,class:"text-xl font-semibold text-gray-800"},z={class:"mb-4"},F={key:1,class:"pt-3 border-t border-gray-200"},I=Object.assign({name:"BaseCard"},{__name:"BaseCard",props:{title:{type:String,default:""},customClass:{type:String,default:""}},setup(v){return(a,f)=>(S(),x("div",{class:B(["bg-white shadow-md rounded-2xl p-4 border border-gray-200 max-w-full",v.customClass])},[a.$slots.header||v.title?(S(),x("div",R,[v.title?(S(),x("h2",U,C(v.title),1)):k("",!0),T(a.$slots,"header")])):k("",!0),t("div",z,[T(a.$slots,"default")]),a.$slots.footer?(S(),x("div",F,[T(a.$slots,"footer")])):k("",!0)],2))}}),J={class:"container mx-auto p-4"},q={class:"grid grid-cols-1 sm:grid-cols-3 gap-4"},G={class:"col-span-full"},Q={class:"grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 mx-auto"},X={class:"text-center text-xl font-semibold text-gray-700"},Y={id:"timer"},Z={class:"text-center text-xl font-semibold text-gray-700"},ee={id:"checkout-time"},oe=Object.assign({name:"HomePage"},{__name:"HomePage",setup(v){const a=g(""),f=g(""),p=g("AM"),b=g(""),c=g("--:--"),i=g("--:--");let u=null;function O(){a.value="",f.value="",p.value="AM",b.value="",c.value="--:--",i.value="--:--",u&&clearInterval(u),w(),V()}function H(){let s=a.value%12;p.value==="PM"&&(s+=12);const e=f.value,o=Math.floor(b.value),n=Math.round((b.value-o)*60),r=new Date;r.setHours(s,e,0),r.setMinutes(r.getMinutes()+o*60+n);const l=r.getHours(),h=r.getMinutes(),d=l>=12?"PM":"AM",y=l%12||12;return c.value=`${y}:${h.toString().padStart(2,"0")} ${d}`,r}function L(){const s=`date_${new Date().toISOString().split("T")[0]}`;localStorage.setItem(s,c.value)}function A(){const s=a.value%12+(p.value==="PM"?12:0),e=f.value,o=new Date;o.setHours(s,e,0);const n=H();L(),localStorage.setItem("timerData",JSON.stringify({startTime:o.getTime(),checkoutDate:n.getTime()})),u&&clearInterval(u),u=setInterval(()=>{const l=n-new Date;if(l<=0){clearInterval(u),i.value="00:00:00",w();return}const h=Math.floor(l/(1e3*60*60)),d=Math.floor(l%(1e3*60*60)/(1e3*60)),y=Math.floor(l%(1e3*60)/1e3);i.value=`${h.toString().padStart(2,"0")}:${d.toString().padStart(2,"0")}:${y.toString().padStart(2,"0")}`},1e3)}function w(){localStorage.removeItem("timerData"),Object.keys(localStorage).forEach(e=>{e.startsWith("date_")&&localStorage.removeItem(e)})}function N(){const s=JSON.parse(localStorage.getItem("timerData"));if(s){const e=new Date().getTime(),o=s.checkoutDate-e;if(o>0){const n=Math.floor(o/36e5),r=Math.floor(o%(1e3*60*60)/(1e3*60)),l=Math.floor(o%(1e3*60)/1e3);i.value=`${n.toString().padStart(2,"0")}:${r.toString().padStart(2,"0")}:${l.toString().padStart(2,"00")}`,u=setInterval(()=>{const h=new Date,d=s.checkoutDate-h;if(d<=0){clearInterval(u),i.value="00:00:00",w();return}const y=Math.floor(d/(1e3*60*60)),W=Math.floor(d%(1e3*60*60)/(1e3*60)),E=Math.floor(d%(1e3*60)/1e3);i.value=`${y.toString().padStart(2,"0")}:${W.toString().padStart(2,"0")}:${E.toString().padStart(2,"00")}`},1e3)}else i.value="00:00:00",w()}}function _(){const s=`date_${new Date().toISOString().split("T")[0]}`,e=localStorage.getItem(s);Object.keys(localStorage).forEach(n=>{if(n.startsWith("date_")){const r=n.split("_")[1],l=new Date().toISOString().split("T")[0];r<l&&localStorage.removeItem(n)}}),e?c.value=e:c.value="--:--"}function P(){"serviceWorker"in navigator&&navigator.serviceWorker.controller&&navigator.serviceWorker.controller.postMessage({type:"SCHEDULE_NOTIFICATION",title:"Checkout Reminder",options:{body:`Time to checkout at ${c.value}`,vibrate:[200,100,200],icon:"/office-time-calculator/notification-icon.png",badge:"/office-time-calculator/badge-icon.png"},delay:H().getTime()-new Date().getTime()})}function V(){"serviceWorker"in navigator&&navigator.serviceWorker.controller&&navigator.serviceWorker.controller.postMessage({type:"CANCEL_NOTIFICATION"})}return K(()=>{N(),_()}),(s,e)=>(S(),x("div",J,[D(I,{title:"Setup Timer",class:"max-w-lg mx-auto"},{header:m(()=>e[4]||(e[4]=[t("div",{class:"text-gray-600"},"setting up the timer as per your need",-1)])),footer:m(()=>[t("div",{class:"grid grid-cols-2 gap-4 mx-auto"},[t("button",{class:"bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full",onClick:A}," Start Timer "),t("button",{onClick:O,type:"button",class:"bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 w-full"}," Reset ")])]),default:m(()=>[t("div",q,[t("div",null,[e[5]||(e[5]=t("label",{for:"hours",class:"block text-sm font-medium text-gray-700"},"Hours",-1)),M(t("input",{id:"hours","onUpdate:modelValue":e[0]||(e[0]=o=>a.value=o),type:"number",min:"1",max:"12",class:"block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",placeholder:"HH"},null,512),[[$,a.value,void 0,{number:!0}]])]),t("div",null,[e[6]||(e[6]=t("label",{for:"minutes",class:"block text-sm font-medium text-gray-700"},"Minutes",-1)),M(t("input",{id:"minutes","onUpdate:modelValue":e[1]||(e[1]=o=>f.value=o),type:"number",min:"0",max:"59",class:"block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",placeholder:"MM"},null,512),[[$,f.value,void 0,{number:!0}]])]),t("div",null,[e[8]||(e[8]=t("label",{for:"period",class:"block text-sm font-medium text-gray-700"},"AM/PM",-1)),M(t("select",{id:"period","onUpdate:modelValue":e[2]||(e[2]=o=>p.value=o),class:"block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"},e[7]||(e[7]=[t("option",{value:"AM"},"AM",-1),t("option",{value:"PM"},"PM",-1)]),512),[[j,p.value]])]),t("div",G,[e[9]||(e[9]=t("label",{for:"decimal-hours",class:"block text-sm font-medium text-gray-700"},"Decimal Hours",-1)),M(t("input",{id:"decimal-hours","onUpdate:modelValue":e[3]||(e[3]=o=>b.value=o),type:"number",step:"0.01",min:"0",class:"block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",placeholder:"e.g., 8.56"},null,512),[[$,b.value,void 0,{number:!0}]])])])]),_:1}),t("div",Q,[D(I,{title:"Timer",class:"w-full"},{header:m(()=>e[10]||(e[10]=[t("div",{class:"text-gray-600"},"Countdown Timer",-1)])),default:m(()=>[t("p",X,[t("span",Y,C(i.value),1)])]),_:1}),D(I,{title:"End Time",class:"w-full"},{header:m(()=>[t("div",{class:"flex justify-between"},[e[12]||(e[12]=t("div",{class:"text-gray-600"},"calculated end time",-1)),t("button",{onClick:P,class:"bg-purple-500 hover:bg-purple-600 text-white rounded-full p-2",title:"Set Reminder"},e[11]||(e[11]=[t("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor"},[t("path",{d:"M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"})],-1)]))])]),default:m(()=>[t("p",Z,[t("span",ee,C(c.value),1)])]),_:1})])]))}});export{oe as default};
