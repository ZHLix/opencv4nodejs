"use strict";var e=require("assert"),t=require("fs"),n=require("path"),o=require("./commons-93fafeec.js");function r(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var i=r(e),a=r(t),c=r(n);const s=e=>"function"==typeof e,d=e=>e.prototype.constructor.name.endsWith("Async"),l=e=>function(...t){return s(t[t.length-1])?e.apply(this,t):new Promise(((n,o)=>{const r=Array.prototype.slice.call(t);r.push((function(e,t){return e?o(e):n(t)})),e.apply(this,r)}))};function u(e){const t={fontType:e.FONT_HERSHEY_SIMPLEX,fontSize:.8,thickness:2,lineType:e.LINE_4};function n(n,o){const r=(o=o||{}).fontSize||t.fontType,i=o.fontSize||t.fontSize,a=o.thickness||t.thickness,{size:c,baseLine:s}=e.getTextSize(n,r,i,a);return{width:c.width,height:c.height,baseLine:s}}function o(e,t){return e.reduce(((e,o)=>{const r=((e,t)=>n(e,t).width)(o.text,t);return e<r?r:e}),0)}function r(e,t){return n(e.text,t).height}e.drawTextBox=(n,i,a,c)=>{const{x:s,y:d}=i,l=o(a)+20,u=function(e,t){return e.reduce(((e,n)=>e+r(n,t)),0)}(a)+20+10*(a.length-1),f=function(t,n){const o=Math.min(Math.max(0,t.x),n.cols),r=Math.min(Math.max(0,t.y),n.rows),i=Math.min(t.width,n.cols-o),a=Math.min(t.height,n.rows-r);return new e.Rect(o,r,i,a)}(new e.Rect(s,d,l,u),n),h=n.getRegion(f).mul(c);let p=new e.Point2(10,10);return a.forEach((n=>{const o=Object.assign({},t,n);p=p.add(new e.Point2(0,r(n))),function(n,o,r,i){const a=i.fontType||t.fontType,c=i.fontSize||t.fontSize,s=i.color||new e.Vec3(255,255,255),d=i.thickness||t.thickness,l=i.lineType||t.lineType,u=new e.Point2(r.x,r.y);n.putText(o,u,a,c,s,d,l,0)}(h,n.text,p,o),p=p.add(new e.Point2(0,10))})),h.copyTo(n.getRegion(f)),n},e.drawDetection=(t,n,o={})=>{const r=n.toSquare(),{x:i,y:a,width:c,height:s}=r,d=c/(o.segmentFraction||6),l=new e.Point2(i,a),u=new e.Point2(i,a+s),f=new e.Point2(i+c,a),h=new e.Point2(i+c,a+s),p={thickness:2,...o};return t.drawLine(l,l.add(new e.Point2(0,d)),p),t.drawLine(l,l.add(new e.Point2(d,0)),p),t.drawLine(u,u.add(new e.Point2(0,-d)),p),t.drawLine(u,u.add(new e.Point2(d,0)),p),t.drawLine(f,f.add(new e.Point2(0,d)),p),t.drawLine(f,f.add(new e.Point2(-d,0)),p),t.drawLine(h,h.add(new e.Point2(0,-d)),p),t.drawLine(h,h.add(new e.Point2(-d,0)),p),r}}const f=["CV_8U","CV_8S","CV_16U","CV_16S","CV_32S","CV_32F","CV_64F","CV_8UC1","CV_8UC2","CV_8UC3","CV_8UC4","CV_8SC1","CV_8SC2","CV_8SC3","CV_8SC4","CV_16UC1","CV_16UC2","CV_16UC3","CV_16UC4","CV_16SC1","CV_16SC2","CV_16SC3","CV_16SC4","CV_32SC1","CV_32SC2","CV_32SC3","CV_32SC4","CV_32FC1","CV_32FC2","CV_32FC3","CV_32FC4","CV_64FC1","CV_64FC2","CV_64FC3","CV_64FC4"];function h(e){return u(e),function(e){e.toMatTypeName=t=>{for(const n of f)if(e[n]===t)return n},e.getScoreMax=(t,n,o)=>{if(t.type!==e.CV_32F)throw Error("this method can only be call on a CV_32F Mat");if(2!==t.dims)throw Error("this method can only be call on a 2 dimmention Mat");const r=[],{cols:i,rows:a}=t,c=t.getData();let s,d,l,u;o?(s=o.x,l=o.y,d=s+o.width,u=l+o.height):(s=l=0,d=i,u=a);for(let e=l;e<u;e++){let t=4*(s+e*i);for(let o=s;o<d;o++){const i=c.readFloatLE(t);i>n&&r.push([o,e,i]),t+=4}}return r},e.dropOverlappingZone=(e,t)=>{const n=t.length,o=e.cols/2,r=e.rows/2;for(let e=0;e<n;e++){const i=t[e];if(i[2])for(let a=e+1;a<n;a++){const e=t[a];if(e[2]&&!(Math.abs(i[1]-e[1])>r||Math.abs(i[0]-e[0])>o)){if(!(i[2]>e[2])){i[2]=0;break}e[2]=0}}}return t.filter((e=>e[2]))}}(e),function(e){const t=e.calcHist;e.calcHist=function(n,o,r){i.default(n instanceof e.Mat,"Imgproc::CalcHist - Error: expected argument 0 to be of type Mat"),i.default(Array.isArray(o),"Imgproc::CalcHist - Error: expected argument 1 to be of type array of HistAxes");let a=!1;const c=(o=o.slice()).length;for(let t=0;t<c;++t){const n=o[t];n instanceof e.HistAxes||(a||(a=!0,console.warn(`Imgproc::CalcHist - Deprecated support for object in argument 1 at index ${t}. Please switch to using HistAxes instances.`)),o[t]=new e.HistAxes(n))}return r?t(n,o,r):t(n,o)}}(e),e}const p=function(e){const t=function(e){let t,n="";o.isElectronWebpack()?n="../build/Release/opencv4nodejs.node":(n=c.default.join(__dirname,"../build/Debug/opencv4nodejs.node"),a.default.existsSync(n)||(n=c.default.join(__dirname,"../build/Release/opencv4nodejs.node")),n=n.replace(/\.node$/,""));try{t=require(n)}catch(e){if(!process.env.path)throw e;try{t=require(n)}catch(e){if(e instanceof Error){let t="";const o=e.message;throw t=o.startsWith("Cannot find module")?`require("${n}");\n          Failed with: ${o}, openCV binding not available, reed:\n          build-opencv --help\n          And build missing file with:\n          npx build-opencv --version 4.5.4 rebuild\n\n          PS: a 'npm link' may help\n          `:o.startsWith("The specified module could not be found.")?`require("${n}");\n          Failed with: ${o}, openCV module looks broken, clean you builds directory and rebuild everything\n          rm -r <path to your build directory>\n          npx build-opencv --version 4.5.4 rebuild\n          `:`require("${n}");\n          Failed with: ${o}\n          `,Error(t)}throw e}}const{haarCascades:r,lbpCascades:i}=t;return Object.keys(r).forEach((e=>t[e]=o.resolvePath(c.default.join(__dirname,"haarcascades"),r[e]))),Object.keys(i).forEach((e=>t[e]=o.resolvePath(c.default.join(__dirname,"lbpcascades"),i[e]))),t}();if(!t.accumulate)throw Error("failed to load opencv basic accumulate not found.");if(!t.blur)throw Error("failed to load opencv basic blur not found.");let n=(e=>{const t=Object.keys(e).filter((t=>s(e[t]))).map((t=>e[t])),n=t.filter(d);return t.filter((e=>!!Object.keys(e.prototype).length)).forEach((e=>{Object.keys(e.prototype).filter((t=>d(e.prototype[t]))).forEach((t=>e.prototype[t]=l(e.prototype[t])))})),n.forEach((t=>{e[t.prototype.constructor.name]=l(t)})),e})(t);return n=h(n),n}(),C={cv:p};for(const e in p)C[e]=p[e];C.cv=p,module.exports=C;