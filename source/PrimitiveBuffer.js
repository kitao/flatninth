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

/**
 *
 *
 * @class
 *
 * @param {Number} vert_count
 */
b9.PrimitiveBuffer = b9.createClass();

/**
 * @ignore
 */
b9.PrimitiveBuffer.prototype.initialize = function(vert_count) {
    var gl = b9.System.getGLContext();

    this.initializeSuper();

    this._vert_count = vert_count;
    this._vert_array = new Float32Array(vert_count * 3);
    this._vert_glbuf = gl.createBuffer();
};

/**
 *
 */
b9.PrimitiveBuffer.prototype.finalize = function() {
    this.finalizeSuper();
};

/**
 *
 * @return {Number}
 */
b9.PrimitiveBuffer.prototype.getVertexCount = function() {
    return this._vert_count;
};

/**
 *
 */
b9.PrimitiveBuffer.prototype.getVertexPos = function(index, vec) {
    var offset = index * 3;

    vec.set(this._vert_array[offset], this._vert_array[offset + 1], this._vert_array[offset + 2]);
};

/**
 *
 * @param {Number} index
 * @param {b9.Vector3D|Number} vec_or_x
 * @param {Number} [y]
 * @param {Number} [z]
 */
b9.PrimitiveBuffer.prototype.setVertexPos = function(index, vec_or_x, y, z) {
    var offset = index * 3;

    if (arguments.length === 2) {
        this._vert_array[offset] = vec_or_x.x;
        this._vert_array[offset + 1] = vec_or_x.y;
        this._vert_array[offset + 2] = vec_or_x.z;
    } else {
        this._vert_array[offset] = vec_or_x;
        this._vert_array[offset + 1] = y;
        this._vert_array[offset + 2] = z;
    }
};

/**
 *
 * @param {Number} [index]
 */
b9.PrimitiveBuffer.prototype.updateVertex = function(index) {
    var gl = b9.System.getGLContext();

    gl.bindBuffer(gl.ARRAY_BUFFER, this._vert_glbuf);

    if (index) {
        // TODO
        //gl.bufferSubData(gl.ARRAY_BUFFER, this._vert_array, gl.STATIC_DRAW); // or gl.DYNAMIC_DRAW
    } else {
        gl.bufferData(gl.ARRAY_BUFFER, this._vert_array, gl.STATIC_DRAW); // or gl.DYNAMIC_DRAW
    }
};
