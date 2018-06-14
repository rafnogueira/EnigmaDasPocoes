

cc.Class({
    extends: cc.Component,
    properties: {
        menuMusic: {
            default: null,
            url: cc.AudioClip
        },
        introductionMusic: {
            default: null,
            url: cc.AudioClip
        },
        fase01: {
            default: null,
            url: cc.AudioClip
        },
        acertouPocao: {
            default: null,
            url: cc.AudioClip
        },
        errouPocao: {
            default: null,
            url: cc.AudioClip
        },
        clickBotao: 
        {
            default: null,
            url: cc.AudioClip
        },
        soltouPocao: 
        {
            default: null,
            url: cc.AudioClip
        },
        arrastandoPocao: 
        {
            default: null,
            url: cc.AudioClip
        },

        janelaPontos: {
            default: null,
            url: cc.AudioClip
        },
        audioEnabled: true,
    },

    onLoad: function () {

        //this.current = cc.audioEngine.play(this.audio, false, 1);


    },

    /*update(dt) {
    },*/


    playSoundClickBotao: function () {

        //this.test.play();
        if(this.audioEnabled)
        {
        cc.audioEngine.playEffect(this.clickBotao, false);
        }
        //this.test.play();
        //  cc.audioEngine.play(coletandoPocao, true);
    },

    
    playSoundColetandoPocao: function () {

        //this.test.play();
        if(this.audioEnabled)
        {
        cc.audioEngine.playEffect(this.arrastandoPocao, false);
        }
        //this.test.play();
        //  cc.audioEngine.play(coletandoPocao, true);
    },

    playSoundSoltandoPocao: function () {
        //this.test.play();
        if(this.audioEnabled)
        {
        cc.audioEngine.playEffect(this.soltouPocao, false);
        }
        //this.test.play();
        //  cc.audioEngine.play(coletandoPocao, true);
    },

    playSoundJanelaPontos : function() 
    {
        //this.test.play();

        if(this.audioEnabled)
        {
            
            cc.audioEngine.playEffect(this.janelaPontos, false);

        }
        //this.test.play();
        //  cc.audioEngine.play(coletandoPocao, true);
    },

    playSoundAcertouPocao: function () {
        //this.test.play();

        if(this.audioEnabled)
        {
        cc.audioEngine.playEffect(this.acertouPocao, false);
        }
        //this.test.play();
        //  cc.audioEngine.play(coletandoPocao, true);
    },

    playSoundErrouPocao: function () {
        //this.test.play();

        if(this.audioEnabled)
        {
            cc.audioEngine.playEffect(this.errouPocao, false);
        }

        //this.test.play();
        //  cc.audioEngine.play(coletandoPocao, true);
    },

    
    playSoundMusicaMenu: function () {
        //this.test.play();
        cc.audioEngine.stopAll();
        cc.audioEngine.playEffect(this.menuMusic, true);

        //this.test.play();
        //  cc.audioEngine.play(coletandoPocao, true);
    },

    playSoundMusicaIntroducao: function () {
        //this.test.play();
        cc.audioEngine.stopAll();
        cc.audioEngine.playEffect(this.introductionMusic, true);

        //this.test.play();
        //  cc.audioEngine.play(coletandoPocao, true);
    },


    playSoundMusicaFase01: function () {
        //this.test.play();

    
        cc.audioEngine.stopAll();

        cc.audioEngine.playEffect(this.fase01, true);
        
        //this.test.play();
        //  cc.audioEngine.play(coletandoPocao, true);
    },

    stopAllSounds: function () {
        //this.test.play();
        
        if(this.audioEnabled == true)
        {
            this.audioEnabled = false;
            cc.audioEngine.pauseAll();
        }else{
            this.audioEnabled = true;
            cc.audioEngine.resumeAll();
        }
        //this.test.play();
        //  cc.audioEngine.play(coletandoPocao, true);
    },


});