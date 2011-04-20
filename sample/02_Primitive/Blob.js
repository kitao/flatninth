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

var Blob = b9.createClass(b9.Task);

Blob.prototype.initialize = function(x, y, color) {
    var i;
    var col = new b9.Color();

    this.initializeSuper();

    this._blobPrimBuf = new b9.PrimitiveBuffer(Blob._BLOB_VERT_COUNT);
    this._blobPrim = new b9.Primitive(b9.PrimitiveMode.TRIANGLE_FAN, this._blobPrimBuf);

    this._phase = 0;

    b9.Preset.rootNode3D.addChildLast(this._blobPrim);

    this._blobPrim.setBlendModeWithFlags(b9.BlendMode.HALF);

    this._setBlobPos(this._phase);

    this._blobPrimBuf.setColor(0, col.set(color.r, color.g, color.b, 128));

    for (i = 1; i < Blob._BLOB_VERT_COUNT; i++) {
        this._blobPrimBuf.setColor(i, col.set(color.r, color.g, color.b, 96));
    }

    this._blobPrim.local.trans.set(x, y, 0.0);

    b9.Preset.taskList.addLast(this);
};

Blob.prototype.update = function() {
    /*
    if (ckKeyMgr::isPressed(ckKeyMgr::KEY_P))
    {
        if (m_blob_prim.getPrimMode() == ckPrim::MODE_TRIANGLE_FAN)
        {
            m_blob_prim.setPrimMode(ckPrim::MODE_LINE_STRIP);
        }
        else
        {
            m_blob_prim.setPrimMode(ckPrim::MODE_TRIANGLE_FAN);
        }
    }
    */

    this._phase += 4;
    this._setBlobPos(this._phase);
};

Blob.prototype._setBlobPos = function(phase) {
    this._blobPrimBuf.setPos(0, b9.Vector3D.ZERO);

    var i;
    var rad;
    var dir = new b9.Vector3D();

    for (i = 1; i < Blob._BLOB_VERT_COUNT; i++) {
        dir.set(
                b9.Math.cos_int((i - 1) * Blob._ONE_VERT_DIG),
                b9.Math.sin_int((i - 1) * Blob._ONE_VERT_DIG),
                0.0);

        rad = b9.Math.sin_int((i - 1) * 60) * b9.Math.sin_int(this._phase) * 8.0 + 64.0;

        this._blobPrimBuf.setPos(i, dir.mul(rad));
    }

    this._blobPrimBuf.updateAll();
};

Blob._CIRCLE_VERT_COUNT = 36;
Blob._BLOB_VERT_COUNT = Blob._CIRCLE_VERT_COUNT + 2;
Blob._ONE_VERT_DIG = 360 / Blob._CIRCLE_VERT_COUNT;

function newBlob(x, y, color) {
    return new Blob(x, y, color);
}
