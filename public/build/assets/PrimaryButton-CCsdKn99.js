import{j as s,x as u}from"./app-C7kt9-lz.js";function f({className:i="",disabled:r,children:o,link:e,onClick:t,...a}){return s.jsx("button",{...a,className:`
                inline-flex items-center px-4 py-2 bg-primaryColor border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-SecondaryColor focus:bg-SecondaryColor active:bg-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition ease-in-out duration-150
                ${r?"opacity-25 cursor-not-allowed":""}
                `+i,onClick:n=>{if(r){n.preventDefault();return}t&&t(n)},disabled:r,children:e?s.jsx(u,{href:e,children:o}):o})}export{f as P};
