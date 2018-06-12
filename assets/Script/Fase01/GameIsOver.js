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
        pontos: 0,
        questoes: 0,
        lblPontos: {
            default: null,
            type: cc.Label
        },
        lblDesc: {
            default: null,
            type: cc.Label
        },
        startIcon01: {
            default: null,
            type: cc.Node
        },
        startIcon02: {
            default: null,
            type: cc.Node
        },
        startIcon03: {
            default: null,
            type: cc.Node
        },
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() {

    },

    start() {

    },

    update(dt) {
        
        this.lblPontos.string = this.pontos;

        switch (this.questoes) {
            case 0:
                this.startIcon01.active = false;
                this.startIcon02.active = false;
                this.startIcon03.active = false;
                this.lblDesc.string = "Você não acertou nenhuma questão, tente novamente! Você consegue acertar mais que isso.";
                break;
            case 1:
                this.startIcon01.active = true;
                this.startIcon02.active = false;
                this.startIcon03.active = false;
                this.lblDesc.string = "Você conseguiu acertar 1 questão, está legal! Mas você pode acertar bem mais que isso!";
                break;
            case 2:
                this.startIcon01.active = true;
                this.startIcon02.active = true;
                this.startIcon03.active = false;
                this.lblDesc.string = "Você acertou 2 questões, muito bom!";

                break;
            case 3:
                this.startIcon01.active = true;
                this.startIcon02.active = true;
                this.startIcon03.active = false;
                this.lblDesc.string = "Você acertou 3 questões, está muito bom.";

                break;
            case 4:
                this.startIcon01.active = true;
                this.startIcon02.active = true;
                this.startIcon03.active = true;
                this.lblDesc.string = " Você acertou todas as questões! Parabéns. Continue jogando até tornar-se mestre com a soma de frações!";

                break;
        }

    },
});