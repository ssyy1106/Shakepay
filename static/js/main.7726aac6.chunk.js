(this.webpackJsonpui=this.webpackJsonpui||[]).push([[0],{31:function(t,e,a){},33:function(t,e,a){},58:function(t,e,a){"use strict";a.r(e);var r=a(1),n=a.n(r),o=a(21),c=a.n(o),s=(a(31),function(t){t&&t instanceof Function&&a.e(3).then(a.bind(null,63)).then((function(e){var a=e.getCLS,r=e.getFID,n=e.getFCP,o=e.getLCP,c=e.getTTFB;a(t),r(t),n(t),o(t),c(t)}))}),i=a(3),u=a.n(i),h=a(7),l=a(22),d=a(23),f=a(26),b=a(25),g=(a(33),a(24)),m=a(9),p=a.n(m),C=a(2),y=function(t){Object(f.a)(a,t);var e=Object(b.a)(a);function a(t){var r;return Object(l.a)(this,a),(r=e.call(this,t)).getRate=Object(h.a)(u.a.mark((function t(){var e;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return"https://api.shakepay.co/rates",t.next=3,p.a.get("https://api.shakepay.co/rates").then((function(t){return t.data})).catch((function(t){return console.log(t),{BTC_CAD:76260.2,ETH_CAD:5374.03}}));case 3:return e=t.sent,r.setState({rateBtc:e.BTC_CAD}),r.setState({rateEth:e.ETH_CAD}),t.abrupt("return",e);case 7:case"end":return t.stop()}}),t)}))),r.getUiData=Object(h.a)(u.a.mark((function t(){var e,a;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return"https://shakepay.github.io/programming-exercise/web/transaction_history.json",t.next=3,p.a.get("https://shakepay.github.io/programming-exercise/web/transaction_history.json").then((function(t){return t.data.reverse()})).catch((function(t){return console.log(t)}));case 3:return e=t.sent,a=e.reduce((function(t,e){var a=0,n=0,o=0;switch(t.length>0&&(a=t[t.length-1].amountBTC,n=t[t.length-1].amountETH,o=t[t.length-1].amountCAD),e.type){case"conversion":switch(e.from.currency){case"BTC":a-=e.from.amount;break;case"ETH":n-=e.from.amount;break;case"CAD":o-=e.from.amount;break;default:console.log(e.from.currency)}switch(e.to.currency){case"BTC":a+=e.to.amount;break;case"ETH":n+=e.to.amount;break;case"CAD":o+=e.to.amount;break;default:console.log(e.to.currency)}break;default:if("credit"===e.direction)switch(e.currency){case"BTC":a+=e.amount;break;case"ETH":n+=e.amount;break;case"CAD":o+=e.amount;break;default:console.log(e.direction)}else switch(e.currency){case"BTC":a-=e.amount;break;case"ETH":n-=e.amount;break;case"CAD":o-=e.amount;break;default:console.log(e.direction)}}return t.push({createdAt:e.createdAt,amount:a*r.state.rateBtc+n*r.state.rateEth+o,amountBTC:a,amountETH:n,amountCAD:o}),t}),[]),r.setState({data:a}),t.abrupt("return",a);case 7:case"end":return t.stop()}}),t)}))),r.extractDataToList=function(t){var e=r.state.data,a=[];for(var n in e){var o=e[n][t];if("createdAt"===t){var c=o.toString().slice(0,4)+"-"+o.toString().slice(5,7)+"-"+o.toString().slice(8,10);a.unshift(c)}else a.unshift(e[n][t])}return a.reverse()},r.componentDidMount=function(){document.title="Covid USA"},r.state={data:{},graph:[],rateBtc:0,rateEth:0},r.getRate(),r.getUiData(),r}return Object(d.a)(a,[{key:"render",value:function(){var t={tooltip:{trigger:"net worth",axisPointer:{label:{backgroundColor:"#6a7985"}}},legend:{data:["NetWorth"]},dataZoom:[{type:"slider",height:8,bottom:20,borderColor:"transparent",backgroundColor:"#e2e2e2",handleSize:20,handleStyle:{shadowBlur:6,shadowOffsetX:1,shadowOffsetY:2,shadowColor:"#aaa"}},{type:"inside"}],grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:{type:"category",data:this.extractDataToList("createdAt"),show:!0,axisLabel:{color:"gray",fontWeight:"bold",rotate:90,interval:6}},yAxis:{type:"value",axisLabel:{color:"gray",inside:!0}},series:[{name:"Infected",type:"bar",smooth:!0,data:this.extractDataToList("amount"),symbol:"none",color:"#0000ff"}]};return Object(C.jsxs)("div",{className:"App",children:[Object(C.jsx)("h2",{children:"Net worth(Canadien dollar)"}),Object(C.jsx)(g.a,{style:{height:"600px",width:"100%"},option:t})]})}}]),a}(r.Component);c.a.render(Object(C.jsx)(n.a.StrictMode,{children:Object(C.jsx)(y,{})}),document.getElementById("root")),s()}},[[58,1,2]]]);
//# sourceMappingURL=main.7726aac6.chunk.js.map