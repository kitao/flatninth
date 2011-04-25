/*
 * Copyright (c) 2009-2011 Takashi Kitao
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

Sample.prototype.initialize = function(x, y, z) {
    var vec = new b9.Vector3D();
    var color = new b9.Color();

    this.initializeSuper();

    b9.Preset.taskList.addLast(this);

    //this._primBuf = new b9.PrimitiveBuffer(3, 3);
    this._primBuf = new b9.PrimitiveBuffer(3);
    this._prim = new b9.Primitive(b9.PrimitiveMode.TRIANGLES, this._primBuf);

    this._primBuf.setPos(0, vec.set(0.0, 50.0, 0.0));
    this._primBuf.setPos(1, vec.set(-200.0, -100.0, 0.0));
    this._primBuf.setPos(2, vec.set(200.0, -100.0, 0.0));

    this._primBuf.setColor(0, color.set(255, 0, 0));
    this._primBuf.setColor(1, color.set(0, 255, 0));
    this._primBuf.setColor(2, color.set(0, 0, 255));

    this._primBuf.setTexCoord(0, 0.0, 0.0);
    this._primBuf.setTexCoord(1, 1.0, 0.0);
    this._primBuf.setTexCoord(2, 0.0, 1.0);

/*    this._primBuf.elementData[0] = 0;
    this._primBuf.elementData[1] = 1;
    this._primBuf.elementData[2] = 2;
*/
    this._prim.textures[0] = b9.Resource.get("test_texture");
    this._prim.local.trans.set(x, y, z);

    b9.Preset.rootNode3D.addChildLast(this._prim);

    this._prim2 = new b9.Primitive(b9.PrimitiveMode.TRIANGLES, this._primBuf);
    this._prim2.local.translate(100.0, 50.0, 10.0);
    this._prim.addChildLast(this._prim2);

    this._prim2.setBlendModeWithFlags(b9.BlendMode.HALF);
    this._prim2.color.a = 128;

    b9.Debug.trace("ok!!!");
};

Sample.prototype.update = function() {
    // TODO
    this._prim.local.rotateX_int(1).rotateY_int(2);
    this._prim2.local.rotateZ_int(1);
};

/**
 *
 */
function main() {
    var i;

    b9.System.setup("sample01_canvas", 60);

    b9.Resource.add("test_texture", new b9.Texture("../assets/test_texture_64x64.png"));

    for (i = 0; i < 3; i++) {
        var dummy = new Sample(i * 10 - 200, i * 4, i * -50);
    }

    b9.Preset.screen3D.clearColor.set(0, 0, 128);

    b9.System.start();
}

main();
