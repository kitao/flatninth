/*
 * Copyright (c) 2009-2010 Takashi Kitao
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var Sample = b9.createClass(b9.Task);

Sample.prototype.initialize = function(view, x, y) {
    this.initializeSuper(b9.System.defaultTaskNormal());

    this._sprt = new b9.Sprite(1, view.elementRoot());

    this._sprt.rectPos(0).set(x, y);
    this._sprt.rectSize(0).set(30.0, 20.0);
    this._sprt.rectColor(0).set(1.0, 1.0, 0.0);
    this._sprt.setImage("flatninth_font.png");

    this._speed = new b9.Vector2D();
    this._speed.x = b9.Math.randomInt(-4, 4);
    this._speed.y = b9.Math.randomInt(-2, 2);
};

Sample.prototype.onUpdate = function() {
    this._sprt.rectPos(0).add(this._speed);
    this._speed.y += 0.1;

    if (this._sprt.rectPos(0).y > 480 - this._sprt.rectSize(0).y) {
        //this._sprt.rectPos(0).y = 460 - this._sprt.rectSize(0).y;
        this._speed.y = -this._speed.y * 0.98;
    }

    if (this._sprt.rectPos(0).x < 0 || this._sprt.rectPos(0).x > 640 - this._sprt.rectSize(0).x) {
        this._speed.x = -this._speed.x;
    }
};

/**
 *
 */
function main() {
    b9.System.setup(60, "sample01_canvas", "../asset");
    b9.Asset.loadImage("flatninth_font.png");

    var view = new b9.View(b9.System.defaultViewNormal());
    view.setViewFlag(b9.View.FLAG_CLEAR, true);
    view.pos().set(100, 100);
    view.size().set(200, 150);
    view.scale().set(2, 0.5);
    view.clearColor().set(1, 0, 0);

    for (var i = 0; i < 100; i++) {
        var dummy = new Sample((i % 5 === 0) ? view : b9.System.defaultViewNormal(), i * 2, i * 2);
    }

    b9.System.start();
}

main();
