(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{65:function(e,t,a){"use strict";a.r(t);var n=a(1),c=a.n(n),s=a(30),r=a.n(s),i=a(4),l=a(3),j=a.p+"static/media/logo.6ce24c58.svg",o=(a(9),a(0));var p=function(){return Object(o.jsx)("div",{className:"App",children:Object(o.jsxs)("header",{className:"App-header",children:[Object(o.jsx)("img",{src:j,className:"App-logo",alt:"logo"}),Object(o.jsx)("p",{children:"Agenda tab"}),Object(o.jsx)("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer",children:"Learn React"})]})})};var b=function(){return Object(o.jsx)("div",{className:"App",children:Object(o.jsxs)("header",{className:"App-header",children:[Object(o.jsx)("img",{src:j,className:"App-logo",alt:"logo"}),Object(o.jsx)("p",{children:"Create Ad tab"}),Object(o.jsx)("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer",children:"Learn React"})]})})};var d=function(){return Object(o.jsx)("div",{className:"App",children:Object(o.jsxs)("header",{className:"App-header",children:[Object(o.jsx)("img",{src:j,className:"App-logo",alt:"logo"}),Object(o.jsx)("p",{children:"Create Event tab"}),Object(o.jsx)("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer",children:"Learn React"})]})})};var h=function(){return Object(o.jsx)("div",{className:"App",children:Object(o.jsxs)("header",{className:"App-header",children:[Object(o.jsx)("img",{src:j,className:"App-logo",alt:"logo"}),Object(o.jsx)("p",{children:"Create Ingredient tab"}),Object(o.jsx)("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer",children:"Learn React"})]})})};var O=function(){return Object(o.jsx)("div",{className:"App",children:Object(o.jsxs)("header",{className:"App-header",children:[Object(o.jsx)("img",{src:j,className:"App-logo",alt:"logo"}),Object(o.jsx)("p",{children:"Create Recipe tab"}),Object(o.jsx)("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer",children:"Learn React"})]})})};var m=function(){return Object(o.jsx)("div",{className:"App",children:Object(o.jsxs)("header",{className:"App-header",children:[Object(o.jsx)("img",{src:j,className:"App-logo",alt:"logo"}),Object(o.jsx)("p",{children:"Edit user tab"}),Object(o.jsx)("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer",children:"Learn React"})]})})},g=a(16),u=a.n(g),x=a(31),f=a(10),N=a.p+"static/media/light.6366b6e5.jpg",v=a.p+"static/media/dark.9d88e7a2.jpg",A=a(34),k=a(32),C=a.n(k),S=a(19);var w=function(e){var t=e.location,a=Object(n.useState)(null),c=Object(f.a)(a,2),s=c[0],r=c[1],j=Object(l.f)(),p=new URLSearchParams(t.search).get("tab");return Object(n.useEffect)((function(){null!==p&&null!==s||j.replace("?tab=Login")}),[]),null===s&&(console.log("User is null"),function(){var e=localStorage.getItem("user");null!==e&&(e=JSON.parse(e),r(e))}()),Object(o.jsxs)("div",{className:"app-container",children:[null!==p&&"Login"!==p&&null!==s?Object(o.jsxs)("div",{className:"nav-container",children:[Object(o.jsxs)("div",{className:"nav-profile-container",children:[Object(o.jsx)("p",{className:"nav-user-rol",children:s.personalInfo.rol}),Object(o.jsx)("p",{className:"nav-user-name",children:s.personalInfo.name})]}),Object(o.jsxs)("ul",{children:[Object(o.jsx)("li",{children:Object(o.jsx)(i.b,{className:"nav-item-link",to:"/Tendrish-admin-webApp?tab=Agenda",children:"Agenda"})}),Object(o.jsx)("li",{children:Object(o.jsx)(i.b,{className:"nav-item-link",to:"/Tendrish-admin-webApp?tab=CreateAd",children:"Create Ad"})}),Object(o.jsx)("li",{children:Object(o.jsx)(i.b,{className:"nav-item-link",to:"/Tendrish-admin-webApp?tab=CreateEvent",children:"Create Event"})}),Object(o.jsx)("li",{children:Object(o.jsx)(i.b,{className:"nav-item-link",to:"/Tendrish-admin-webApp?tab=CreateIngredient",children:"Create Ingredient"})}),Object(o.jsx)("li",{children:Object(o.jsx)(i.b,{className:"nav-item-link",to:"/Tendrish-admin-webApp?tab=CreateRecipe",children:"Create Recipe"})}),Object(o.jsx)("li",{children:Object(o.jsx)(i.b,{className:"nav-item-link",to:"/Tendrish-admin-webApp?tab=EditUser",children:"Edit User"})}),Object(o.jsx)("li",{children:Object(o.jsx)(i.b,{className:"nav-item-link",to:"/Tendrish-admin-webApp?tab=Login",children:"Login"})}),Object(o.jsx)("li",{children:Object(o.jsx)(i.b,{className:"nav-item-link",to:"/Tendrish-admin-webApp?tab=Profiles",children:"Profiles"})}),Object(o.jsx)("li",{children:Object(o.jsx)(i.b,{className:"nav-item-link",to:"/Tendrish-admin-webApp?tab=Recipe",children:"Recipe"})}),Object(o.jsx)("li",{children:Object(o.jsx)(i.b,{className:"nav-item-link",to:"/Tendrish-admin-webApp?tab=Stats",children:"Stats"})})]})]}):null,function(e){return"Agenda"===e?Object(o.jsx)(L,{}):"CreateAd"===e?Object(o.jsx)(R,{}):"CreateEvent"===e?Object(o.jsx)(E,{}):"CreateIngredient"===e?Object(o.jsx)(I,{}):"CreateRecipe"===e?Object(o.jsx)(T,{}):"EditUser"===e?Object(o.jsx)(_,{}):"Login"===e?Object(o.jsx)(y,{}):"Profiles"===e?Object(o.jsx)(P,{}):"Recipe"===e?Object(o.jsx)(U,{}):"Stats"===e?Object(o.jsx)(F,{}):void j.replace("?tab=Login")}(p)]})},L=p,R=b,E=d,I=h,T=O,_=m,y=function(){var e=Object(n.useState)(N),t=Object(f.a)(e,2),a=t[0],c=t[1],s=Object(n.useState)(!1),r=Object(f.a)(s,2),i=r[0],j=r[1],p=Object(n.useState)({lang:"es",colorScheme:"light"}),b=Object(f.a)(p,2),d=b[0],h=(b[1],Object(n.useState)("")),O=Object(f.a)(h,2),m=O[0],g=O[1],k=Object(n.useState)(""),w=Object(f.a)(k,2),L=w[0],R=w[1],E=Object(n.useState)(!1),I=Object(f.a)(E,2),T=I[0],_=I[1],y=Object(l.f)(),P=Object(n.useState)(null),U=Object(f.a)(P,2),F=U[0],J=U[1],B=function(){var e=Object(x.a)(u.a.mark((function e(){var t,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,C()({method:"post",url:"https://us-central1-tendrishh.cloudfunctions.net/server",data:{method:"admin-signIn",email:m,password:L}});case 3:200===(t=e.sent).status?(a={id:t.data.id,personalInfo:t.data.personalInfo},localStorage.setItem("user",JSON.stringify(a)),y.push("?tab=Stats")):(j(!1),console.log("".concat(t.status,": ").concat(t.data.error)),J("Error al iniciar sesi\xf3n, comprueba tu correo y contrase\xf1a")),e.next=12;break;case 7:e.prev=7,e.t0=e.catch(0),J("Error al iniciar sesi\xf3n, comprueba tu correo y contrase\xf1a"),j(!1),console.log("Error: ".concat(e.t0));case 12:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();return Object(n.useEffect)((function(){"dark"===d.colorScheme&&c(v)}),[d]),Object(o.jsxs)("div",{className:"login-container",children:[Object(o.jsx)(A.a,{duration:800,children:Object(o.jsx)("img",{alt:"Logo",src:a,className:"login-logo"})}),Object(o.jsxs)("div",{className:"login-form-container",children:[Object(o.jsx)("h1",{className:"sign-in",children:"Iniciar sesi\xf3n"}),Object(o.jsxs)("div",{className:"login-input-container",children:[Object(o.jsx)("p",{className:"login-input-name",children:"Correo"}),Object(o.jsx)("input",{className:"login-input",placeholder:"alguien@example.com",onChange:function(e){return g(e.target.value)}})]}),Object(o.jsxs)("div",{className:"login-input-container",children:[Object(o.jsx)("p",{className:"login-input-name",children:"Contrase\xf1a"}),Object(o.jsx)("input",{className:"login-input",placeholder:"Contrase\xf1a",type:"password",onChange:function(e){return R(e.target.value)},id:"password-input",onKeyUp:function(e){"Enter"===e.key&&(e.preventDefault(),j(!0),B())}})]}),null!==F?Object(o.jsx)("p",{className:"sign-in-error",children:F}):null,Object(o.jsxs)("div",{onClick:function(){_(!T)},className:"keep-signed-in-container",children:[T?Object(o.jsx)(S.a,{className:"keep-siged-in-icon"}):Object(o.jsx)(S.b,{className:"keep-siged-in-icon"}),Object(o.jsx)("p",{className:"keep-signed-in",children:"Mantener sesi\xf3n iniciada"})]}),Object(o.jsx)("div",{className:i?"sign-in-btn btn submited":"sign-in-btn btn",onClick:function(){j(!0),B()},children:"Iniciar sesi\xf3n"}),Object(o.jsx)("p",{className:i?"submited login-forgot-password":"login-forgot-password",children:"Olvid\xe9 mi contrase\xf1a"})]})]})},P=function(){return Object(o.jsx)("div",{className:"App",children:Object(o.jsxs)("header",{className:"App-header",children:[Object(o.jsx)("img",{src:j,className:"App-logo",alt:"logo"}),Object(o.jsx)("p",{children:"Profiles tab"}),Object(o.jsx)("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer",children:"Learn React"})]})})},U=function(){return Object(o.jsx)("div",{className:"App",children:Object(o.jsxs)("header",{className:"App-header",children:[Object(o.jsx)("img",{src:j,className:"App-logo",alt:"logo"}),Object(o.jsx)("p",{children:"Recipe tab"}),Object(o.jsx)("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer",children:"Learn React"})]})})},F=function(){return Object(o.jsx)("div",{className:"App",children:Object(o.jsxs)("header",{className:"App-header",children:[Object(o.jsx)("img",{src:j,className:"App-logo",alt:"logo"}),Object(o.jsx)("p",{children:"Stats tab"}),Object(o.jsx)("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer",children:"Learn React"})]})})},J=w,B=function(){return Object(o.jsx)(i.a,{children:Object(o.jsxs)(l.c,{children:[Object(o.jsx)(l.a,{path:"/Tendrish-admin-webApp/",component:J}),Object(o.jsx)(l.a,{path:"/",component:J})]})})},D=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,66)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,s=t.getLCP,r=t.getTTFB;a(e),n(e),c(e),s(e),r(e)}))};r.a.render(Object(o.jsx)(c.a.StrictMode,{children:Object(o.jsx)(B,{})}),document.getElementById("root")),D()},9:function(e,t,a){}},[[65,1,2]]]);
//# sourceMappingURL=main.28a75de2.chunk.js.map