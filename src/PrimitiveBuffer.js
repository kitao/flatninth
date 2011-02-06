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

/**
 * Constructs a primitive buffer.
 *
 * @class Manages vertices and elements referenced by primitives.
 * Vertices contain the information for drawing such as a position, a color, and texture coordinates.
 * Elements are the reference to vertices, with which a vertex can be used multiple times in a single drawing.
 *
 * @param {Number} vert_count The number of vertices.
 * @param {Number} elem_count The number of elements.
 * @param {Number} [att_count] The number of the shader attributes.
 */
b9.PrimitiveBuffer = b9.createClass();

/**
 * @ignore
 */
b9.PrimitiveBuffer.prototype.initialize = function(vert_count, elem_count, att_count) {
    var i;
    var gl = b9.System.getGLContext();

    this._vert_count = vert_count;
    this._elem_count = elem_count;
    this._att_count = att_count; // TODO

    this._pos_array = new Array(vert_count);
    this._pos_data = new Float32Array(vert_count * 3);
    this._pos_glbuf = gl.createBuffer();

    this._color_array = new Array(vert_count);
    this._color_data = new Uint8Array(vert_count * 4);
    this._color_glbuf = gl.createBuffer();

    this._texcoord_data = new Float32Array(vert_count * 2);
    this._texcoord_glbuf = gl.createBuffer();

    for (i = 0; i < vert_count; i++) {
        this._pos_array[i] = new b9.Vector3D(this._pos_data, i * 3);
        this._pos_array[i].set(b9.Vector3D.ZERO);

        this._color_array[i] = new b9.Color(this._color_data, i * 4);
        this._color_array[i].set(255, 255, 255);

        this._texcoord_data[i * 2] = 0.0;
        this._texcoord_data[i * 2 + 1] = 0.0;
    }

    this._elem_data = new Uint16Array(elem_count);
    this._elem_glbuf = gl.createBuffer();

    this._is_uploaded = false;
};

/**
 * Destructs thie primitive buffer.
 */
b9.PrimitiveBuffer.prototype.finalize = function() {
    var gl = b9.System.getGLContext();

    gl.deleteBuffer(this._pos_glbuf);
    gl.deleteBuffer(this._color_glbuf);
    gl.deleteBuffer(this._texcoord_glbuf);

    // TODO: delete attribute buffers

    gl.deleteBuffer(this._elem_glbuf);
};

/**
 * Returns the number of the vertices.
 * @return {Number} The number of the vertices.
 */
b9.PrimitiveBuffer.prototype.getVertexCount = function() {
    return this._vert_count;
};

/**
 * Returns the number of the elements.
 * @return {Number} The number of ths elements.
 */
b9.PrimitiveBuffer.prototype.getElementCount = function() {
    return this._elem_count;
};

/**
 * Returns the number of the shader attributes.
 * @return {Number} The number of the attributes.
 */
b9.PrimitiveBuffer.prototype.getAttributeCount = function() {
    return this._att_count;
};

/**
 * Returns the position of the specified vertex.
 * @param {Number} vert_index A vertex index.
 * @preturn {b9.Vector3D} The position of the vertex.
 */
b9.PrimitiveBuffer.prototype.getPos = function(vert_index) {
    return this._pos_array[vert_index];
};

/**
 * Returns the color of the specified vertex.
 * @param {Number} vert_index A vertex index.
 * @return {b9.Color} The color of the vertex.
 */
b9.PrimitiveBuffer.prototype.getColor = function(vert_index) {
    return this._color_array[vert_index];
};

/**
 * Returns the U texture coordinate of the specified vertex.
 * @param {Number} vert_index A vertex index.
 * @return {Number} The U texture coordinate.
 */
b9.PrimitiveBuffer.prototype.getTexCoordU = function(vert_index) {
    return this._texcoord_data[vert_index * 2];
};

/**
 * Returns the V texture coordinate of the specified vertex.
 * @param {Number} vert_index A vertex index.
 * @return {Number} The V texture coordinate.
 */
b9.PrimitiveBuffer.prototype.getTexCoordV = function(vert_index) {
    return this._texcoord_data[vert_index * 2 + 1];
};

/**
 * Sets the UV texture coordinates of the specified vertex.
 * @param {Number} vert_index A vertex index.
 * @param {Number} u A U texture coordinate.
 * @param {Number} v A V texture coordinate.
 */
b9.PrimitiveBuffer.prototype.setTexCoord = function(vert_index, u, v) {
    this._texcoord_data[vert_index * 2] = u;
    this._texcoord_data[vert_index * 2 + 1] = v;
};

/**
 * Returns the vertex index to which the specified element refers.
 * @param {Number} elem_index An element index.
 */
b9.PrimitiveBuffer.prototype.getIndex = function(elem_index) {
    return this._elem_data[elem_index];
};

/**
 * Sets the vertex index to which the specified element refers.
 * @param {Number} elem_index An element index.
 * @param {Number} vert_index A vertex index.
 */
b9.PrimitiveBuffer.prototype.setIndex = function(elem_index, vert_index) {
    this._elem_data[elem_index] = vert_index;
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

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._elem_glbuf);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this._elem_data, gl.STATIC_DRAW);

        this._is_uploaded = true;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, this._pos_glbuf);
    gl.enableVertexAttribArray(shader._pos_loc);
    gl.vertexAttribPointer(shader._pos_loc, 3, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(shader._color_loc);
    gl.bindBuffer(gl.ARRAY_BUFFER, this._color_glbuf);
    gl.vertexAttribPointer(shader._color_loc, 4, gl.UNSIGNED_BYTE, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this._texcoord_glbuf);
    gl.enableVertexAttribArray(shader._texcoord_loc);
    gl.vertexAttribPointer(shader._texcoord_loc, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._elem_glbuf);
};

b9.PrimitiveBuffer.prototype._teardown = function(shader) {
    var gl = b9.System.getGLContext();

    gl.disableVertexAttribArray(shader._pos_loc);
    gl.disableVertexAttribArray(shader._color_loc);
    gl.disableVertexAttribArray(shader._texcoord_loc);
};
