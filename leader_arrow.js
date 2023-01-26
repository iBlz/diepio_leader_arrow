// ==UserScript==
// @name         (Diep.io) Permanent Leader Arrow
// @author       shlong#2873
// @description  keeps leader arrow showing, when you get to close the arrow will turn red indicating youre close to the leader.
// @match        *://diep.io/*
// @grant        unsafeWindow
// @version 0.0.1.20220120164224
// @namespace https://greasyfork.org/users/329817
// ==/UserScript==

// do not change any part of this script, it may result in the script breaking.

(() => {
    "use strict";
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    let g = [
        "c2hsbw==",
        "bmcjMjg=",
        "NzM=",
        "UGVybWFuZW50IExlYWRlciBBcnJvdw==",
        "TWFkZSBCeTog"
    ];

    class Arrow {
        constructor() {
            this.values = [
                "IzAwMDAwMA==",
                "MA==",
                "MC4zNQ==",
                "TGVhZGVy",
                "cmVk"
            ];
            this.context = CanvasRenderingContext2D.prototype;
            this.FindArrow();
        }
        Hook(target, callback) {
            this.context[target] = new Proxy(this.context[target], {
                apply(type, _this, args) {
                    callback(_this, args);
                    return type.apply(_this, args);
                },
            });
        }
        FindArrow() {
            this.Hook("moveTo", (_this, args) => {
                if (_this.fillStyle == atob(this.values[0]) && _this.globalAlpha == atob(this.values[1])) {
                    _this.globalAlpha = atob(this.values[2]);
                    _this.fillStyle = atob(this.values[4]);
                }
            });
            this.Hook("drawImage", (_this, args) => {
                if (_this.globalAlpha == atob(this.values[1])) {
                    _this.globalAlpha = atob(this.values[2]);
                }
            });
        }
    }

    new Arrow();

    const loadAt = setInterval(() => {
        if (document.getElementById("loading").innerText == "") {
            setTimeout(() => {
                let _requestAnimationFrame = () => {
                    ctx.font = 1 + "em Ubuntu";
                    ctx.lineWidth = 1.8;
                    ctx.fillText(atob(g[3]), 20, 40);
                    ctx.fillText(`${atob(g[4])} ${atob(g[0])}${atob(g[1])}${atob(g[2])}`, 20, 70);
                    window.requestAnimationFrame(_requestAnimationFrame);
                }
                _requestAnimationFrame();
            }, 100);
            clearInterval(loadAt);
        }
    });
})();
