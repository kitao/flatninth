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
 * @param {Number} vertCount The number of the vertices.
 * @param {Number} elemCount The number of the elements.
 * @param {Number} [attCount] The number of the shader attributes.
 */
b9.PrimitiveBuffer = b9.createClass();

/**
 * @ignore
 */
b9.PrimitiveBuffer.prototype.initialize = function(vertCount, elemCount, attCount) {
    var i;

    /**
     * The number of vertices.
     * @type {Number}
     */
    this.vertexCount = vertCount;

    /**
     * The number of elements.
     * @type {Number}
     */
    this.elementCount = elemCount;

    /**
     * The number of attributes.
     * @type {Number}
     */
    this.attributeCount = attCount || 0;

    /**
     * The array of the positions.
     * @type {Float32Array}
     */
    posArray = this.posArray = new Float32Array(vertCount * 3);

    /**
     * The array of the colors.
     * @type {Uint8Array}
     */
    colorArray = this.colorArray = new Uint8Array(vertCount * 4);

    /**
     * The array of the texture coordinates.
     * @type {Float32Array}
     */
    texCoordArray = this.texCoordArray = new Float32Array(vertCount * 2);

    // TODO: initialize attributes

    /**
     * The array of the elements.
     * @type {Uint16Array}
     */
    this.elementArray = new Uint16Array(elemCount);

    this.glBufStat_ = new b9.GLBufferState();
    this.posGLBuf_ = null;
    this.colorGLBuf_ = null;
    this.texCoordGLBuf_ = null;
    this.elemGLBuf_ = null;
};

/**
 * Destructs thie primitive buffer.
 */
b9.PrimitiveBuffer.prototype.finalize = function() {
    var gl = b9.System.getGLContext();

    gl.deleteBuffer(this.posGLBuf_);
    gl.deleteBuffer(this.colorGLBuf_);
    gl.deleteBuffer(this.texCoordGLBuf_);
    // TODO: delete attribute buffers
    gl.deleteBuffer(this.elemGLBuf_);
};

/**
 * Returns the position of the specified vertex.
 * @param {Number} vertIndex A vertex index.
 * @param {b9.Vector3D} pos The destination of the position.
 */
b9.PrimitiveBuffer.prototype.getPos = function(vertIndex, pos) {
    var index = vertIndex * 3;
    var posArray = this.posArray;

    pos.x = posArray[index];
    pos.y = posArray[index + 1];
    pos.z = posArray[index + 2];
};

/**
 * Sets the position of the specified vertex.
 * @param {Number} vertIndex A vertex index.
 * @param {b9.Vector3D} pos A position.
 */
b9.PrimitiveBuffer.prototype.setPos = function(vertIndex, pos) {
    var index = vertIndex * 3;
    var posArray = this.posArray;

    posArray[index] = pos.x;
    posArray[index + 1] = pos.y;
    posArray[index + 2] = pos.z;
};

/**
 * Returns the color of the specified vertex.
 * @param {Number} vertIndex A vertex index.
 * @return {b9.Color} The color of the vertex.
 */
b9.PrimitiveBuffer.prototype.getColor = function(vertIndex) {
    var index = vertIndex * 4;
    var colorArray = this.colorArray;

    color.r = colorArray[index];
    color.g = colorArray[index + 1];
    color.b = colorArray[index + 2];
    color.a = colorArray[index + 3];
};

/**
 * Sets the color of the specified vertex.
 * @param {Number} vertIndex A vertex index.
 * @param {b9.Color} color A color.
 */
b9.PrimitiveBuffer.prototype.setColor = function(vertIndex, color) {
    var index = vertIndex * 4;
    var colorArray = this.colorArray;

    colorArray[index] = color.r;
    colorArray[index + 1] = color.g;
    colorArray[index + 2] = color.b;
    colorArray[index + 3] = color.a;
};

/**
 * Returns the U texture coordinate of the specified vertex.
 * @param {Number} vertIndex A vertex index.
 * @return {Number} The U texture coordinate.
 */
b9.PrimitiveBuffer.prototype.getTexCoordU = function(vertIndex) {
    return this.texCoordArray[vertIndex * 2];
};

/**
 * Returns the V texture coordinate of the specified vertex.
 * @param {Number} vertIndex A vertex index.
 * @return {Number} The V texture coordinate.
 */
b9.PrimitiveBuffer.prototype.getTexCoordV = function(vertIndex) {
    return this.texCoordArray[vertIndex * 2 + 1];
};

/**
 * Sets the UV texture coordinates of the specified vertex.
 * @param {Number} vertIndex A vertex index.
 * @param {Number} u A U texture coordinate.
 * @param {Number} v A V texture coordinate.
 */
b9.PrimitiveBuffer.prototype.setTexCoord = function(vertIndex, u, v) {
    var index = vertIndex * 2;
    var texCoordArray = this.texCoordArray;

    texCoordArray[vertIndex * 2] = u;
    texCoordArray[vertIndex * 2 + 1] = v;
};

/**
 * Returns the vertex index to which the specified element refers.
 * @param {Number} elemIndex An element index.
 */
b9.PrimitiveBuffer.prototype.getIndex = function(elemIndex) {
    return this.elementArray[elemIndex];
};

/**
 * Sets the vertex index to which the specified element refers.
 * @param {Number} elemIndex An element index.
 * @param {Number} vertIndex A vertex index.
 */
b9.PrimitiveBuffer.prototype.setIndex = function(elemIndex, vertIndex) {
    this.elementArray[elemIndex] = vertIndex;
};

/**
 *
 * @param {Number} vertIndex A vertex index.
 */
b9.PrimitiveBuffer.prototype.updateVertex = function(vertIndex) {
    // TODO
};

/**
 *
 * @param {Number} elemIndex An element index.
 */
b9.PrimitiveBuffer.prototype.updateElement = function(elemIndex) {
    // TODO
};

/**
 *
 */
b9.PrimitiveBuffer.prototype.updateAll = function() {
    this.glBufStat_.requestUpdate();
};

/**
 * @private
 */
b9.PrimitiveBuffer.prototype.bind_ = function(shader) {
    var gl = b9.System.getGLContext();

    if (this.glBufStat_.checkUpdate()) {
        this.posGLBuf_ = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.posGLBuf_);
        gl.bufferData(gl.ARRAY_BUFFER, this.posArray, gl.DYNAMIC_DRAW);

        this.colorGLBuf_ = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorGLBuf_);
        gl.bufferData(gl.ARRAY_BUFFER, this.colorArray, gl.DYNAMIC_DRAW);

        this.texCoordGLBuf_ = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordGLBuf_);
        gl.bufferData(gl.ARRAY_BUFFER, this.texCoordArray, gl.DYNAMIC_DRAW);

        this.elemGLBuf_ = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elemGLBuf_);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.elementArray, gl.DYNAMIC_DRAW);

        this.glBufStat_.finishUpdate();
    }

    gl.enableVertexAttribArray(shader._vert_pos_loc);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.posGLBuf_);
    gl.vertexAttribPointer(shader._vert_pos_loc, 3, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(shader._vert_color_loc);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorGLBuf_);
    gl.vertexAttribPointer(shader._vert_color_loc, 4, gl.UNSIGNED_BYTE, false, 0, 0);

    gl.enableVertexAttribArray(shader._vert_texcoord_loc);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordGLBuf_);
    gl.vertexAttribPointer(shader._vert_texcoord_loc, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elemGLBuf_);
};

/**
 * @private
 */
b9.PrimitiveBuffer.prototype.unbind_ = function(shader) {
    var gl = b9.System.getGLContext();

    gl.disableVertexAttribArray(shader._vert_pos_loc);
    gl.disableVertexAttribArray(shader._vert_color_loc);
    gl.disableVertexAttribArray(shader._vert_texcoord_loc);
};
