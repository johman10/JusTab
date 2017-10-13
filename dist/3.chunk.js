webpackJsonp([3,24,26,27],{12:function(e,n,t){"use strict";function i(e){t(234)}Object.defineProperty(n,"__esModule",{value:!0});var a=t(236),o=t.n(a),s=t(237),l=t(8),r=i,c=l(o.a,s.a,!1,r,null,null);n.default=c.exports},13:function(e,n,t){"use strict";function i(e){t(238)}Object.defineProperty(n,"__esModule",{value:!0});var a=t(240),o=t.n(a),s=t(241),l=t(8),r=i,c=l(o.a,s.a,!1,r,null,null);n.default=c.exports},17:function(e,n,t){"use strict";function i(e){t(267)}Object.defineProperty(n,"__esModule",{value:!0});var a=t(269),o=t.n(a),s=t(270),l=t(8),r=i,c=l(o.a,s.a,!1,r,null,null);n.default=c.exports},234:function(e,n,t){var i=t(235);"string"==typeof i&&(i=[[e.i,i,""]]);var a={};a.transform=void 0;t(10)(i,a);i.locals&&(e.exports=i.locals)},235:function(e,n,t){n=e.exports=t(9)(void 0),n.push([e.i,"\n.input {\n  margin: 30px 0 5px;\n  position: relative;\n}\n.input--field {\n    border: 0;\n    border-bottom: 1px solid #757575;\n    display: block;\n    font-size: 14px;\n    padding-bottom: 8px;\n    width: 300px;\n}\n.input--field::-webkit-input-placeholder {\n      opacity: 0;\n}\n.input--field:focus {\n      outline: none;\n}\n.input--field:focus ~ .input--bottom-bar::before,\n      .input--field:focus ~ .input--bottom-bar::after {\n        width: 50%;\n}\n.input--field:focus ~ .input--label {\n        color: #4059a9;\n        font-size: 12px;\n        top: -22px;\n}\n.input--field:focus ~ .input--label,\n    .input--field:not(:placeholder-shown) ~ .input--label {\n      font-size: 12px;\n      top: -22px;\n}\n.input--field:invalid {\n      color: #F44336;\n}\n.input--field:invalid .input--bottom-bar::before,\n      .input--field:invalid .input--bottom-bar::after {\n        background: #F44336;\n        width: 50%;\n}\n.input--field:invalid .input--label {\n        color: #F44336;\n        font-size: 12px;\n        top: -22px;\n}\n.input--label {\n    color: #aaaaaa;\n    font-size: 13px;\n    pointer-events: none;\n    position: absolute;\n    top: 0;\n    transition: .2s ease all;\n}\n.input--bottom-bar {\n    display: block;\n    position: relative;\n    width: 300px;\n}\n.input--bottom-bar::before, .input--bottom-bar::after {\n      background: #4059a9;\n      bottom: 0;\n      content: '';\n      height: 2px;\n      position: absolute;\n      transition: .2s ease all;\n      width: 0;\n}\n.input--bottom-bar::before {\n      left: 50%;\n}\n.input--bottom-bar::after {\n      right: 50%;\n}\n.input--description {\n    color: #4059a9;\n    font-size: 12px;\n}\n.input--description a {\n      color: inherit;\n}\n",""])},236:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={props:{name:String,type:String,label:String,value:[String,Number]},data:function(){return{changeValue:this.value}},methods:{onInput:function(){this.$emit("input",this.name,this.changeValue)},onChange:function(){this.$emit("change",this.name,this.changeValue)}}}},237:function(e,n,t){"use strict";var i=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"input"},["text"===e.type?t("input",{directives:[{name:"model",rawName:"v-model",value:e.changeValue,expression:"changeValue"}],staticClass:"input--field",attrs:{placeholder:".",type:"text",name:e.name,id:e.name},domProps:{value:e.changeValue,value:e.changeValue},on:{input:[function(n){n.target.composing||(e.changeValue=n.target.value)},e.onInput],change:e.onChange}}):"number"===e.type?t("input",{directives:[{name:"model",rawName:"v-model",value:e.changeValue,expression:"changeValue"}],staticClass:"input--field",attrs:{placeholder:".",type:"number",name:e.name,id:e.name},domProps:{value:e.changeValue,value:e.changeValue},on:{input:[function(n){n.target.composing||(e.changeValue=n.target.value)},e.onInput],change:e.onChange}}):"password"===e.type?t("input",{directives:[{name:"model",rawName:"v-model",value:e.changeValue,expression:"changeValue"}],staticClass:"input--field",attrs:{placeholder:".",type:"password",name:e.name,id:e.name},domProps:{value:e.changeValue,value:e.changeValue},on:{input:[function(n){n.target.composing||(e.changeValue=n.target.value)},e.onInput],change:e.onChange}}):e._e(),e._v(" "),t("span",{staticClass:"input--bottom-bar"}),e._v(" "),t("label",{staticClass:"input--label"},[e._v(e._s(e.label))])])},a=[],o={render:i,staticRenderFns:a};n.a=o},238:function(e,n,t){var i=t(239);"string"==typeof i&&(i=[[e.i,i,""]]);var a={};a.transform=void 0;t(10)(i,a);i.locals&&(e.exports=i.locals)},239:function(e,n,t){n=e.exports=t(9)(void 0),n.push([e.i,"\n.checkbox--actual {\n  display: block;\n  height: 0;\n  margin: 0;\n  opacity: 0;\n  width: 0;\n}\n.checkbox--actual:checked + .checkbox--label .checkbox--styled {\n    background-color: #009688;\n    border-color: #009688;\n}\n.checkbox--actual:checked + .checkbox--label .checkbox--styled .checkbox--mark {\n      animation: checkmark-expand 140ms ease-out forwards;\n}\n.checkbox--label {\n  cursor: pointer;\n}\n.checkbox--styled {\n  border: solid 2px #5a5a5a;\n  border-radius: 2px;\n  display: inline-block;\n  height: 18px;\n  margin: 5px;\n  position: relative;\n  transition: background-color 140ms, border-color 140ms;\n  vertical-align: middle;\n  width: 18px;\n}\n.checkbox--mark {\n  border-top: 0;\n  border-left: 0;\n  border-right: solid 2px #fff;\n  border-bottom: solid 2px #fff;\n  box-sizing: initial;\n  height: 0;\n  left: 6px;\n  position: absolute;\n  top: 9px;\n  transform: rotate(45deg);\n  width: 0;\n}\n@keyframes checkmark-expand {\n0% {\n    height: 0;\n    left: 6px;\n    top: 9px;\n    width: 0;\n}\n100% {\n    height: 10px;\n    left: 4px;\n    top: -1px;\n    width: 5px;\n}\n}\n",""])},240:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={props:{name:String,value:[String,Boolean],label:String,checked:Boolean},methods:{onChange:function(){this.$emit("change",this.name,this.value)}}}},241:function(e,n,t){"use strict";var i=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"checkbox"},[t("input",{staticClass:"checkbox--actual",attrs:{type:"checkbox",id:e.name},domProps:{value:e.value,checked:e.checked},on:{change:e.onChange}}),e._v(" "),t("label",{staticClass:"checkbox--label",attrs:{for:e.name}},[e._m(0),e._v("\n    "+e._s(e.label)+"\n  ")])])},a=[function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"checkbox--styled"},[t("div",{staticClass:"checkbox--mark"})])}],o={render:i,staticRenderFns:a};n.a=o},267:function(e,n,t){var i=t(268);"string"==typeof i&&(i=[[e.i,i,""]]);var a={};a.transform=void 0;t(10)(i,a);i.locals&&(e.exports=i.locals)},268:function(e,n,t){n=e.exports=t(9)(void 0),n.push([e.i,"\n.select {\n  margin: 10px 0 0;\n  width: 300px;\n}\n.select__label {\n    color: #aaaaaa;\n    display: block;\n    font-size: 12px;\n}\n.select__bar {\n    display: block;\n    height: 30px;\n    line-height: 30px;\n    position: relative;\n    border-bottom: 1px solid #757575;\n}\n.select__bar:after {\n      border-left: 0.4em solid transparent;\n      border-right: 0.4em solid transparent;\n      border-top: 0.5em solid #737373;\n      content: '';\n      display: block;\n      height: 0px;\n      margin-top: -0.2em;\n      position: absolute;\n      right: 0.5em;\n      top: 50%;\n      width: 0px;\n}\n.select__list {\n    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);\n    background-color: #fff;\n    list-style: none;\n    max-height: 500px;\n    overflow-y: scroll;\n    padding: 8px 0;\n    position: absolute;\n    top: -21px;\n    width: 300px;\n    z-index: 100;\n}\n.select__list-item {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    height: 48px;\n    line-height: 48px;\n    padding: 0 16px;\n}\n.select__list-item:hover, .select__list-item.selected {\n      background-color: rgba(153, 153, 153, 0.2);\n}\n",""])},269:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={props:{name:String,value:String,label:String,options:Array},data:function(){return{changeValue:this.value,active:!1}},watch:{changeValue:function(){this.$emit("change",this.name,this.changeValue)}},methods:{showList:function(){var e=this;this.active=!0,this.$nextTick(function(){e.repositionList(),setTimeout(function(){document.querySelector("body").addEventListener("click",e.hideList)},100)})},repositionList:function(){var e=this.$el.querySelector(".select__bar"),n=this.$el.querySelector(".select__list"),t=this.$el.querySelector(".select__list-item.selected"),i=t.offsetHeight;n.style.top=e.offsetTop-i/2+10+"px",n.scrollHeight>n.offsetHeight&&(n.scrollTop=t.offsetTop-10)},hideList:function(){var e=this;document.querySelector("body").removeEventListener("click",this.hideList),setTimeout(function(){e.active=!1},100)},setValue:function(e){this.changeValue=e,this.active=!1}}}},270:function(e,n,t){"use strict";var i=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"select"},[t("label",{staticClass:"select__label",on:{click:e.showList}},[e._v(e._s(e.label))]),e._v(" "),t("span",{staticClass:"select__bar",on:{click:e.showList}},[e._v("\n    "+e._s(e.changeValue)+"\n  ")]),e._v(" "),t("ul",{directives:[{name:"show",rawName:"v-show",value:e.active,expression:"active"}],staticClass:"select__list"},e._l(e.options,function(n){return t("li",{class:["select__list-item ripple",{selected:n===e.changeValue}],on:{click:function(t){e.setValue(n)}}},[e._v(e._s(n))])}))])},a=[],o={render:i,staticRenderFns:a};n.a=o},29:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=t(300),a=t.n(i),o=t(301),s=t(8),l=s(a.a,o.a,!1,null,null,null);n.default=l.exports},300:function(e,n,t){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var a=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])}return e},o=t(2),s=t(12),l=i(s),r=t(13),c=i(r),u=t(17),p=i(u);n.default={components:{vInput:l.default,vSelect:p.default,vCheckbox:c.default},data:function(){return{sortingOptions:["Hot","New","Rising","Top - Hour","Top - Day","Top - Week","Top - Month","Top - Year","Top - All Time","Controversial - Hour","Controversial - Day","Controversial - Week","Controversial - Months","Controversial - Year","Controversial - All Time"]}},computed:a({},(0,o.mapState)({services:"services",service:function(e){return e.services.find(function(e){return 11===e.id})}})),methods:{onChange:function(e,n){this.saveData(this.service.id,e,n)},onCheckboxChange:function(e,n){this.saveData(this.service.id,e,!this.service.nsfw)}}}},301:function(e,n,t){"use strict";var i=function(){var e=this,n=e.$createElement,t=e._self._c||n;return e.service?t("div",{staticClass:"options-reddit"},[t("v-input",{attrs:{type:"text",value:e.service.subreddit,name:"redditSubreddit",label:"Subreddit"},on:{change:e.onChange}}),e._v(" "),t("v-checkbox",{attrs:{checked:e.service.nsfw,name:"redditNsfw",label:"Show NSFW"},on:{change:e.onCheckboxChange}}),e._v(" "),t("v-select",{attrs:{options:e.sortingOptions,value:e.service.sorting,name:"redditSorting",label:"Sorting"},on:{change:e.onChange}}),e._v(" "),t("v-input",{attrs:{type:"number",value:e.service.panelWidth,name:"redditWidth",label:"Panel width in px"},on:{change:e.onChange}}),e._v(" "),t("v-input",{attrs:{type:"number",value:e.service.refresh,name:"redditRefresh",label:"Refresh rate (in minutes)"},on:{change:e.onChange}})],1):e._e()},a=[],o={render:i,staticRenderFns:a};n.a=o}});