module.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);const n=e=>e.replace(/([a-z\d])([A-Z])/g,"$1_$2").toLowerCase(),o=(e,t)=>`${t}/SET_${n(e).toUpperCase()}`;var u=e=>{const{name:t,initialState:r,actions:o,createDefault:u=!0}=e,a=Object.keys(o).map(e=>({action:o[e],type:`${t}/${n(e).toUpperCase()}`}));return u&&Object.keys(r).map(e=>{const r=`${t}/SET_${n(e).toUpperCase()}`;if(-1===a.findIndex(e=>e.type===r))return a.push({action:null,type:`${t}/SET_${n(e).toUpperCase()}`})}),a.push({action:null,type:`${t}/RESET`}),a};r.d(t,"remaster",function(){return a}),r.d(t,"reset",function(){return i}),r.d(t,"setField",function(){return p});const a=e=>{const{name:t,initialState:r}=e,n=u(e),o={};n.forEach(({type:e})=>o[e.split("/")[1]]=e);return{REDUCER:(e=r,{type:o,payload:u})=>{const a=n.findIndex(e=>e.type===o),i=a>-1?n[a]:null;if(i){const{type:n,action:o}=i;if(o)return o(e,u);{const o=n===`${t}/RESET`,a=o?"":(e=>(e=>e.replace(/(-|_|\.|\s)+(.)?/g,(e,t,r)=>r?r.toUpperCase():"").replace(/(^|\/)([A-Z])/g,e=>e.toLowerCase()))(e.split("set_")[1]))(n.toLowerCase());return o?{...r}:{...e,[a]:u||r[a]}}}return e},TYPES:o}},i=e=>({type:`${e}/RESET`}),p=(e,t,r)=>({type:o(t,e),payload:r})}]);