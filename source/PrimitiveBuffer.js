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
    this._index_count = index_count;

    this._pos_array = new Array(vert_count);
    this._pos_data = new Float32Array(vert_count * 3);
    this._pos_glbuf = gl.createBuffer();

    this._color_array = new Array(vert_count);
    this._color_data = new Float32Array(vert_count * 4);
    this._color_glbuf = gl.createBuffer();

    this._texcoord_data = new Float32Array(vert_count * 2);
    this._texcoord_glbuf = gl.createBuffer();

    for (i = 0; i < vert_count; i++) {
        this._pos_array[i] = new b9.Vector3D(this._pos_data, i * 3);
        this._pos_array[i].set(b9.Vector3D.ZERO);

        this._color_array[i] = new b9.Color(this._color_data, i * 4);
        this._color_array[i].set(1.0, 1.0, 1.0, 1.0);

        this._texcoord_data[i * 2] = 0.0;
        this._texcoord_data[i * 2 + 1] = 0.0;
    }

    this._index_data = new Uint16Array(index_count);
    this._index_glbuf = gl.createBuffer();

    this._is_uploaded = false;
};

/**
 *
 */
b9.PrimitiveBuffer.prototype.finalize = function() {
    var gl = b9.System.getGLContext();

    gl.deleteBuffer(this._pos_glbuf);
    gl.deleteBuffer(this._color_glbuf);
    gl.deleteBuffer(this._texcoord_glbuf);

    if (this._normal_glbuf) {
        gl.deleteBuffer(this._normal_glbuf);
    }

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
b9.PrimitiveBuffer.prototype.getPos = function(vert_no) {
    return this._pos_array[vert_no];
};

/**
 *
 * @param {Number} vert_no A vertex number.
 * @return {b9.Color}
 */
b9.PrimitiveBuffer.prototype.getColor = function(vert_no) {
    return this._color_array[vert_no];
};

/**
 * Returns the U texture coordinate of the specified vertex.
 * @param {Number} vert_no A vertex number.
 * @return {Number} The U texture coordinate.
 */
b9.PrimitiveBuffer.prototype.getTexCoordU = function(vert_no) {
    return this._texcoord_data[vert_no * 2];
};

/**
 * Returns the V texture coordinate of the specified vertex.
 * @param {Number} vert_no A vertex number.
 * @return {Number} The V texture coordinate.
 */
b9.PrimitiveBuffer.prototype.getTexCoordV = function(vert_no) {
    return this._texcoord_data[vert_no * 2 + 1];
};

/**
 * Sets the UV texture coordinates of the specified vertex.
 * @param {Number} vert_no A vertex number.
 * @param {Number} An U texture coordinate.
 * @param {Number} A V texture coordinate.
 */
b9.PrimitiveBuffer.prototype.setTexCoord = function(vert_no, u, v) {
    this._texcoord_data[vert_no * 2] = u;
    this._texcoord_data[vert_no * 2 + 1] = v;
};

/**
 *
 * @return {Boolean}
 */
b9.PrimitiveBuffer.prototype.hasNormal = function() {
    return this._normal_glbuf ? true : false;
};

/**
 *
 */
b9.PrimitiveBuffer.prototype.attachNormal = function() {
    this._normal_array = new Array(vert_count);
    this._normal_data = new Float32Array(vert_count * 3);
    this._normal_glbuf = gl.createBuffer();

    for (i = 0; i < vert_count; i++) {
        this._normal_array[i] = new b9.Vector3D(this._normal_data, i * 3);
    }
};

/**
 *
 * @param {Number} vert_no A vertex number.
 * @return {b9.Vector3D}
 */
b9.PrimitiveBuffer.prototype.getNormal = function(vert_no) {
    return this._normal_array[i];
};

/**
 * Returns the vertex number to which the specified index refers.
 * @param {Number} index_no An index number.
 */
b9.PrimitiveBuffer.prototype.getIndex = function(index_no) {
    return this._index_data[index_no];
};

/**
 * Sets the vertex number to which the specified index refers.
 * @param {Number} index_no An index number.
 * @param {Number} vert_no A vertex number.
 */
b9.PrimitiveBuffer.prototype.setIndex = function(index_no, vert_no) {
    this._index_data[index_no] = vert_no;
};

b9.PrimitiveBuffer.prototype._setup = function(shader) {
    var gl = b9.System.getGLContext();

    if (!this._is_uploaded) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this._pos_glbuf);
        gl.bufferData(gl.ARRAY_BUFFER, this._pos_data, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this._color_glbuf);
        gl.bufferData(gl.ARRAY_BUFFER, this._color_data, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this._texcoord_glbuf);
        gl.bufferData(gl.ARRAY_BUFFER, this._texcoord_data, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._index_glbuf);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this._index_data, gl.STATIC_DRAW);

        this._is_uploaded = true;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, this._pos_glbuf);
    gl.enableVertexAttribArray(shader._pos_loc);
    gl.vertexAttribPointer(shader._pos_loc, 3, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(shader._color_loc);
    gl.bindBuffer(gl.ARRAY_BUFFER, this._color_glbuf);
    gl.vertexAttribPointer(shader._color_loc, 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this._texcoor_glbuf);
    gl.enableVertexAttribArray(shader._texcoord_loc);
    gl.vertexAttribPointer(shader._texcoord_loc, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._index_glbuf);
};

b9.PrimitiveBuffer.prototype._teardown = function(shader) {
    var gl = b9.System.getGLContext();

    gl.disableVertexAttribArray(shader._pos_loc);
    gl.disableVertexAttribArray(shader._color_loc);
    gl.disableVertexAttribArray(shader._texcoord_loc);
};
