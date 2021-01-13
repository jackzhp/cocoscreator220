// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        console.log("hall onLoad is called");
        var frameSize = cc.view.getFrameSize();
        if (frameSize) {
            console.log("frameSize:" + frameSize.width + "," + frameSize.height);
        } else {
            console.log("frameSize not defined.");
        }
    },

    start: function () {
        console.log("hall start is called");
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "setOrientationPortrait", "()V");
        // cc.view.setFrameSize(2160, 1080);
        // cc.view.setCanvasSize(2160, 1080);
        // cc.view.setDesignResolutionSize(1680, 720, 3);
        var frameSize = cc.view.getFrameSize();
        if (frameSize) {
            console.log("frameSize:" + frameSize.width + "," + frameSize.height);
            if (frameSize.width > frameSize.height) {
                cc.view.setFrameSize(frameSize.height, frameSize.width);
            }
        } else {
            console.log("frameSize not defined.");
        }
        var node = this.node;
        if (node) {
            var c = node.getComponent(cc.Canvas);
            if (c) {
                console.log("fitHeight:" + c.fitHeight);
                cc.view.setDesignResolutionSize(c.designResolution.width, c.designResolution.height, c.fitHeight ? cc.ResolutionPolicy.FIXED_HEIGHT : cc.ResolutionPolicy.FIXED_WIDTH);
            }
        }
    },
    onClicked: function () {
        // console.log("clicked");
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "setOrientationLandscape", "()V");
        cc.view.setFrameSize(2160, 1080);
        cc.view.setCanvasSize(2160, 1080);
        cc.view.setDesignResolutionSize(1680, 720, 3);
        //the above should be moved to start in game.js.
        //I put here since at that time, I don't have game.js
        var sceneName = "game";
        var onSceneLoaded = function (a, b) { //, c, d are undefined.
            //a is null. b is the object for the scene.
            //b circular object
            // console.log("on scene loaded a:" + a + " b:", JSON.stringify(b)); // + " c:" + c + " d:" + d
            // console.log("properties of b");
            // for (var p in b) {
            //     console.log(p + ":" + b[p]);
            // }
            console.log("launched:" + b.name + " a:" + a);
        }
        var onSceneUnloaded = function (a, b, c, d) {
            console.log("unloaded:" + a + " b:" + b + " c:" + c + " d:" + d);
        }
        //runScene will replace the current scene. 
        // does loadScene do the same?
        if (true) {
            var t = cc.director.loadScene(sceneName, onSceneLoaded, onSceneUnloaded);
            console.log("success ?" + t);
        } else {
            var onBeforeLoadScene = function (a, b, c) {
                console.log("before launch:" + a + " b:" + b + " c:" + c + " d:" + d);
            }
            //should pass down scene, not the sceneName
            cc.director.runScene(sceneName, onBeforeLoadScene, onSceneLoaded);
        }
    },
    // update (dt) {},
});
