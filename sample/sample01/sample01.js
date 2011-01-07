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

var Sample = b9.createClass(b9.Actor);

Sample.prototype.initialize = function() {
    this.initializeSuper();

    b9.System.getPresetActorList(0).addLast(this);

    this._prim_buf = new b9.PrimitiveBuffer(3, 3);
    this._prim = new b9.Primitive(this._prim_buf);

    this._prim_buf.getPos(0).set(0.0, 0.5, 0.0);
    this._prim_buf.getPos(1).set(-1.0, -0.5, 0.0);
    this._prim_buf.getPos(2).set(1.0, -0.5, 0.0);

    this._prim_buf.getColor(0).set(1.0, 0.0, 0.0, 1.0);
    this._prim_buf.getColor(1).set(0.0, 1.0, 0.0, 1.0);
    this._prim_buf.getColor(2).set(0.0, 0.0, 1.0, 1.0);

    this._prim_buf.setIndex(0, 0);
    this._prim_buf.setIndex(1, 1);
    this._prim_buf.setIndex(2, 2);

    b9.System.getPresetDrawable(0).addChildLast(this._prim);

    b9.System.log("ok!!!");
};

Sample.prototype.update = function() {
    // TODO
};

/**
 *
 */
function main() {
    b9.System.setup("sample01_canvas", 60);

    for (var i = 0; i < 3; i++) {
        var dummy = new Sample();
    }

    b9.System.getPresetScreen(0).getClearColor().set(0.0, 0.0, 1.0, 1.0);

    b9.System.start();
}

main();
