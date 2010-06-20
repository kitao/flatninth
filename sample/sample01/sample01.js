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

Sample.prototype.initialize = function(parent) {
    this.initializeSuper(parent);

    this._sprt = new b9.Sprite(1, b9.System.defaultView(b9.System.ORDER_NORMAL).elementRoot());

    this._sprt.setRectPos(0, new b9.Vector(50.0, 50.0));
    this._sprt.setRectSize(0, 30.0, 20.0);

    this._sprt.setRectColor(0, new b9.Color(1.0, 0.0, 0.0));
};

Sample.prototype.onUpdate = function() {
    var pos = new b9.Vector();

    this._sprt.getRectPos(0, pos);
    pos.x += 1.0;
    this._sprt.setRectPos(0, pos);
};

Sample.create= function() {
    return new Sample(b9.System.defaultTask(b9.System.ORDER_NORMAL));
};

/**
 *
 */
function main() {
    b9.System.setup("sample01_canvas", 60);

    Sample.create();

    b9.System.start();
}

main();
