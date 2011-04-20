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

var Triangle = b9.createClass(b9.Task);

Triangle.prototype.initialize = function() {
    var vec = new b9.Vector3D();
    var color = new b9.Color();

    this.initializeSuper();

    /*
     * setup _triPrim1
     */
    this._triPrimBuf1 = new b9.PrimitiveBuffer(3);

    this._triPrimBuf1.setPos(0, vec.set(0.0, 100.0, 0.0));
    this._triPrimBuf1.setPos(1, vec.set(-110.0, -100.0, 0.0));
    this._triPrimBuf1.setPos(2, vec.set(110.0, -100.0, 0.0));

    this._triPrimBuf1.setColor(0, color.set(255, 0, 0));
    this._triPrimBuf1.setColor(1, color.set(0, 255, 0));
    this._triPrimBuf1.setColor(2, color.set(0, 0, 255));

    this._triPrim1 = new b9.Primitive(b9.PrimitiveMode.TRIANGLES, this._triPrimBuf1);
    this._triPrim1.local.trans.set(-150.0, 0.0, 0.0);

    b9.Preset.rootNode2D.addChildLast(this._triPrim1);

    b9.Preset.taskList.addLast(this);

    /*
     * setup _triPrim2
     */
    this._triPrimBuf2 = new b9.PrimitiveBuffer(6);

    this._triPrimBuf2.setPos(0, vec.set(0.0, 100.0, 0.0));
    this._triPrimBuf2.setPos(1, vec.set(-110.0, -100.0, 0.0));
    this._triPrimBuf2.setPos(2, vec.set(110.0, -100.0, 0.0));

    this._triPrimBuf2.setPos(3, vec.set(0.0, 100.0, 0.0));
    this._triPrimBuf2.setPos(4, vec.set(110.0, -100.0, 0.0));
    this._triPrimBuf2.setPos(5, vec.set(-110.0, -100.0, 0.0));

    this._triPrimBuf2.setTexCoord(0, 0.25, 0.0);
    this._triPrimBuf2.setTexCoord(1, 0.035, 0.75);
    this._triPrimBuf2.setTexCoord(2, 0.465, 0.75);

    this._triPrimBuf2.setTexCoord(3, 0.75, 0.0);
    this._triPrimBuf2.setTexCoord(4, 0.535, 0.75);
    this._triPrimBuf2.setTexCoord(5, 0.965, 0.75);

    this._triPrim2 = new b9.Primitive(b9.PrimitiveMode.TRIANGLES, this._triPrimBuf2);
    this._triPrim2.textures[0] = b9.Resource.get("coin");
    this._triPrim2.local.trans.set(150.0, 0.0, 0.0);

    b9.Preset.rootNode2D.addChildLast(this._triPrim2);
/*

    m_tri_prim2.setDrawFlag(ckDraw::FLAG_BACKFACE_CULLING, true);


*/
};

Triangle.prototype.update = function() {
    /*
    if (ckKeyMgr::isPressed(ckKeyMgr::KEY_Q))
    {
        ckEndCatcake();
    }
    */

    //ckDbgMgr::drawBox(ckMat::UNIT, ckVec(400.0f, 400.0f, 400.0f), ckCol::ZERO, ckCol(128, 128, 128), ckDrawMgr::DEFAULT_3D_SCREEN_ID);

    b9.Preset.screen3D.camera.rotateZ_float(-0.1);

    this._triPrim1.local.rotateY_int(2);
    this._triPrim2.local.rotateY_int(2);
};

function newTriangle() {
    return new Triangle();
}
