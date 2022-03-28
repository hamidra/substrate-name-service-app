/*! For license information please see main.180ec186.js.LICENSE.txt */
  width: 2.5rem;
  height: 2.5rem;
`,HL=(pi(od)``,()=>(0,T.jsx)(T.Fragment,{children:(0,T.jsxs)(zt,{className:"px-4 py-3",variant:"dark",children:[(0,T.jsx)(zt.Brand,{children:(0,T.jsx)(IL,{to:"/",children:(0,T.jsx)(VL,{className:"shadow-sm rounded-circle p-1",src:sd,alt:"Polkadot"})})}),(0,T.jsx)(zt.Toggle,{"aria-controls":"basic-navbar-nav"}),(0,T.jsx)(zt.Collapse,{id:"basic-navbar-nav",className:"justify-content-center"}),(0,T.jsx)("div",{className:"d-flex justify-content-end",children:(0,T.jsx)(T.Fragment,{children:(0,T.jsx)(fn,{className:"d-none d-sm-block flex-grow-0 justify-content-end mr-2 shadow rounded-pill",children:(0,T.jsx)("div",{style:{minWidth:"5rem",fontWeight:"400"},className:"py-2 px-3 text-center h-100 d-flex",children:(0,T.jsx)(UR,{})})})})})]})}));__webpack_require__(2391);const RL={type:dt().string,tooltip:dt().bool,as:dt().elementType},LL=x.forwardRef(((e,t)=>{let{as:n="div",className:r,type:i="valid",tooltip:a=!1,...o}=e;return(0,T.jsx)(n,{...o,ref:t,className:M()(r,`${i}-${a?"tooltip":"feedback"}`)})}));LL.displayName="Feedback",LL.propTypes=RL;const jL=LL,DL=x.createContext({}),zL=x.forwardRef(((e,t)=>{let{bsPrefix:n,type:r,size:i,htmlSize:a,id:o,className:s,isValid:c=!1,isInvalid:u=!1,plaintext:l,readOnly:d,as:h="input",...f}=e;const{controlId:p}=(0,x.useContext)(DL);let m;return n=N(n,"form-control"),m=l?{[`${n}-plaintext`]:!0}:{[n]:!0,[`${n}-${i}`]:i},(0,T.jsx)(h,{...f,type:r,size:a,ref:t,readOnly:d,id:o||p,className:M()(s,m,c&&"is-valid",u&&"is-invalid","color"===r&&`${n}-color`)})}));zL.displayName="FormControl";const BL=Object.assign(zL,{Feedback:jL}),UL=x.forwardRef(((e,t)=>{let{id:n,bsPrefix:r,className:i,type:a="checkbox",isValid:o=!1,isInvalid:s=!1,as:c="input",...u}=e;const{controlId:l}=(0,x.useContext)(DL);return r=N(r,"form-check-input"),(0,T.jsx)(c,{...u,ref:t,type:a,id:n||l,className:M()(i,r,o&&"is-valid",s&&"is-invalid")})}));UL.displayName="FormCheckInput";const FL=UL,WL=x.createContext(null);WL.displayName="InputGroupContext";const qL=WL,XL=q("input-group-text",{Component:"span"}),GL=x.forwardRef(((e,t)=>{let{bsPrefix:n,size:r,hasValidation:i,className:a,as:o="div",...s}=e;n=N(n,"input-group");const c=(0,x.useMemo)((()=>({})),[]);return(0,T.jsx)(qL.Provider,{value:c,children:(0,T.jsx)(o,{ref:t,...s,className:M()(a,n,r&&`${n}-${r}`,i&&"has-validation")})})}));GL.displayName="InputGroup";const YL=Object.assign(GL,{Text:XL,Radio:e=>(0,T.jsx)(XL,{children:(0,T.jsx)(FL,{type:"radio",...e})}),Checkbox:e=>(0,T.jsx)(XL,{children:(0,T.jsx)(FL,{type:"checkbox",...e})})}),KL=x.forwardRef(((e,t)=>{let{as:n,bsPrefix:r,variant:i,size:a,active:o,className:s,...c}=e;const u=N(r,"btn"),[l,{tagName:d}]=qt({tagName:n,...c}),h=d;return(0,T.jsx)(h,{...l,...c,ref:t,className:M()(s,u,o&&"active",i&&`${u}-${i}`,a&&`${u}-${a}`,c.href&&c.disabled&&"disabled")})}));KL.displayName="Button",KL.defaultProps={variant:"primary",active:!1,disabled:!1};const ZL=KL,JL=pi(BL)`
  width: 100%;
  height: 4rem;
`,_L=e=>{let{placeholder:t,handleSearch:n,className:r}=e;const[i,a]=(0,x.useState)("");return(0,T.jsx)(T.Fragment,{children:(0,T.jsxs)(YL,{className:`mb-3 shadow ${r||""}`,children:[(0,T.jsx)(JL,{placeholder:t||"","aria-label":"Recipient's username","aria-describedby":"basic-addon2",value:i,onChange:e=>a(e.target.value),onKeyPress:e=>(e=>{console.log(e),"Enter"===e.key&&n(i)})(e)}),(0,T.jsx)(ZL,{variant:"outline-secondary",onClick:()=>n(i),children:"Search"})]})})},QL=pi((e=>{let{className:t}=e,n=lL();return(0,T.jsx)("div",{className:`container ${t||""}`,children:(0,T.jsx)("div",{className:"row justify-content-center",children:(0,T.jsx)("div",{className:"col-8",children:(0,T.jsx)(_L,{placeholder:"Find your perfect Kusama account name",handleSearch:e=>{n(`name/${e}`)}})})})})}))`
  margin-top: 30vh;
`;function $L(e,t){let n=0;return x.Children.map(e,(e=>x.isValidElement(e)?t(e,n++):e))}function ej(e,t,n){const r=(e-t)/(n-t)*100;return Math.round(1e3*r)/1e3}function tj(e,t){let{min:n,now:r,max:i,label:a,visuallyHidden:o,striped:s,animated:c,className:u,style:l,variant:d,bsPrefix:h,...f}=e;return(0,T.jsx)("div",{ref:t,...f,role:"progressbar",className:M()(u,`${h}-bar`,{[`bg-${d}`]:d,[`${h}-bar-animated`]:c,[`${h}-bar-striped`]:c||s}),style:{width:`${ej(r,n,i)}%`,...l},"aria-valuenow":r,"aria-valuemin":n,"aria-valuemax":i,children:o?(0,T.jsx)("span",{className:"visually-hidden",children:a}):a})}const nj=x.forwardRef(((e,t)=>{let{isChild:n,...r}=e;if(r.bsPrefix=N(r.bsPrefix,"progress"),n)return tj(r,t);const{min:i,now:a,max:o,label:s,visuallyHidden:c,striped:u,animated:l,bsPrefix:d,variant:h,className:f,children:p,...m}=r;return(0,T.jsx)("div",{ref:t,...m,className:M()(f,d),children:p?$L(p,(e=>(0,x.cloneElement)(e,{isChild:!0}))):tj({min:i,now:a,max:o,label:s,visuallyHidden:c,striped:u,animated:l,bsPrefix:d,variant:h},t)})}));nj.displayName="ProgressBar",nj.defaultProps={min:0,max:100,animated:!1,isChild:!1,visuallyHidden:!1,striped:!1};const rj=nj,ij=e=>{let{currentStep:t,currentNow:n,totalSteps:r}=e,i=0;if(100===n&&t===r)i=100;else if(t>0){n/=r,i=(t-1)*(100/r),i+=n}return(0,T.jsx)(rj,{now:i})},aj=x.forwardRef(((e,t)=>{let{bsPrefix:n,className:r,variant:i,as:a="img",...o}=e;const s=N(n,"card-img");return(0,T.jsx)(a,{ref:t,className:M()(i?`${s}-${i}`:s,r),...o})}));aj.displayName="CardImg";const oj=aj,sj=x.forwardRef(((e,t)=>{let{bsPrefix:n,className:r,as:i="div",...a}=e;const o=N(n,"card-header"),s=(0,x.useMemo)((()=>({cardHeaderBsPrefix:o})),[o]);return(0,T.jsx)(rn.Provider,{value:s,children:(0,T.jsx)(i,{ref:t,...a,className:M()(r,o)})})}));sj.displayName="CardHeader";const cj=sj,uj=bt("h5"),lj=bt("h6"),dj=q("card-body"),hj=q("card-title",{Component:uj}),fj=q("card-subtitle",{Component:lj}),pj=q("card-link",{Component:"a"}),mj=q("card-text",{Component:"p"}),yj=q("card-footer"),gj=q("card-img-overlay"),vj=x.forwardRef(((e,t)=>{let{bsPrefix:n,className:r,bg:i,text:a,border:o,body:s,children:c,as:u="div",...l}=e;const d=N(n,"card");return(0,T.jsx)(u,{ref:t,...l,className:M()(r,d,i&&`bg-${i}`,a&&`text-${a}`,o&&`border-${o}`),children:s?(0,T.jsx)(dj,{children:c}):c})}));vj.displayName="Card",vj.defaultProps={body:!1};const bj=Object.assign(vj,{Img:oj,Title:hj,Subtitle:fj,Body:dj,Link:pj,Text:mj,Header:cj,Footer:yj,ImgOverlay:gj}),wj=e=>{let{tab:t}=e,n=lL(),r=!!function(e){cL()||QR(!1);let{pathname:t}=uL();return(0,x.useMemo)((()=>xL(e,t)),[t,e])}(t.path);return(0,T.jsx)("button",{style:{minWidth:100},className:"btn "+(r?"btn-primary":"btn-outline-primary"),onClick:()=>(e=>{e&&n(e.path)})(t),children:t.title})},xj=e=>{let{tabs:t}=e;return(0,T.jsx)("div",{className:"btn-group",role:"group","aria-label":"Button Navigation Bar",children:t.map(((e,t)=>(0,T.jsx)(wj,{tab:e},t)))})},kj=pi((e=>{let{className:t}=e,{name:n}=hL(),r=uL(),i=((e,t)=>e.map((e=>({title:e,path:`${t}/${e.toLowerCase()}`}))))(["Register","Details","Subdomains"],(e=>{let t=e.split("/");return t.pop(),t.join("/")})(r.pathname));const{api:a,nameServiceProvider:o,connectedAccount:s}=kR(),[c,u]=(0,x.useState)();(0,x.useEffect)((()=>{n&&(null===o||void 0===o||o.getRegistration(n).then((e=>{var t;u(null===e||void 0===e||null===(t=e.unwrapOr(null))||void 0===t?void 0:t.toJSON())})))}),[n,o,null===r||void 0===r?void 0:r.pathname]);a&&jA(a);return(0,T.jsx)("div",{className:"container d-flex justify-content-center",children:(0,T.jsxs)(bj,{className:`m-sm-5 w-100 ${t}`,children:[(0,T.jsx)(bj.Header,{children:(0,T.jsxs)("div",{className:"d-flex flex-column flex-md-row px-md-4 py-1 justify-content-between",children:[(0,T.jsx)("div",{className:"d-flex align-items-center",children:(0,T.jsx)("div",{className:"fw-light fs-4",children:n})}),(0,T.jsx)(xj,{tabs:i})]})}),(0,T.jsx)(bj.Body,{children:(0,T.jsx)(rL,{context:{nameRegistration:c}})})]})})}))`
  max-width: 1000px;
`;function Sj(){return(0,x.useContext)(dL)}var Mj=__webpack_require__(2426),Tj=__webpack_require__.n(Mj);const Ej=e=>{let{unit:t,value:n,step:r,setValue:i}=e;return(0,T.jsxs)("div",{className:"input-group",children:[(0,T.jsx)("button",{className:"btn btn-outline-secondary",type:"button",onClick:()=>i(n-r),children:"-"}),(0,T.jsx)("input",{type:"text",className:"form-control","aria-label":"counter input",value:n,onChange:e=>{var t;return i(parseInt(null===e||void 0===e||null===(t=e.target)||void 0===t?void 0:t.value))}}),(0,T.jsx)("span",{className:"input-group-text",children:t}),(0,T.jsx)("button",{className:"btn btn-outline-secondary",type:"button",onClick:()=>i(n+r),children:"+"})]})},Cj=e=>{let{leasePeriod:t,setLeasePeriod:n}=e,{name:r}=hL();const{api:i,nameServiceProvider:a,connectedAccount:o,chainInfo:s}=kR(),{tierThreeLetters:c,tierFourLetters:u,tierDefault:l,blocksPerRegistrationPeriod:d,feePerRegistrationPeriod:h}=(null===a||void 0===a?void 0:a.constants)||{},f=((e,t)=>{let n=null===e||void 0===e?void 0:e.split(".")[0];if(!n||!t||!h)return;let r=(e=>{let t=null===e||void 0===e?void 0:e.length,n=new(ou())(0);return t&&(n=t<=3?c:4===t?u:l),n})(n),i=t.mul(h);return r.add(i)})(r,t),p=((e,t,n)=>{if(!e&&0!=e||!t)return null;t=parseInt(t),e=new au.BN(e);const r=new au.BN(10).pow(new au.BN(t)),i=e.divmod(r),a=i.div.toString();let o=i.mod.toString().padStart(t,"0");var s;(n||0===n)&&(o=null===(s=o)||void 0===s?void 0:s.slice(0,n)),o=((e,t)=>{if(!e)return e;let n=e.length;for(;n>0&&e.charAt(n-1)===t;)n-=1;return e.substring(0,n)})(o,"0");let c=a;return o&&(c+=`.${o}`),c})(f,null===s||void 0===s?void 0:s.decimals,5);return(0,T.jsxs)("div",{className:"row justify-content-between",children:[(0,T.jsxs)("div",{className:"col-12 col-md-6 my-2",children:[(0,T.jsx)(Ej,{value:t.toNumber(),unit:`x ${d} blocks`,step:1,setValue:e=>{return t=e,void n(new(ou())(t));var t}}),(0,T.jsx)("div",{className:"mb-2 form-text",children:"Registration Period"}),(0,T.jsx)("div",{children:`for estimated registration period of ${(()=>{let e="";if(s){let n=(()=>{let e;return t&&d&&(e=t.mul(d).toNumber()),e})(),{blockTimeMs:r}=s,i=((e,t)=>e*t)(r,n);e=Tj().duration(i).humanize()}return e})()}`})]}),(0,T.jsxs)("div",{className:"col-12 col-md-6 my-2",children:[(0,T.jsx)("div",{className:"fw-light fs-4",children:`${p} DOT`}),(0,T.jsx)("div",{className:"mb-2 form-text",children:"Registration Price"}),(0,T.jsx)("div",{children:"+ 0.001 DOT tx fees"})]})]})},Pj=e=>{let{currentStep:t,currentStepProgress:n}=e;return(0,T.jsxs)("div",{children:[(0,T.jsxs)("div",{className:"row",children:[(0,T.jsxs)("div",{className:"col-12",children:[(0,T.jsx)("hr",{}),(0,T.jsx)("div",{className:"fs-4",children:"To Register your name you need to complete 3 steps:"})]}),(0,T.jsxs)("div",{className:"col-12 pt-2 col-md-4 pt-md-3 "+(1===t?"text-primary":"text-muted"),children:[(0,T.jsx)("h4",{children:" Step 1 : Request to Register"}),(0,T.jsx)("p",{children:"Your wallet will open and you will be asked to confirm the first of two transactions required for registration. If the second transaction is not processed within 7 days of the first, you will need to start again from step 1."})]}),(0,T.jsxs)("div",{className:"col-12 pt-2 col-md-4 pt-md-3 "+(2===t?"text-success":"text-muted"),children:[(0,T.jsx)("h4",{children:" Step 2 : Wait at least for 1 minute"}),(0,T.jsx)("p",{children:"The waiting period is required to ensure another person hasn\u2019t tried to register the same name and protect you after your request."})]}),(0,T.jsxs)("div",{className:"col-12 pt-2 col-md-4 pt-md-3 "+(3===t?"text-success":"text-muted"),children:[(0,T.jsx)("h4",{children:" Step 3 :Complete your registration"}),(0,T.jsx)("p",{children:'Click "register" and your wallet will re-open. Only after the 2nd transaction is confirmed you\'ll know if you got the name.'})]})]}),(0,T.jsx)("div",{className:"row",children:(0,T.jsx)("div",{className:"col py-3",children:(0,T.jsx)(ij,{currentStep:t,totalSteps:3,currentNow:n})})})]})},Nj=()=>{const{nameServiceProvider:e,connectedAccount:t}=kR();let{name:n}=hL(),[r,i]=(0,x.useState)(new(ou())(1)),[a,o]=(0,x.useState)(1),[s,c]=(0,x.useState)(0),u=(0,x.useRef)(s),[l,d]=(0,x.useState)(null);const[h,f]=(0,x.useState)(null),p=localStorage.getItem(n),m=isNaN(Number(p))?null:Number(p);console.log(m);(0,x.useEffect)((()=>{e&&(async t=>{if(t){t&&d(t);let r=e.generateCommitmentHashCodec(n,t);await e.getCommitment(r)&&(o(3),c(0))}})(m)}),[m,e]);const{title:y,disabled:g,clickHandler:v}=(e=>{let t={title:"Request to Register",disabled:!1,clickHandler:()=>w()};switch(e){case 1:break;case 2:t={title:"Register",disabled:!0,clickHandler:()=>null};break;case 3:t={title:"Register",disabled:!1,clickHandler:()=>b()}}return t})(a),b=async()=>{f(null);try{if(!t)throw new Error("No account is connected. Please connect an account be able to sign the request.");let i=await LA(t);e.reveal(i,n,l,r).then((()=>{o(3),c(100)})),o(3),c(50)}catch(i){c(0),f(null===i||void 0===i?void 0:i.message)}},w=async()=>{f(null);try{if(!t)throw new Error("No account is connected. Please connect an account to be able to sign the request.");let r=await LA(t);const i=Math.floor(Math.random()*2**32);d(i);const a=e.generateCommitmentHashCodec(n,i);e.commit(r,a).then((()=>{o(2),c(0),localStorage.setItem(n,i.toString());let e=setInterval((()=>{let t=u.current+10;console.log(t),t<100?(c(t),u.current=t):(o(3),c(0),clearInterval(e))}),60)})),o(1),c(50)}catch(r){c(0),f(null===r||void 0===r?void 0:r.message)}};return(0,T.jsx)(T.Fragment,{children:(0,T.jsxs)("form",{className:"px-2",children:[(0,T.jsx)(Cj,{leasePeriod:r,setLeasePeriod:e=>i(e)}),(0,T.jsx)(Pj,{currentStep:a,currentStepProgress:s}),(0,T.jsxs)("div",{className:"row",children:[(0,T.jsx)("div",{className:"col d-flex justify-content-end pe-3",children:(0,T.jsx)("button",{type:"button",className:"btn btn-outline-primary",onClick:e=>v(),disabled:g,children:y})}),(0,T.jsx)("div",{className:"w-100 m-2"}),(0,T.jsx)("div",{className:"col d-flex justify-content-end pe-3",children:(0,T.jsx)("div",{className:"text-danger",children:h||""})})]})]})})},Oj=()=>{const{nameServiceProvider:e,connectedAccount:t}=kR(),{name:n}=hL(),{nameRegistration:r}=Sj();return(0,T.jsx)(T.Fragment,{children:r?(0,T.jsx)("div",{children:`${n} is already registered.`}):(0,T.jsx)(Nj,{})})},Aj=()=>{let{name:e}=hL();const{nameRegistration:t}=Sj();return(0,T.jsx)(T.Fragment,{children:(0,T.jsx)("form",{children:(0,T.jsxs)("div",{className:"row p-5",children:[(0,T.jsx)("div",{className:"col-12 d-flex justify-content-center pe-3",children:(0,T.jsx)("p",{children:`${e} has no subdomains`})}),(0,T.jsx)("div",{className:"col-12 d-flex justify-content-center pe-3",children:(0,T.jsx)("button",{className:"btn btn-outline-primary",type:"button",children:"Add subdomains"})})]})})})},Ij=e=>{let{name:t,nameRegistration:n}=e,[r,i]=(0,x.useState)(new(ou())(1)),[a,o]=(0,x.useState)(!1),s=null===n||void 0===n?void 0:n.expiry,[c,u]=(0,x.useState)(""),{api:l,apiState:d,nameServiceProvider:h,connectedAccount:f,chainInfo:p}=kR(),{blockTimeMs:m}=p||{};(0,x.useEffect)((()=>{"READY"===d&&m&&s&&(async(e,t,n)=>{var r;let i="",a=e.query.timestamp.now(),o=e.rpc.chain.getHeader(),[s,c]=await Promise.all([a,o]),u={number:null===c||void 0===c||null===(r=c.toJSON())||void 0===r?void 0:r.number,timestamp:null===s||void 0===s?void 0:s.toJSON()};console.log(u);let l=((e,t,n)=>{let r=t-e.number;return e.timestamp+r*n})(u,n,t);return console.log("timestamp",l),i=Tj()(l).format("dddd, MMMM Do YYYY, h:mm a"),i})(l,m,s).then((e=>{u(e)}))}),[l,d,m,s]);let y=async()=>{a?g().then((()=>{o(!1)})):o(!0)},g=async()=>{let e=await LA(f);return h.renew(e,t,r)};return(0,T.jsxs)(T.Fragment,{children:[(0,T.jsxs)("div",{className:"mb-3 row",children:[(0,T.jsx)("label",{className:"col-md-3 col-form-label",children:"Expirtion Block"}),(0,T.jsxs)("div",{className:"col-md-9 d-flex flex-column flex-md-row justify-content-between",children:[(0,T.jsx)("div",{className:"col-form-label",children:n?n.expiry:"Not registered"}),(0,T.jsx)("div",{className:"col-form-label",children:c}),!a&&(0,T.jsx)("button",{className:"btn btn-outline-primary",type:"button",onClick:()=>y(),children:"Extend"})]})]}),a&&(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)("div",{className:"mb-3 row",children:(0,T.jsx)("div",{className:"col",children:(0,T.jsx)("div",{children:(0,T.jsx)(Cj,{leasePeriod:r,setLeasePeriod:e=>i(e)})})})}),(0,T.jsx)("div",{className:"mb-3 row",children:(0,T.jsxs)("div",{className:"col d-flex justify-content-end",children:[(0,T.jsx)("button",{className:"btn btn-outline-primary mx-3",type:"button",onClick:()=>{o(!1)},children:"Cancel"}),(0,T.jsx)("button",{className:"btn btn-outline-primary  mx-3",type:"button",onClick:()=>y(),children:"Extend"})]})})]})]})},Vj=()=>{const{name:e}=hL(),{nameRegistration:t}=Sj();return(0,T.jsx)(T.Fragment,{children:(0,T.jsxs)("form",{className:"p-3",children:[(0,T.jsxs)("div",{className:"mb-3 row",children:[(0,T.jsx)("label",{className:"col-md-3 col-form-label",children:"Parent"}),(0,T.jsx)("div",{className:"col-md-9",children:(0,T.jsx)("div",{children:".dot"})})]}),(0,T.jsxs)("div",{className:"mb-3 row",children:[(0,T.jsx)("label",{className:"col-md-3 col-form-label",children:"REGISTRANT"}),(0,T.jsx)("div",{className:"col-md-9 col-form-label",children:(0,T.jsx)("div",{children:t?t.registrant:"Not registered"})})]}),(0,T.jsxs)("div",{className:"mb-3 row",children:[(0,T.jsx)("label",{className:"col-md-3 col-form-label",children:"CONTROLLER"}),(0,T.jsx)("div",{className:"col-md-9 col-form-label",children:(0,T.jsx)("div",{children:t?t.owner:"Not registered"})})]}),(0,T.jsx)(Ij,{name:e,nameRegistration:t})]})})},Hj=()=>(0,T.jsxs)(oL,{children:[(0,T.jsx)(iL,{path:"/",element:(0,T.jsx)(QL,{})}),(0,T.jsx)(iL,{path:"/name/:name/",element:(0,T.jsx)(nL,{to:"register",replace:!0})}),(0,T.jsxs)(iL,{path:"/name/:name/*",element:(0,T.jsx)(kj,{}),children:[(0,T.jsx)(iL,{path:"register",element:(0,T.jsx)(Oj,{})}),(0,T.jsx)(iL,{path:"details",element:(0,T.jsx)(Vj,{})}),(0,T.jsx)(iL,{path:"subdomains",element:(0,T.jsx)(Aj,{})})]})]});function Rj(e){const{api:t,apiState:n,keyring:r,keyringState:i}=kR();return"READY"===n&&(window.api=t),"READY"===i&&(window.keyring=r),null}const Lj=x.forwardRef(((e,t)=>{let{bsPrefix:n,variant:r,animation:i,size:a,as:o="div",className:s,...c}=e;n=N(n,"spinner");const u=`${n}-${i}`;return(0,T.jsx)(o,{ref:t,...c,className:M()(s,u,a&&`${u}-${a}`,r&&`text-${r}`)})}));Lj.displayName="Spinner";const jj=Lj;function Dj(e){let{show:t,message:n}=e;return(0,T.jsx)(T.Fragment,{children:(0,T.jsx)(DR,{show:t,children:(0,T.jsx)(DR.Body,{children:(0,T.jsxs)("div",{style:{height:"100px"},className:"d-flex flex-column justify-content-around align-items-center",children:[(0,T.jsx)(jj,{animation:"border",role:"status",children:(0,T.jsx)("span",{className:"visually-hidden",children:"Processing..."})}),(0,T.jsx)("div",{children:n})]})})})})}function zj(e){let{show:t,message:n,handleClose:r}=e;return(0,T.jsx)(T.Fragment,{children:(0,T.jsxs)(DR,{show:t,onHide:r,children:[(0,T.jsx)(DR.Header,{closeButton:!0,children:(0,T.jsx)(DR.Title,{children:"Something went wrong"})}),(0,T.jsx)(DR.Body,{children:(0,T.jsx)("div",{style:{height:"100px"},className:"d-flex flex-column justify-content-around align-items-center",children:(0,T.jsx)("div",{children:n})})})]})})}function Bj(){const{apiState:e,apiError:t}=kR(),n="ERROR"===e,[r,i]=(0,x.useState)(!0);return console.log(n,r),(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(zj,{show:n&&r,message:"An error happened while connecitng Polkadot.",handleClose:()=>i(!1)}),(0,T.jsx)(Dj,{show:!n&&"READY"!==e,message:"Connecting to Polkadot..."})]})}function Uj(){const{apiState:e}=kR();return(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(HL,{}),(0,T.jsx)(Hj,{}),(0,T.jsx)(Bj,{})]})}const Fj=function(){return(0,T.jsx)(T.Fragment,{children:(0,T.jsxs)(xR,{children:[(0,T.jsx)(Rj,{}),(0,T.jsx)(AL,{children:(0,T.jsx)(A,{fluid:!0,children:(0,T.jsx)(Uj,{})})})]})})},Wj=e=>{e&&e instanceof Function&&__webpack_require__.e(787).then(__webpack_require__.bind(__webpack_require__,787)).then((t=>{let{getCLS:n,getFID:r,getFCP:i,getLCP:a,getTTFB:o}=t;n(e),r(e),i(e),a(e),o(e)}))};k.render((0,T.jsx)(x.StrictMode,{children:(0,T.jsx)(Fj,{})}),document.getElementById("root")),Wj()})()})();
//# sourceMappingURL=main.180ec186.js.map