(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6815efa1","chunk-446ee19c"],{"0160":function(t,e,i){},"0fd9":function(t,e,i){"use strict";i("99af"),i("4160"),i("caad"),i("13d5"),i("4ec9"),i("b64b"),i("d3b7"),i("ac1f"),i("2532"),i("3ca3"),i("5319"),i("159b"),i("ddb0");var n=i("ade3"),a=i("5530"),s=(i("4b85"),i("2b0e")),o=i("d9f7"),r=i("80d2"),l=["sm","md","lg","xl"],c=["start","end","center"];function u(t,e){return l.reduce((function(i,n){return i[t+Object(r["H"])(n)]=e(),i}),{})}var d=function(t){return[].concat(c,["baseline","stretch"]).includes(t)},h=u("align",(function(){return{type:String,default:null,validator:d}})),m=function(t){return[].concat(c,["space-between","space-around"]).includes(t)},p=u("justify",(function(){return{type:String,default:null,validator:m}})),v=function(t){return[].concat(c,["space-between","space-around","stretch"]).includes(t)},f=u("alignContent",(function(){return{type:String,default:null,validator:v}})),g={align:Object.keys(h),justify:Object.keys(p),alignContent:Object.keys(f)},b={align:"align",justify:"justify",alignContent:"align-content"};function y(t,e,i){var n=b[t];if(null!=i){if(e){var a=e.replace(t,"");n+="-".concat(a)}return n+="-".concat(i),n.toLowerCase()}}var w=new Map;e["a"]=s["a"].extend({name:"v-row",functional:!0,props:Object(a["a"])(Object(a["a"])(Object(a["a"])({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:d}},h),{},{justify:{type:String,default:null,validator:m}},p),{},{alignContent:{type:String,default:null,validator:v}},f),render:function(t,e){var i=e.props,a=e.data,s=e.children,r="";for(var l in i)r+=String(i[l]);var c=w.get(r);return c||function(){var t,e;for(e in c=[],g)g[e].forEach((function(t){var n=i[t],a=y(e,t,n);a&&c.push(a)}));c.push((t={"no-gutters":i.noGutters,"row--dense":i.dense},Object(n["a"])(t,"align-".concat(i.align),i.align),Object(n["a"])(t,"justify-".concat(i.justify),i.justify),Object(n["a"])(t,"align-content-".concat(i.alignContent),i.alignContent),t)),w.set(r,c)}(),t(i.tag,Object(o["a"])(a,{staticClass:"row",class:c}),s)}})},"1e06":function(t,e,i){"use strict";i("c96a");var n=i("5530"),a=i("58df"),s=i("9d26"),o=i("7560"),r=i("a9ad"),l=Object(a["a"])(r["a"],o["a"]);e["a"]=l.extend().extend({name:"v-timeline-item",inject:["timeline"],props:{color:{type:String,default:"primary"},fillDot:Boolean,hideDot:Boolean,icon:String,iconColor:String,large:Boolean,left:Boolean,right:Boolean,small:Boolean},computed:{hasIcon:function(){return!!this.icon||!!this.$slots.icon}},methods:{genBody:function(){return this.$createElement("div",{staticClass:"v-timeline-item__body"},this.$slots.default)},genIcon:function(){return this.$slots.icon?this.$slots.icon:this.$createElement(s["a"],{props:{color:this.iconColor,dark:!this.theme.isDark,small:this.small}},this.icon)},genInnerDot:function(){var t=this.setBackgroundColor(this.color);return this.$createElement("div",Object(n["a"])({staticClass:"v-timeline-item__inner-dot"},t),[this.hasIcon&&this.genIcon()])},genDot:function(){return this.$createElement("div",{staticClass:"v-timeline-item__dot",class:{"v-timeline-item__dot--small":this.small,"v-timeline-item__dot--large":this.large}},[this.genInnerDot()])},genDivider:function(){var t=[];return this.hideDot||t.push(this.genDot()),this.$createElement("div",{staticClass:"v-timeline-item__divider"},t)},genOpposite:function(){return this.$createElement("div",{staticClass:"v-timeline-item__opposite"},this.$slots.opposite)}},render:function(t){var e=[this.genBody(),this.genDivider()];return this.$slots.opposite&&e.push(this.genOpposite()),t("div",{staticClass:"v-timeline-item",class:Object(n["a"])({"v-timeline-item--fill-dot":this.fillDot,"v-timeline-item--before":this.timeline.reverse?this.right:this.left,"v-timeline-item--after":this.timeline.reverse?this.left:this.right},this.themeClasses)},e)}})},5311:function(t,e,i){"use strict";var n=i("5607"),a=i("2b0e");e["a"]=a["a"].extend({name:"rippleable",directives:{ripple:n["a"]},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(t.staticClass="v-input--selection-controls__ripple",t.directives=t.directives||[],t.directives.push({name:"ripple",value:{center:!0}}),this.$createElement("div",t)):null}}})},"5d13":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-card",{staticClass:"v-card--plan mx-auto pt-3 pb-4 px-2 text-center",attrs:{color:t.plan.best?void 0:"transparent elevation-0",light:t.plan.best,"max-width":"100%"}},[i("div",{staticClass:"body-2 text-uppercase grey--text",domProps:{textContent:t._s(t.plan.heading)}}),i("v-avatar",{attrs:{size:"130"}},[i("v-icon",{attrs:{color:t.plan.best?"success":void 0,size:"64"},domProps:{textContent:t._s(t.plan.icon)}})],1),i("h2",{staticClass:"display-2 font-weight-light",domProps:{textContent:t._s(t.plan.title)}}),i("v-card-text",{staticClass:"body-1 font-weight-light pa-1",domProps:{textContent:t._s(t.plan.text)}}),i("pages-btn",{attrs:{color:t.plan.best?"success":"white"}},[t._v(" "+t._s(t.$t("plan"))+" ")])],1)},a=[],s=(i("d3b7"),{name:"PagesPlanCard",components:{PagesBtn:function(){return i.e("chunk-2d0c4bbd").then(i.bind(null,"3ba9"))}},props:{plan:{type:Object,default:function(){return{best:!1,heading:void 0,icon:void 0,title:void 0,text:void 0}}}}}),o=s,r=(i("bddb"),i("2877")),l=i("6544"),c=i.n(l),u=i("8212"),d=i("b0af"),h=i("99d9"),m=i("132d"),p=Object(r["a"])(o,n,a,!1,null,null,null);e["default"]=p.exports;c()(p,{VAvatar:u["a"],VCard:d["a"],VCardText:h["b"],VIcon:m["a"]})},"6ca7":function(t,e,i){},"7cd4":function(t,e,i){},8414:function(t,e,i){"use strict";var n=i("5530"),a=(i("0160"),i("58df")),s=i("7560");e["a"]=Object(a["a"])(s["a"]).extend({name:"v-timeline",provide:function(){return{timeline:this}},props:{alignTop:Boolean,dense:Boolean,reverse:Boolean},computed:{classes:function(){return Object(n["a"])({"v-timeline--align-top":this.alignTop,"v-timeline--dense":this.dense,"v-timeline--reverse":this.reverse},this.themeClasses)}},render:function(t){return t("div",{staticClass:"v-timeline",class:this.classes},this.$slots.default)}})},ab4f:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-container",{attrs:{id:"widgets",fluid:"",tag:"section"}},[i("base-v-component",{attrs:{heading:"Cards",link:"components/cards"}}),i("v-row",[i("v-col",{attrs:{cols:"12",md:"6"}},[i("base-material-card",{staticClass:"px-5 py-3",attrs:{color:"warning",inline:""},scopedSlots:t._u([{key:"heading",fn:function(){return[i("div",{staticClass:"display-2 font-weight-light"},[t._v(" Employees Stats ")]),i("div",{staticClass:"subtitle-1 font-weight-light"},[t._v(" New employees on 15th September, 2016 ")])]},proxy:!0}])},[i("v-card-text",[i("v-data-table",{attrs:{headers:t.headers,items:t.items}})],1)],1)],1),i("v-col",{attrs:{cols:"12",md:"6"}},[i("base-material-card",{staticClass:"px-5 py-3",scopedSlots:t._u([{key:"heading",fn:function(){return[i("v-tabs",{attrs:{"background-color":"transparent","slider-color":"white"},model:{value:t.tabs,callback:function(e){t.tabs=e},expression:"tabs"}},[i("span",{staticClass:"subheading font-weight-light mx-3",staticStyle:{"align-self":"center"}},[t._v("Tasks:")]),i("v-tab",{staticClass:"mr-3"},[i("v-icon",{staticClass:"mr-2"},[t._v(" mdi-bug ")]),t._v(" Bugs ")],1),i("v-tab",{staticClass:"mr-3"},[i("v-icon",{staticClass:"mr-2"},[t._v(" mdi-code-tags ")]),t._v(" Website ")],1),i("v-tab",[i("v-icon",{staticClass:"mr-2"},[t._v(" mdi-cloud ")]),t._v(" Server ")],1)],1)]},proxy:!0}])},[i("v-tabs-items",{staticClass:"transparent",model:{value:t.tabs,callback:function(e){t.tabs=e},expression:"tabs"}},t._l(3,(function(e){return i("v-tab-item",{key:e},[i("v-card-text",[t._l(t.tasks[t.tabs],(function(e,n){return[i("v-row",{key:n,attrs:{align:"center"}},[i("v-col",{attrs:{cols:"1"}},[i("v-list-item-action",[i("v-checkbox",{attrs:{color:"secondary"},model:{value:e.value,callback:function(i){t.$set(e,"value",i)},expression:"task.value"}})],1)],1),i("v-col",{attrs:{cols:"9"}},[i("div",{staticClass:"font-weight-light",domProps:{textContent:t._s(e.text)}})]),i("v-col",{staticClass:"text-right",attrs:{cols:"2"}},[i("v-icon",{staticClass:"mx-1"},[t._v(" mdi-pencil ")]),i("v-icon",{staticClass:"mx-1",attrs:{color:"error"}},[t._v(" mdi-close ")])],1)],1)]}))],2)],1)})),1)],1)],1),i("v-col",{attrs:{cols:"12",md:"6"}},[i("v-row",[t._l(t.plans,(function(t,e){return[i("v-col",{key:e,attrs:{cols:"12",md:"6"}},[i("pages-plan-card",{attrs:{plan:t}})],1)]})),i("v-col",{attrs:{cols:"12"}},[i("base-material-testimony",{attrs:{blurb:"Your products, all the kits that I have downloaded from your site and worked with are sooo cool! I love the color mixtures, cards... everything. Keep up the great work!",author:"Alec Thompson",handle:"@alecthompson"}})],1)],2)],1),i("v-col",{attrs:{cols:"12",md:"6"}},[i("v-timeline",{attrs:{"align-top":"",dense:""}},t._l(t.timelines,(function(e,n){return i("v-timeline-item",{key:n,attrs:{color:e.color,icon:e.icon,"fill-dot":"",large:""}},[i("v-card",{staticClass:"pa-6"},[i("v-chip",{staticClass:"overline mb-3",attrs:{color:e.color,small:""}},[t._v(" "+t._s(e.chip)+" ")]),i("p",{staticClass:"subtitle-1",domProps:{textContent:t._s(e.text)}}),i("div",{staticClass:"text-uppercase body-2",domProps:{textContent:t._s(e.subtext)}}),e.action?[i("v-divider",{staticClass:"mb-3"}),i("v-menu",{attrs:{bottom:"","offset-y":"",origin:"top left",right:"",transition:"scale-transition"},scopedSlots:t._u([{key:"activator",fn:function(n){var a=n.attrs,s=n.on;return[i("v-btn",t._g(t._b({attrs:{color:e.action,default:"",rounded:""}},"v-btn",a,!1),s),[i("v-icon",{attrs:{left:""},domProps:{textContent:t._s(e.actionIcon)}}),i("v-icon",{attrs:{right:""}},[t._v(" "+t._s(t.menu?"mdi-menu-up":"mdi-menu-down")+" ")])],1)]}}],null,!0),model:{value:t.menu,callback:function(e){t.menu=e},expression:"menu"}},[i("v-sheet",[i("v-list",t._l(e.actions,(function(e){return i("v-list-item",{key:e,attrs:{link:""}},[i("v-list-item-title",{domProps:{textContent:t._s(e)}})],1)})),1)],1)],1)]:t._e()],2)],1)})),1)],1)],1)],1)},a=[],s=i("5d13"),o={name:"Widgets",components:{PagesPlanCard:s["default"]},data:function(){return{headers:[{sortable:!1,text:"ID",value:"id"},{sortable:!1,text:"Name",value:"name"},{sortable:!1,text:"Salary",value:"salary",align:"right"},{sortable:!1,text:"Country",value:"country",align:"right"},{sortable:!1,text:"City",value:"city",align:"right"}],items:[{id:1,name:"Dakota Rice",country:"Niger",city:"Oud-Tunrhout",salary:"$35,738"},{id:2,name:"Minerva Hooper",country:"Curaçao",city:"Sinaai-Waas",salary:"$23,738"},{id:3,name:"Sage Rodriguez",country:"Netherlands",city:"Overland Park",salary:"$56,142"},{id:4,name:"Philip Chanley",country:"Korea, South",city:"Gloucester",salary:"$38,735"},{id:5,name:"Doris Greene",country:"Malawi",city:"Feldkirchen in Kārnten",salary:"$63,542"}],menu:!1,plans:[{best:!0,heading:"Small Company",icon:"mdi-home",title:"29$",text:"This is good if your company size is between 2 and 10 Persons."},{heading:"Freelancer",icon:"mdi-sofa",title:"Free",text:"This is good if your company size is between 2 and 10 Persons."}],tabs:0,tasks:{0:[{text:'Sign contract for "What are conference organizers afraid of?"',value:!0},{text:"Lines From Great Russian Literature? Or E-mails From My Boss?",value:!1},{text:"Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",value:!1},{text:"Create 4 Invisible User Experiences you Never Knew About",value:!0}],1:[{text:"Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",value:!0},{text:'Sign contract for "What are conference organizers afraid of?"',value:!1}],2:[{text:"Lines From Great Russian Literature? Or E-mails From My Boss?",value:!1},{text:"Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",value:!0},{text:'Sign contract for "What are conference organizers afraid of?"',value:!0}]},timelines:[{chip:"Some title",color:"error",icon:"mdi-briefcase",text:"Wifey made the best Father's Day meal ever. So thankful so happy so blessed. Thank you for making my family We just had fun with the “future” theme !!! It was a fun night all together ... The always rude Kanye Show at 2am Sold Out Famous viewing @ Figueroa and 12th in downtown.",subtext:"11 hours ago via twitter"},{chip:"Another one",color:"success",icon:"mdi-puzzle",text:"Thank God for the support of my wife and real friends. I also wanted to point out that it’s the first album to go number 1 off of streaming!!! I love you Ellen and also my number one design rule of anything I do from shoes to music to homes is that Kim has to like it...."},{chip:"Another title",color:"info",icon:"mdi-fingerprint",text:"Called I Miss the Old Kanye That’s all it was Kanye And I love you like Kanye loves Kanye Famous viewing @ Figueroa and 12th in downtown LA 11:10PM. What if Kanye made a song about Kanye Royère doesn't make a Polar bear bed but the Polar bear couch is my favorite piece of furniture we own It wasn’t any Kanyes Set on his goals Kanye",action:"info",actionIcon:"mdi-wrench",actions:["Action","Another Action","Something else here"]}]}}},r=o,l=i("2877"),c=i("6544"),u=i.n(c),d=i("8336"),h=i("b0af"),m=i("99d9"),p=i("ac7c"),v=i("cc20"),f=i("62ad"),g=i("a523"),b=i("8fea"),y=i("ce7e"),w=i("132d"),C=i("8860"),x=i("da13"),k=i("1800"),_=i("5d23"),I=i("e449"),S=i("0fd9"),T=i("8dd9"),V=i("71a3"),O=i("c671"),j=i("fe57"),$=i("aac8"),A=i("8414"),B=i("1e06"),D=Object(l["a"])(r,n,a,!1,null,null,null);e["default"]=D.exports;u()(D,{VBtn:d["a"],VCard:h["a"],VCardText:m["b"],VCheckbox:p["a"],VChip:v["a"],VCol:f["a"],VContainer:g["a"],VDataTable:b["a"],VDivider:y["a"],VIcon:w["a"],VList:C["a"],VListItem:x["a"],VListItemAction:k["a"],VListItemTitle:_["c"],VMenu:I["a"],VRow:S["a"],VSheet:T["a"],VTab:V["a"],VTabItem:O["a"],VTabs:j["a"],VTabsItems:$["a"],VTimeline:A["a"],VTimelineItem:B["a"]})},ac7c:function(t,e,i){"use strict";i("d3b7"),i("25f0");var n=i("5530"),a=(i("6ca7"),i("ec29"),i("9d26")),s=i("c37a"),o=i("fe09");e["a"]=o["a"].extend({name:"v-checkbox",props:{indeterminate:Boolean,indeterminateIcon:{type:String,default:"$checkboxIndeterminate"},offIcon:{type:String,default:"$checkboxOff"},onIcon:{type:String,default:"$checkboxOn"}},data:function(){return{inputIndeterminate:this.indeterminate}},computed:{classes:function(){return Object(n["a"])(Object(n["a"])({},s["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls":!0,"v-input--checkbox":!0,"v-input--indeterminate":this.inputIndeterminate})},computedIcon:function(){return this.inputIndeterminate?this.indeterminateIcon:this.isActive?this.onIcon:this.offIcon},validationState:function(){if(!this.isDisabled||this.inputIndeterminate)return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0}},watch:{indeterminate:function(t){var e=this;this.$nextTick((function(){return e.inputIndeterminate=t}))},inputIndeterminate:function(t){this.$emit("update:indeterminate",t)},isActive:function(){this.indeterminate&&(this.inputIndeterminate=!1)}},methods:{genCheckbox:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(a["a"],this.setTextColor(this.validationState,{props:{dense:this.dense,dark:this.dark,light:this.light}}),this.computedIcon),this.genInput("checkbox",Object(n["a"])(Object(n["a"])({},this.attrs$),{},{"aria-checked":this.inputIndeterminate?"mixed":this.isActive.toString()})),this.genRipple(this.setTextColor(this.rippleState))])},genDefaultSlot:function(){return[this.genCheckbox(),this.genLabel()]}}})},bddb:function(t,e,i){"use strict";i("7cd4")},c671:function(t,e,i){"use strict";var n=i("9d65"),a=i("4e82"),s=i("c3f0"),o=i("80d2"),r=i("58df"),l=Object(r["a"])(n["a"],Object(a["a"])("windowGroup","v-window-item","v-window")),c=l.extend().extend().extend({name:"v-window-item",directives:{Touch:s["a"]},props:{disabled:Boolean,reverseTransition:{type:[Boolean,String],default:void 0},transition:{type:[Boolean,String],default:void 0},value:{required:!1}},data:function(){return{isActive:!1,inTransition:!1}},computed:{classes:function(){return this.groupClasses},computedTransition:function(){return this.windowGroup.internalReverse?"undefined"!==typeof this.reverseTransition?this.reverseTransition||"":this.windowGroup.computedTransition:"undefined"!==typeof this.transition?this.transition||"":this.windowGroup.computedTransition}},methods:{genDefaultSlot:function(){return this.$slots.default},genWindowItem:function(){return this.$createElement("div",{staticClass:"v-window-item",class:this.classes,directives:[{name:"show",value:this.isActive}],on:this.$listeners},this.genDefaultSlot())},onAfterTransition:function(){this.inTransition&&(this.inTransition=!1,this.windowGroup.transitionCount>0&&(this.windowGroup.transitionCount--,0===this.windowGroup.transitionCount&&(this.windowGroup.transitionHeight=void 0)))},onBeforeTransition:function(){this.inTransition||(this.inTransition=!0,0===this.windowGroup.transitionCount&&(this.windowGroup.transitionHeight=Object(o["g"])(this.windowGroup.$el.clientHeight)),this.windowGroup.transitionCount++)},onTransitionCancelled:function(){this.onAfterTransition()},onEnter:function(t){var e=this;this.inTransition&&this.$nextTick((function(){e.computedTransition&&e.inTransition&&(e.windowGroup.transitionHeight=Object(o["g"])(t.clientHeight))}))}},render:function(t){var e=this;return t("transition",{props:{name:this.computedTransition},on:{beforeEnter:this.onBeforeTransition,afterEnter:this.onAfterTransition,enterCancelled:this.onTransitionCancelled,beforeLeave:this.onBeforeTransition,afterLeave:this.onAfterTransition,leaveCancelled:this.onTransitionCancelled,enter:this.onEnter}},this.showLazyContent((function(){return[e.genWindowItem()]})))}});e["a"]=c.extend({name:"v-tab-item",props:{id:String},methods:{genWindowItem:function(){var t=c.options.methods.genWindowItem.call(this);return t.data.domProps=t.data.domProps||{},t.data.domProps.id=this.id||this.value,t}}})},ec29:function(t,e,i){},fe09:function(t,e,i){"use strict";i.d(e,"b",(function(){return r}));i("4de4"),i("45fc"),i("d3b7"),i("25f0");var n=i("c37a"),a=i("5311"),s=i("8547"),o=i("58df");function r(t){t.preventDefault()}e["a"]=Object(o["a"])(n["a"],a["a"],s["a"]).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor:function(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var t=this,e=this.value,i=this.internalValue;return this.isMultiple?!!Array.isArray(i)&&i.some((function(i){return t.valueComparator(i,e)})):void 0===this.trueValue||void 0===this.falseValue?e?this.valueComparator(e,i):Boolean(i):this.valueComparator(i,this.trueValue)},isDirty:function(){return this.isActive},rippleState:function(){return this.isDisabled||this.validationState?this.validationState:void 0}},watch:{inputValue:function(t){this.lazyValue=t,this.hasColor=t}},methods:{genLabel:function(){var t=n["a"].options.methods.genLabel.call(this);return t?(t.data.on={click:r},t):t},genInput:function(t,e){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:t,type:t},e),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown,click:r},ref:"input"})},onBlur:function(){this.isFocused=!1},onClick:function(t){this.onChange(),this.$emit("click",t)},onChange:function(){var t=this;if(this.isInteractive){var e=this.value,i=this.internalValue;if(this.isMultiple){Array.isArray(i)||(i=[]);var n=i.length;i=i.filter((function(i){return!t.valueComparator(i,e)})),i.length===n&&i.push(e)}else i=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(i,this.trueValue)?this.falseValue:this.trueValue:e?this.valueComparator(i,e)?null:e:!i;this.validate(!0,i),this.internalValue=i,this.hasColor=i}},onFocus:function(){this.isFocused=!0},onKeydown:function(t){}}})}}]);
//# sourceMappingURL=chunk-6815efa1.e89bec05.js.map