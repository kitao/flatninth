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

    b9.Preset.getActorList(0).addLast(this);

    this._prim_buf = new b9.PrimitiveBuffer(3, 3);
    this._prim = new b9.Primitive(this._prim_buf);

    this._prim_buf.getPos(0).set(0.0, 0.5, 0.0);
    this._prim_buf.getPos(1).set(-1.0, -0.5, 0.0);
    this._prim_buf.getPos(2).set(1.0, -0.5, 0.0);

    this._prim_buf.getColor(0).set(255, 0, 0);
    this._prim_buf.getColor(1).set(0, 255, 0);
    this._prim_buf.getColor(2).set(0, 0, 255);

    this._prim_buf.setIndex(0, 0);
    this._prim_buf.setIndex(1, 1);
    this._prim_buf.setIndex(2, 2);

    this._prim_buf.setTexCoord(0, 0.0, 0.0);
    this._prim_buf.setTexCoord(1, 1.0, 0.0);
    this._prim_buf.setTexCoord(2, 0.0, 1.0);

    this._prim.setTexture(0, b9.Resource.get("test_texture"));

    b9.Preset.getRootDrawable(0).addChildLast(this._prim);

    b9.Debug.trace("ok!!!");
};

Sample.prototype.update = function() {
    // TODO
};

/**
 *
 */
function main() {
    b9.System.setup("sample01_canvas", 60);

    b9.Resource.add("test_texture", new b9.Texture("../asset/test_texture_64x64.png"));

    for (var i = 0; i < 3; i++) {
        var dummy = new Sample();
    }

    b9.Preset.getScreen(0).getClearColor().set(0, 0, 255);

    b9.System.start();
}

main();
