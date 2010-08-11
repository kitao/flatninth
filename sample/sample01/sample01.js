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

Sample.prototype.initialize = function(x, y) {
    this.initializeSuper(b9.System.defaultTaskNormal());

    this._sprt = new b9.Sprite(1, b9.System.defaultViewNormal().elementRoot());

    this._sprt.rectPos(0).set(x, y);
    this._sprt.rectSize(0).set(30.0, 20.0);
    this._sprt.rectColor(0).set(1.0, 1.0, 0.0);
    this._sprt.setImage("flatninth_font.png");
};

Sample.prototype.onUpdate = function() {
    this._sprt.rectPos(0).x += 1.0;
};

Sample.create = function(x, y) {
    return new Sample(x, y);
};

/**
 *
 */
function main() {
    b9.System.setup(60, "sample01_canvas", "../asset");
    b9.Asset.loadImage("flatninth_font.png");

    for (var i = 0; i < 200; i++) {
        Sample.create(i * 2, i * 2);
    }

    b9.System.start();
}

main();
