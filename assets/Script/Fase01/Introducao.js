// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

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
        btnOk: {
            default: null,
            type: cc.Button
        },
        btnCancel: {
            default: null,
            type: cc.Button
        },
        cursorSprite: {
            default: null,
            type: cc.Sprite
          },
          cursorAtlas: {
            default: null,
            type: cc.SpriteAtlas
          },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        this.node.on('mousemove', function(event)
        {
          this.cursorSprite.node.x = event.getLocation().x;
          this.cursorSprite.node.y = event.getLocation().y;
    
        }, this);
    
        this.node.on('touchstart', function(event)
        {
          this.cursorSprite.spriteFrame = this.cursorAtlas.getSpriteFrame('hand02');
        }, this);
    
        this.node.on('touchend', function(event)
        {
          this.cursorSprite.spriteFrame = this.cursorAtlas.getSpriteFrame('hand01');      
        }, this);
    
    },
    start() {

        cc.director.preloadScene("Scene/Menu");
        cc.director.preloadScene("Scene/Fase01");

        this.btnCancel.node.on('touchstart', function (event) {
            this.backToMenu();
        }, this);

        this.btnOk.node.on('touchstart', function (event) {
            this.startGame();
        }, this);

        
        this.getComponent("SoundManager").playSoundMusicaIntroducao();

    },

    backToMenu: function () {
        cc.director.loadScene("Scene/Menu");
    },

    startGame: function () {
        cc.director.loadScene("Scene/Fase01");
    },

    // update (dt) {},
});