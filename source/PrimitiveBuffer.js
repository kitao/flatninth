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
 * @class
 */
b9.PrimitiveBuffer = b9.createClass();

/**
 *
 * @param {Number} vert_count
 */
b9.PrimitiveBuffer.prototype.initialize = function(vert_count) {
    var gl = b9.System.getGLContext();

    this.initializeSuper(parent);

    this._vert_count = vert_count;
    this._pos_array = new Float32Array(max_vertex_count * 3);
    //this._color = new Float32Array(max_vertex_count * 4);
    //this._texcoord = new Float32Array(max_vertex_count * 2);

    this._pos_buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this._pos_buf);
    gl.bufferData(gl.ARRAY_BUFFER, this._pos, gl.STATIC_DRAW);
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
b9.PrimitiveBuffer.prototype.getMaxVertexCount = function() {
};
