(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3521816a"],{"0fd9":function(t,n,a){"use strict";a("99af"),a("4160"),a("caad"),a("13d5"),a("4ec9"),a("b64b"),a("d3b7"),a("ac1f"),a("2532"),a("3ca3"),a("5319"),a("159b"),a("ddb0");var e=a("ade3"),r=a("5530"),o=(a("4b85"),a("2b0e")),i=a("d9f7"),c=a("80d2"),s=["sm","md","lg","xl"],d=["start","end","center"];function u(t,n){return s.reduce((function(a,e){return a[t+Object(c["u"])(e)]=n(),a}),{})}var l=function(t){return[].concat(d,["baseline","stretch"]).includes(t)},f=u("align",(function(){return{type:String,default:null,validator:l}})),p=function(t){return[].concat(d,["space-between","space-around"]).includes(t)},b=u("justify",(function(){return{type:String,default:null,validator:p}})),g=function(t){return[].concat(d,["space-between","space-around","stretch"]).includes(t)},v=u("alignContent",(function(){return{type:String,default:null,validator:g}})),h={align:Object.keys(f),justify:Object.keys(b),alignContent:Object.keys(v)},y={align:"align",justify:"justify",alignContent:"align-content"};function j(t,n,a){var e=y[t];if(null!=a){if(n){var r=n.replace(t,"");e+="-".concat(r)}return e+="-".concat(a),e.toLowerCase()}}var m=new Map;n["a"]=o["a"].extend({name:"v-row",functional:!0,props:Object(r["a"])(Object(r["a"])(Object(r["a"])({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:l}},f),{},{justify:{type:String,default:null,validator:p}},b),{},{alignContent:{type:String,default:null,validator:g}},v),render:function(t,n){var a=n.props,r=n.data,o=n.children,c="";for(var s in a)c+=String(a[s]);var d=m.get(c);return d||function(){var t,n;for(n in d=[],h)h[n].forEach((function(t){var e=a[t],r=j(n,t,e);r&&d.push(r)}));d.push((t={"no-gutters":a.noGutters,"row--dense":a.dense},Object(e["a"])(t,"align-".concat(a.align),a.align),Object(e["a"])(t,"justify-".concat(a.justify),a.justify),Object(e["a"])(t,"align-content-".concat(a.alignContent),a.alignContent),t)),m.set(c,d)}(),t(a.tag,Object(i["a"])(r,{staticClass:"row",class:d}),o)}})},"448c":function(t,n,a){"use strict";a.r(n);var e=function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("v-container",{attrs:{id:"dashboard",fluid:"",tag:"section"}},[a("v-row",[a("v-col",{attrs:{cols:"12",md:"6"}},[a("dashboard-stats"),a("dashboard-todos")],1),a("v-col",{attrs:{cols:"12",md:"6"}},[a("dashboard-announcements")],1)],1)],1)},r=[],o=a("2b0e"),i=o["a"].extend({name:"Dashboard",components:{DashboardStats:()=>a.e("chunk-2d207778").then(a.bind(null,"a13e")),DashboardTodos:()=>a.e("chunk-2d0d3342").then(a.bind(null,"5c86")),DashboardAnnouncements:()=>a.e("chunk-65f79863").then(a.bind(null,"971c"))},data(){return{}}}),c=i,s=a("2877"),d=a("6544"),u=a.n(d),l=a("62ad"),f=a("a523"),p=a("0fd9"),b=Object(s["a"])(c,e,r,!1,null,null,null);n["default"]=b.exports;u()(b,{VCol:l["a"],VContainer:f["a"],VRow:p["a"]})},a523:function(t,n,a){"use strict";a("99af"),a("4de4"),a("b64b"),a("2ca0"),a("20f6"),a("4b85"),a("a15b"),a("498a");var e=a("2b0e");function r(t){return e["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(n,a){var e=a.props,r=a.data,o=a.children;r.staticClass="".concat(t," ").concat(r.staticClass||"").trim();var i=r.attrs;if(i){r.attrs={};var c=Object.keys(i).filter((function(t){if("slot"===t)return!1;var n=i[t];return t.startsWith("data-")?(r.attrs[t]=n,!1):n||"string"===typeof n}));c.length&&(r.staticClass+=" ".concat(c.join(" ")))}return e.id&&(r.domProps=r.domProps||{},r.domProps.id=e.id),n(e.tag,r,o)}})}var o=a("d9f7");n["a"]=r("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,n){var a,e=n.props,r=n.data,i=n.children,c=r.attrs;return c&&(r.attrs={},a=Object.keys(c).filter((function(t){if("slot"===t)return!1;var n=c[t];return t.startsWith("data-")?(r.attrs[t]=n,!1):n||"string"===typeof n}))),e.id&&(r.domProps=r.domProps||{},r.domProps.id=e.id),t(e.tag,Object(o["a"])(r,{staticClass:"container",class:Array({"container--fluid":e.fluid}).concat(a||[])}),i)}})}}]);
//# sourceMappingURL=chunk-3521816a.26156cab.js.map