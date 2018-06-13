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

        sobreWinFrame : 
        {
            default : null,
            type: cc.Node
        },
        btnSobreWinFrameOK: 
        {
            default: null,
            type: cc.Button
        },
        instrucoesWinFrame : 
        {
            default : null,
            type: cc.Node
        },

        btnInstrucoesWinFrameOk: 
        {
            default: null,
            type: cc.Button
        },

        btnNovoJogo: {
            default: null,
            type: cc.Button
        },
        btnInstrucoes: {
            default: null,
            type: cc.Button
        },
        
        btnSobre: {
            default: null,
            type: cc.Button
        },

        btnSair: {
            default: null,
            type: cc.Button
        },
        btnFacebook : 
        {
            default: null,
            type: cc.Button
        },
        btnTwitter: 
        {
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
    onLoad() {

        // var gameResources = [
        //     "music_background01"
        // ];
        cc.director.preloadScene("Scene/Introducao");

        // this.node.on('touchend', function () {
        //       cc.director.loadScene("Scene/Instrucoes");
        // });

        this.btnInstrucoesWinFrameOk.node.on('touchstart',  function()
        {
            this.getComponent("SoundManager").playSoundClickBotao();   
        }, this);
        

        this.btnInstrucoesWinFrameOk.node.on('touchend',  function()
        {
            this.instrucoesWinFrame.active = false;
        }, this);
        
        this.btnSobreWinFrameOK.node.on('touchstart',  function()
        {
            this.getComponent("SoundManager").playSoundClickBotao();   
        }, this);
        

        this.btnSobreWinFrameOK.node.on('touchend',  function()
        {
            this.sobreWinFrame.active = false;
        }, this);
        
        //------------------------------------------------------------
        this.btnNovoJogo.node.on('touchend',  function()
        {
            this.iniciarJogo();

        }, this);

        this.btnInstrucoes.node.on('touchend',  function()
        {
            this.mostrarInstrucoes();
        }, this);
        

        this.btnSobre.node.on('touchend',  function()
        {
            this.mostrarSobre();
        }, this);

        this.btnSair.node.on('touchend',  function()
        {

        }, this);

        this.btnFacebook.node.on('touchend',  function()
        {
            cc.sys.openURL("https://www.facebook.com/");
        }, this);

        this.btnTwitter.node.on('touchend',  function()
        {
            cc.sys.openURL("https://twitter.com/");
        }, this);

        // Touchstart sounds
        this.btnNovoJogo.node.on('touchstart',  function()
        {
            this.getComponent("SoundManager").playSoundClickBotao();
            
        }, this);

        this.btnInstrucoes.node.on('touchstart',  function()
        {
            this.getComponent("SoundManager").playSoundClickBotao();
            
        }, this);
        

        this.btnSobre.node.on('touchstart',  function()
        {
            this.getComponent("SoundManager").playSoundClickBotao();
            
        }, this);

        this.btnSair.node.on('touchstart',  function()
        {
            this.getComponent("SoundManager").playSoundClickBotao();

        }, this);

        this.btnFacebook.node.on('touchstart',  function()
        {
            this.getComponent("SoundManager").playSoundClickBotao();

        }, this);

        this.btnTwitter.node.on('touchstart',  function()
        {
            this.getComponent("SoundManager").playSoundClickBotao();

        }, this);


        
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
    


        this.getComponent("SoundManager").playSoundMusicaMenu();


    },

    start() {
        // var audio_Engine =  cc.audioEngine;
    },
    

    iniciarJogo : function()
    {
        cc.director.loadScene("Scene/Introducao");
    },

    mostrarInstrucoes : function()
    {
        cc.log("tentando mostrar janela");
        this.instrucoesWinFrame.active = true;
        this.instrucoesWinFrame.setPosition(0,-100);

    },

    mostrarSobre : function()
    {
        this.sobreWinFrame.active = true;
        this.sobreWinFrame.setPosition(0,-100);
    },

    Sair : function()
    {

    },

    abrirFacebook : function()
    {

    },

    abrirTwitter : function()
    {

    },

 /*
    código para tocar músicas
    perties: {
        // audioSource: {
        //     type: cc.AudioSource,
        //     default: null
        // },

        
    // // LIFE-CYCLE CALLBACKS:
    // onLoad () {

    //     var gameResources = [
    //         "music_background01"
    //     ];

    // },

    // start () {

    //     var audio_Engine =  cc.audioEngine;


    // },

    // play: function () {
    //     this.audioSource.play();
    // },
    // pause: function () {
    //     this.audioSource.pause();
    // },

*/

    // update (dt) {},
});