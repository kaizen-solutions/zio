"use strict";(self.webpackChunkzio_site=self.webpackChunkzio_site||[]).push([[6890],{3905:function(e,t,n){n.d(t,{Zo:function(){return l},kt:function(){return y}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=r.createContext({}),c=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},l=function(e){var t=c(e.components);return r.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,s=e.originalType,p=e.parentName,l=a(e,["components","mdxType","originalType","parentName"]),m=c(n),y=o,v=m["".concat(p,".").concat(y)]||m[y]||u[y]||s;return n?r.createElement(v,i(i({ref:t},l),{},{components:n})):r.createElement(v,i({ref:t},l))}));function y(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var s=n.length,i=new Array(s);i[0]=m;var a={};for(var p in t)hasOwnProperty.call(t,p)&&(a[p]=t[p]);a.originalType=e,a.mdxType="string"==typeof e?e:o,i[1]=a;for(var c=2;c<s;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},6491:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return a},contentTitle:function(){return p},metadata:function(){return c},toc:function(){return l},default:function(){return m}});var r=n(7462),o=n(3366),s=(n(7294),n(3905)),i=["components"],a={id:"system",title:"System"},p=void 0,c={unversionedId:"services/system",id:"version-1.x/services/system",isDocsHomePage:!1,title:"System",description:"System service contains several useful functions related to system environments and properties. Both of system environments and system properties are key/value pairs. They used to pass user-defined information to our application.",source:"@site/versioned_docs/version-1.x/services/system.md",sourceDirName:"services",slug:"/services/system",permalink:"/1.x/services/system",tags:[],version:"1.x",frontMatter:{id:"system",title:"System"},sidebar:"services-sidebar",previous:{title:"Blocking",permalink:"/1.x/services/blocking"}},l=[{value:"System Environment",id:"system-environment",children:[]},{value:"System Property",id:"system-property",children:[]}],u={toc:l};function m(e){var t=e.components,n=(0,o.Z)(e,i);return(0,s.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("p",null,"System service contains several useful functions related to system environments and properties. Both of ",(0,s.kt)("strong",{parentName:"p"},"system environments")," and ",(0,s.kt)("strong",{parentName:"p"},"system properties")," are key/value pairs. They used to pass user-defined information to our application."),(0,s.kt)("p",null,"Environment variables are global operating system level variables available to all applications running on the same machine while the properties are application-level variables provided to our application."),(0,s.kt)("h2",{id:"system-environment"},"System Environment"),(0,s.kt)("p",null,"The ",(0,s.kt)("inlineCode",{parentName:"p"},"env")," function retrieve the value of an environment variable:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-scala"},'import zio.console._\nimport zio.system._\nfor {\n  user <- env("USER")\n  _ <- user match {\n    case Some(value) => putStr(s"The USER env is: $value")\n    case None => putStr("Oops! The USER env is not set")\n  }\n} yield ()\n')),(0,s.kt)("h2",{id:"system-property"},"System Property"),(0,s.kt)("p",null,"Also, the System service has a `property function to retrieve the value of a system property:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-scala"},'for {\n  user <- property("LOG_LEVEL")\n  _ <- user match {\n    case Some(value) => putStr(s"The LOG_LEVEL property is: $value")\n    case None => putStr("Oops! The LOG_LEVEL property is not set")\n  }\n} yield ()\n')))}m.isMDXComponent=!0}}]);