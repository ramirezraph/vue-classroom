(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-417cc408"],{"0fd9":function(t,e,a){"use strict";a("99af"),a("4160"),a("caad"),a("13d5"),a("4ec9"),a("b64b"),a("d3b7"),a("ac1f"),a("2532"),a("3ca3"),a("5319"),a("159b"),a("ddb0");var n=a("ade3"),i=a("5530"),s=(a("4b85"),a("2b0e")),r=a("d9f7"),o=a("80d2"),c=["sm","md","lg","xl"],l=["start","end","center"];function d(t,e){return c.reduce((function(a,n){return a[t+Object(o["H"])(n)]=e(),a}),{})}var u=function(t){return[].concat(l,["baseline","stretch"]).includes(t)},v=d("align",(function(){return{type:String,default:null,validator:u}})),p=function(t){return[].concat(l,["space-between","space-around"]).includes(t)},m=d("justify",(function(){return{type:String,default:null,validator:p}})),f=function(t){return[].concat(l,["space-between","space-around","stretch"]).includes(t)},g=d("alignContent",(function(){return{type:String,default:null,validator:f}})),h={align:Object.keys(v),justify:Object.keys(m),alignContent:Object.keys(g)},b={align:"align",justify:"justify",alignContent:"align-content"};function x(t,e,a){var n=b[t];if(null!=a){if(e){var i=e.replace(t,"");n+="-".concat(i)}return n+="-".concat(a),n.toLowerCase()}}var y=new Map;e["a"]=s["a"].extend({name:"v-row",functional:!0,props:Object(i["a"])(Object(i["a"])(Object(i["a"])({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:u}},v),{},{justify:{type:String,default:null,validator:p}},m),{},{alignContent:{type:String,default:null,validator:f}},g),render:function(t,e){var a=e.props,i=e.data,s=e.children,o="";for(var c in a)o+=String(a[c]);var l=y.get(o);return l||function(){var t,e;for(e in l=[],h)h[e].forEach((function(t){var n=a[t],i=x(e,t,n);i&&l.push(i)}));l.push((t={"no-gutters":a.noGutters,"row--dense":a.dense},Object(n["a"])(t,"align-".concat(a.align),a.align),Object(n["a"])(t,"justify-".concat(a.justify),a.justify),Object(n["a"])(t,"align-content-".concat(a.alignContent),a.alignContent),t)),y.set(o,l)}(),t(a.tag,Object(r["a"])(i,{staticClass:"row",class:l}),s)}})},d76a:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{id:"extended-tables",fluid:"",tag:"section"}},[a("base-v-component",{attrs:{heading:"Simple Tables",link:"componetns/simple-tables"}}),a("base-material-card",{staticClass:"px-5 py-3 mb-5",attrs:{color:"success",icon:"mdi-clipboard-text",inline:"",title:"Simple Table"}},[a("v-simple-table",[a("thead",[a("tr",[a("th",[t._v("#")]),a("th",[t._v("Name")]),a("th",[t._v("Job Position")]),a("th",[t._v("Since")]),a("th",{staticClass:"text-right"},[t._v(" Salary ")]),a("th",{staticClass:"text-right"},[t._v(" Actions ")])])]),a("tbody",[a("tr",[a("td",[t._v("1")]),a("td",[t._v("Andrew Mike")]),a("td",[t._v("Developer")]),a("td",[t._v("2013")]),a("td",{staticClass:"text-right"},[t._v(" € 99,225 ")]),a("td",{staticClass:"text-right"},t._l(t.actions,(function(e,n){return a("v-btn",{key:n,staticClass:"px-2 ml-1",attrs:{color:e.color,"min-width":"0",small:""}},[a("v-icon",{attrs:{small:""},domProps:{textContent:t._s(e.icon)}})],1)})),1)]),a("tr",[a("td",[t._v("2")]),a("td",[t._v("John Doe")]),a("td",[t._v("Designer")]),a("td",[t._v("2012")]),a("td",{staticClass:"text-right"},[t._v(" € 89,241 ")]),a("td",{staticClass:"text-right"},t._l(t.actions,(function(e,n){return a("v-btn",{key:n,staticClass:"px-1 ml-1",attrs:{color:e.color,fab:"","x-small":""}},[a("v-icon",{domProps:{textContent:t._s(e.icon)}})],1)})),1)]),a("tr",[a("td",[t._v("3")]),a("td",[t._v("Alex Mike")]),a("td",[t._v("Designer")]),a("td",[t._v("2010")]),a("td",{staticClass:"text-right"},[t._v(" € 92,144 ")]),a("td",{staticClass:"text-right"},t._l(t.actions,(function(e,n){return a("v-btn",{key:n,staticClass:"ml-1",attrs:{color:e.color,fab:"",icon:"","x-small":""}},[a("v-icon",{attrs:{small:""},domProps:{textContent:t._s(e.icon)}})],1)})),1)]),a("tr",[a("td",[t._v("4")]),a("td",[t._v("Mike Monday")]),a("td",[t._v("Marketing")]),a("td",[t._v("2013")]),a("td",{staticClass:"text-right"},[t._v(" € 49,990 ")]),a("td",{staticClass:"text-right"},t._l(t.actions,(function(e,n){return a("v-btn",{key:n,staticClass:"px-1 ml-1",attrs:{color:e.color,fab:"","x-small":""}},[a("v-icon",{domProps:{textContent:t._s(e.icon)}})],1)})),1)]),a("tr",[a("td",[t._v("5")]),a("td",[t._v("Paul Dickens")]),a("td",[t._v("Communications")]),a("td",[t._v("2015")]),a("td",{staticClass:"text-right"},[t._v(" € 69,201 ")]),a("td",{staticClass:"text-right"},t._l(t.actions,(function(e,n){return a("v-btn",{key:n,staticClass:"px-2 ml-1",attrs:{color:e.color,"min-width":"0",small:""}},[a("v-icon",{attrs:{small:""},domProps:{textContent:t._s(e.icon)}})],1)})),1)])])])],1),a("div",{staticClass:"py-3"}),a("base-material-card",{staticClass:"px-5 py-3",attrs:{color:"success",icon:"mdi-clipboard",inline:"",title:"Checked Table"}},[a("v-data-table",{attrs:{headers:t.headers,items:t.selections,"hide-default-footer":"","show-select":""},scopedSlots:t._u([{key:"footer",fn:function(){return[a("v-card-text",[a("v-row",{attrs:{align:"center",justify:"end"}},[a("strong",{staticClass:"title"},[t._v("Total")]),a("div",{staticClass:"display-1 font-weight-light ml-12"},[t._v(" € 12,999 ")])])],1)]},proxy:!0}])})],1),a("div",{staticClass:"py-3"}),a("base-material-card",{staticClass:"px-5 py-3",attrs:{color:"success",icon:"mdi-vuetify",inline:"",title:"Shopping Cart Table"}},[a("v-data-table",{attrs:{headers:t.productHeaders,items:t.products,"hide-default-footer":""},scopedSlots:t._u([{key:"item",fn:function(e){var n=e.item;return[a("tr",[a("td",[a("v-img",{staticClass:"mx-auto",attrs:{src:n.src,"max-width":"75"}})],1),a("td",[a("div",{staticClass:"purple--text headline",domProps:{textContent:t._s(n.name)}}),a("div",{staticClass:"grey--text subtitle-1 font-weight-light"},[t._v(" by "+t._s(n.brand)+" ")])]),a("td",{domProps:{textContent:t._s(n.color)}}),a("td",{domProps:{textContent:t._s(n.size)}}),a("td",{staticClass:"text-right",domProps:{textContent:t._s(n.price)}}),a("td"),a("td",{staticClass:"text-right",domProps:{textContent:t._s(n.amount)}})])]}},{key:"footer",fn:function(){return[a("v-divider"),a("v-card-text",[a("v-row",{attrs:{align:"center",justify:"end"}},[a("strong",{staticClass:"title"},[t._v("Total")]),a("div",{staticClass:"display-1 font-weight-light ml-12"},[t._v(" € 2,346 ")])])],1),a("v-divider"),a("div",{staticClass:"text-right py-6"},[a("v-btn",{staticClass:"mr-0",attrs:{color:"info",default:"",rounded:""}},[t._v(" Complete Purchase "),a("v-icon",[t._v("mdi-chevron-right")])],1)],1)]},proxy:!0}])})],1)],1)},i=[],s={name:"DashboardExtendedTables",data:function(){return{actions:[{color:"info",icon:"mdi-account"},{color:"success",icon:"mdi-pencil"},{color:"error",icon:"mdi-close"}],headers:[{text:"#",value:"id"},{text:"Product Name",value:"name"},{text:"Type",value:"type"},{align:"right",text:"Qty",value:"qty"},{align:"right",text:"Price",value:"price"},{align:"right",text:"Amount",value:"amount"}],productHeaders:[{sortable:!1,text:"",value:"src"},{text:"Product",value:"name"},{text:"Color",value:"color"},{text:"Size",value:"size"},{align:"right",text:"Price",value:"price"},{text:"Qty",value:"qty"},{align:"right",text:"Amount",value:"amount"}],products:[{src:"https://demos.creative-tim.com/material-dashboard-pro/assets/img/product1.jpg",name:"Spring Jacket",brand:"Dolce & Gabbana",color:"Red",size:"M",price:"€ 549",amount:"€ 549",qty:1},{src:"https://demos.creative-tim.com/material-dashboard-pro/assets/img/product2.jpg",name:"Short Pants",brand:"Pucca",color:"Purple",size:"M",price:"€ 499",amount:"€ 499",qty:2},{src:"https://demos.creative-tim.com/material-dashboard-pro/assets/img/product3.jpg",name:"Pencil Skirt",brand:"Valentino",color:"White",size:"XL",price:"€ 799",amount:"€ 799",qty:1}],selections:[{id:1,name:"Moleskine Agenda",type:"Office",qty:25,price:"€ 49",amount:"€ 1,225"},{id:2,name:"Stabilo Pen",type:"Office",qty:30,price:"€ 10",amount:"€ 300"},{id:3,name:"A4 Paper Pack",type:"Office",qty:30,price:"€ 10.99",amount:"€ 109"},{id:4,name:"Apple iPad",type:"Meeting",qty:10,price:"€ 499",amount:"€ 4,990"},{id:5,name:"Apple iPhone",type:"Communication",qty:10,price:"€ 599",amount:"€ 5,999"}]}}},r=s,o=a("2877"),c=a("6544"),l=a.n(c),d=a("8336"),u=a("99d9"),v=a("a523"),p=a("8fea"),m=a("ce7e"),f=a("132d"),g=a("adda"),h=a("0fd9"),b=a("1f4f"),x=Object(o["a"])(r,n,i,!1,null,null,null);e["default"]=x.exports;l()(x,{VBtn:d["a"],VCardText:u["b"],VContainer:v["a"],VDataTable:p["a"],VDivider:m["a"],VIcon:f["a"],VImg:g["a"],VRow:h["a"],VSimpleTable:b["a"]})}}]);
//# sourceMappingURL=chunk-417cc408.fe91188b.js.map