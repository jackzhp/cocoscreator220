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

    // onLoad () {},

    start() {
        console.log("game start is called");
        this._dir = 1;
    },
    returnClicked: function () {
        console.log("return clicked");
        // jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "setOrientationPortrait", "()V");
        // cc.view.setFrameSize(2160, 1080);
        // cc.view.setCanvasSize(2160, 1080);
        // cc.view.setDesignResolutionSize(1680, 720, 3);
        // //the above should be moved to start function in hall.js
        if (false) {
            var load = true;
            if (load) {
                //load again, seems not right.
                var sceneName = "hall";
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
                var t = cc.director.loadScene(sceneName, onSceneLoaded, onSceneUnloaded);
                console.log("return success ?" + t);
            } else if (false) {
                //runScene will replace the current scene. 
                // does loadScene do the same?
            }
        } else {
            //or just run the scene?
            cc.game.restart(); //or just restart js engine, this is what we do.
        }
    },
    turnClicked: function () {
        let frameSize = cc.view.getFrameSize()
        console.log('frameSize: ' + frameSize.width + '   ' + frameSize.height)
        if (frameSize.width > frameSize.height)
            this._dir = 1;
        else
            this._dir = 2;
        if (this._dir == 1) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "setOrientationPortrait", "()V");
            cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT); //this is a must, and should before the following
            if (frameSize.width > frameSize.height) {
                cc.view.setFrameSize(frameSize.height, frameSize.width);
                //canvas size changes automatically.
            }
            var c = this.node.getComponent(cc.Canvas);
            if (c) {
                cc.view.setDesignResolutionSize(c.designResolution.width, c.designResolution.height, cc.ResolutionPolicy.FIXED_WIDTH);
            }
        }
        else {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "setOrientationLandscape", "()V");
            cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE); //if this is not called, then the click position are not right.
            if (frameSize.height > frameSize.width) {
                cc.view.setFrameSize(frameSize.height, frameSize.width)
                //canvas size changes automatically.
            }
            var c = this.node.getComponent(cc.Canvas);
            if (c) {
                cc.view.setDesignResolutionSize(c.designResolution.width, c.designResolution.height, cc.ResolutionPolicy.FIXED_HEIGHT);
            }
        }
    }

    // update (dt) {},
});
