define(["sensor/util"],function(t){var e=function(e){this._hasDeviceMotion="ondevicemotion"in window,this._configs={threshold:10,timeInterval:500},this._prevAcceleration={x:null,y:null,z:null},t.isFunction(e)?this.setCallback(e):t.extend(this._configs,e||{},!0)};return e.prototype.setCallback=function(t){return this._configs.callback=t,this},e.prototype.start=function(){return this._lastTime=new Date,this._hasDeviceMotion?(window.addEventListener("devicemotion",this,!1),this):!1},e.prototype.stop=function(){return this._hasDeviceMotion&&window.removeEventListener("devicemotion",this,!1),this._prevAcceleration.x=null,this._prevAcceleration.y=null,this._prevAcceleration.z=null,this},e.prototype.devicemotion=function(e){var i=e.accelerationIncludingGravity,n=new Date,o=n.getTime()-this._lastTime.getTime(),s=0,c=0,r=0;if(null===this._prevAcceleration.x&&null===this._prevAcceleration.y&&null===this._prevAcceleration.z)return this._prevAcceleration.x=i.x,this._prevAcceleration.y=i.y,void(this._prevAcceleration.z=i.z);s=Math.abs(this._prevAcceleration.x-i.x),c=Math.abs(this._prevAcceleration.y-i.y),r=Math.abs(this._prevAcceleration.z-i.z);var l=s>this._configs.threshold||c>this._configs.threshold||r>this._configs.threshold;if(l&&o>this._configs.timeInterval){if(this._lastTime=new Date,!t.isFunction(this._configs.callback))throw new TypeError("callback is not set or not a function!");this._configs.callback({x:i.x,y:i.y,z:i.z}),this._prevAcceleration.x=i.x,this._prevAcceleration.y=i.y,this._prevAcceleration.z=i.z}},e.prototype.handleEvent=function(e){return t.isFunction(this[e.type])?this[e.type](e):void 0},e});