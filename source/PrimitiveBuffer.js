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
 * @param {Number} vert_count The number of vertices.
 * @param {Number} index_count The number of indices.
 */
b9.PrimitiveBuffer = b9.createClass();

/**
 * @ignore
 */
b9.PrimitiveBuffer.prototype.initialize = function(vert_count, index_count) {
    var i;
    var gl = b9.System.getGLContext();

    this._vert_count = vert_count;
    this._vert_array = new Float32Array(vert_count * 3);
    this._vert_glbuf = gl.createBuffer();

    this._index_count = index_count;
    this._index_array = new Uint16Array(index_count);
    this._index_glbuf = gl.createBuffer();

    this._vert_pos = new Array(vert_count);
    for (i = 0; i < vert_count; i++) {
        this._vert_pos[i] = new b9.Vector3D(this._vert_array, i * 3);
    }

    this._is_uploaded = false;
};

/**
 *
 */
b9.PrimitiveBuffer.prototype.finalize = function() {
    var gl = b9.System.getGLContext();

    gl.deleteBuffer(this._vert_glbuf);
    gl.deleteBuffer(this._index_glbuf);
};

/**
 * Returns the number of vertices.
 * @return {Number} The number of vertices.
 */
b9.PrimitiveBuffer.prototype.getVertexCount = function() {
    return this._vert_count;
};

/**
 * Returns the number of indices.
 * @return {Number} The number of indices.
 */
b9.PrimitiveBuffer.prototype.getIndexCount = function() {
    return this._index_count;
};

/**
 * Returns the position of the specified vertex.
 * @param {Number} vert_no A vertex number.
 */
b9.PrimitiveBuffer.prototype.getVertexPos = function(vert_no) {
    return this._vert_pos[vert_no];
};

/**
 * Returns the U texture coordinate of the specified vertex.
 * @param {Number} vert_no A vertex number.
 * @return {Number} The U texture coordinate.
 */
b9.PrimitiveBuffer.prototype.getVertexTexCoordU = function(vert_no) {
    // TODO
};

/**
 * Returns the V texture coordinate of the specified vertex.
 * @param {Number} vert_no A vertex number.
 * @return {Number} The V texture coordinate.
 */
b9.PrimitiveBuffer.prototype.getVertexTexCoordU = function(vert_no) {
    // TODO
};

/**
 * Sets the UV texture coordinates of the specified vertex.
 * @param {Number} vert_no A vertex number.
 * @param {Number} An U texture coordinate.
 * @param {Number} A V texture coordinate.
 */
b9.PrimitiveBuffer.prototype.setVertexTexCoord = function(vert_no, u, v) {
    // TODO
};

/**
 * Returns the vertex number to which the specified index refers.
 * @param {Number} index_no An index number.
 */
b9.PrimitiveBuffer.prototype.getIndex = function(index_no) {
    return this._index_array[index_no];
};

/**
 * Sets the vertex number to which the specified index refers.
 * @param {Number} index_no An index number.
 * @param {Number} vert_no A vertex number.
 */
b9.PrimitiveBuffer.prototype.setIndex = function(index_no, vert_no) {
    this._index_array[index_no] = vert_no;
};

/**
 * TODO
 * @param {Number} vert_no A vertex number.
 */
b9.PrimitiveBuffer.prototype.updateVertex = function(vert_no) {
    var gl;

    if (this._is_uploaded) {
        gl = b9.System.getGLContext();

        gl.bindBuffer(gl.ARRAY_BUFFER, this._vert_glbuf);
        gl.bufferSubData(gl.ARRAY_BUFFER, vert_no * 3, this._vert_array);
        gl.bufferSubData(gl.ARRAY_BUFFER, vert_no * 3 + 1, this._vert_array);
        gl.bufferSubData(gl.ARRAY_BUFFER, vert_no * 3 + 2, this._vert_array);
    }
};

/**
 * TODO
 * @param {Number} index_no An index number.
 */
b9.PrimitiveBuffer.prototype.updateIndex = function(index_no) {
    var gl;

    if (this._is_uploaded) {
        gl = b9.System.getGLContext();

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._index_glbuf);
        gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, index_no, this._index_array);
    }
};

b9.PrimitiveBuffer.prototype._setup = function() {
    var gl = b9.System.getGLContext();

    gl.bindBuffer(gl.ARRAY_BUFFER, this._vert_glbuf);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._index_glbuf);

    if (!this._is_uploaded) {
        gl.bufferData(gl.ARRAY_BUFFER, this._vert_array, gl.STATIC_DRAW); // or gl.DYNAMIC_DRAW
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this._index_array, gl.DYNAMIC_DRAW); // or gl.DYNAMIC_DRAW

        this._is_uploaded = true;
    }
};
