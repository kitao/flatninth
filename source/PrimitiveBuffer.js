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
 * @param {Number} elem_count The number of indices.
 */
b9.PrimitiveBuffer = b9.createClass();

/**
 * @ignore
 */
b9.PrimitiveBuffer.prototype.initialize = function(vert_count, elem_count) {
    var i;
    var gl = b9.System.getGLContext();

    this._vert_count = vert_count;
    this._vert_array = new Float32Array(vert_count * 3);
    this._vert_glbuf = gl.createBuffer();

    this._elem_count = elem_count;
    this._elem_array = new Uint16Array(elem_count);
    this._elem_glbuf = gl.createBuffer();

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
 * @return {Number}
 */
b9.PrimitiveBuffer.prototype.getVertexCount = function() {
    return this._vert_count;
};

/**
 * Returns the number of indices.
 * @return {Number}
 */
b9.PrimitiveBuffer.prototype.getIndexCount = function() {
    return this._index_count;
};

/**
 * Returns the position of the specified vertex.
 * @param {Number} vert_index The index of a vertex.
 */
b9.PrimitiveBuffer.prototype.getVertexPosition = function(vert_index) {
    return this._vert_pos[index];
};

/**
 * Returns the U texture coordinate of the specified vertex.
 * @param {Number} vert_index The index of a vertex.
 * @return {Number} The U texture coordinate.
 */
b9.PrimitiveBuffer.prototype.getVertexTexCoordU = function(vert_index) {
};

/**
 * Returns the V texture coordinate of the specified vertex.
 * @param {Number} vert_index The index of a vertex.
 * @return {Number} The V texture coordinate.
 */
b9.PrimitiveBuffer.prototype.getVertexTexCoordU = function(vert_index) {
};

/**
 * Sets the UV texture coordinates of the specified vertex.
 * @param {Number} vert_index The index of a vertex.
 * @param {Number} An U texture coordinate.
 * @param {Number} A V texture coordinate.
 */
b9.PrimitiveBuffer.prototype.setVertexTexCoord = function(vert_index, u, v) {
};

/**
 * Returns the index of the vertex to which the specified element refers.
 * @param {Number} The index of the element.
 * @return {Number} The index of the vertex.
 */
b9.PrimitiveBuffer.prototype.getElementIndex = function(elem_index) {
    return this._index_array[index_no];
};

/**
 * Sets the indices of the vertices to which the specified elements refer.
 * @param {Number} elem_index The first index of the elements.
 * @param {Number} indices The indices of the vertices.
 */
b9.PrimitiveBuffer.prototype.setElementIndex = function(elem_index, indices) {
    var i;
    var count = arguments.length - 1;

    for (i = 0; i < count; i++) {
        this._index_array[index_no + i] = arguments[i + 1];
    }
};

/**
 *
 * @param {Number} vert_no
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
 *
 * @param {number} [index_no]
 */
b9.PrimitiveBuffer.prototype.updateIndex = function(index_no) {
    var gl;

    if (this._is_uploaded) {
        gl = b9.System.getGLContext();

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._index_glbuf);
        gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, index_no, this._index_array);
    }
};

/**
 *
 */
b9.PrimitiveBuffer.prototype._setup = function() {
    var gl = b9.System.getGLContext();

    gl.bindBuffer(gl.ARRAY_BUFFER, this._vert_glbuf);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._index_glbuf);

    if (!this._is_uploaded) {
        gl.bufferData(gl.ARRAY_BUFFER, this._vert_array, gl.STATIC_DRAW); // or gl.DYNAMIC_DRAW
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this._index_array, gl.DYNAMIC_DRAW); // or gl.DYNAMIC_DRAW

        this._is_uploaded = true;
    }
};
