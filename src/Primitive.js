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
 * Constructs a primitive.
 *
 * @class A derived class of the b9.Node class, which draws points, lines, and polygons.
 * @extends b9.Node
 *
 * @param {b9.PrimitiveBuffer} prim_buf A primitive buffer this primitive refers to.
 * @param {Number} [uni_count] The number of the shader uniforms. If not specified, 0 is used.
 * @param {Number} [tex_count] The number of the textures. This number is must be equal to or more than 1.
 * If not specified, 1 is used.
 */
b9.Primitive = b9.createClass(b9.Node);

/**
 * @ignore
 */
b9.Primitive.prototype.initialize = function(prim_buf, uni_count, tex_count) {
    var i;

    this.initializeSuper();

    this._shader = null;
    this._uni_count = uni_count;
    this._tex_count = b9.Math.max(tex_count, 1);
    this._prim_buf = prim_buf;
    this._elem_index = 0;
    this._elem_count = prim_buf._elem_count;
    this._prim_mode = b9.Primitive.MODE_TRIANGLES;

    this._tex_array = new Array(tex_count);
    for (i = 0; i < tex_count; i++) {
        this._tex_array[i] = null;
    }
};

/**
 * Destructs this primitive.
 */
b9.Primitive.prototype.finalize = function() {
    this.finalizeSuper();
};

/**
 * Returns the shader of this primitive. If the default shader is used, returns null.
 * @return {b9.Shader} The shader.
 */
b9.Primitive.prototype.getShader = function() {
    return this._shader;
};

/**
 * Sets the shader of this primitive. If null is specified, the default shader is used.
 * @param {b9.Shader} shader A shader.
 */
b9.Primitive.prototype.setShader = function(shader) {
    this._shader = shader;
};

/**
 * Returns the number of the shader uniforms of this primitive.
 * @return {Number} The number of the shader uniforms.
 */
b9.Primitive.prototype.getUniformCount = function() {
    return this._uni_count;
};

/**
 * Returns the number of the textures of this primitive.
 * @return {Number} The number of the textures.
 */
b9.Primitive.prototype.getTextureCount = function() {
    return this._tex_count;
};

/**
 * Returns the specified texture of this primitive.
 * @param {Number} tex_no A texture number.
 * @return {b9.Texture} The texture.
 */
b9.Primitive.prototype.getTexture = function(tex_no) {
    return this._tex_array[tex_no];
};

/**
 * Sets the specified texture of this primitive.
 * @param {Number} tex_no A texture number.
 * @param {b9.Texture} tex A texture.
 */
b9.Primitive.prototype.setTexture = function(tex_no, tex) {
    this._tex_array[tex_no] = tex;
};

/**
 * Returns the primitive buffer of this primitive.
 * @return {b9.PrimitiveBuffer} The primitive buffer.
 */
b9.Primitive.prototype.getPrimitiveBuffer = function() {
    return this._prim_buf;
};

/**
 * Sets the primitive buffer of this primitive.
 * @param {b9.PrimitiveBuffer} prim_buf
 */
b9.Primitive.prototype.setPrimitiveBuffer = function(prim_buf) {
    this._prim_buf = prim_buf;

    // TODO: check index and count
};

/**
 * Returns the element index of the primitive buffer, from which this primitive draws.
 * @retrun {Number} The element index.
 */
b9.Primitive.prototype.getElementIndex = function() {
    return this._elem_index;
};

/**
 * Sets the element index of the primitive buffer, from which this primitive draws.
 * The element index must be less than the number of the primitive buffer elements.
 * @param {Number} elem_index The element index.
 */
b9.Primitive.prototype.setElementIndex = function(elem_index) {
    this._elem_index = elem_index;
};

/**
 * Returns the number of elements, which this primitive draws.
 * @retrun {Number} The number of vertices.
 */
b9.Primitive.prototype.getElementCount = function() {
    return this._elem_count;
};

/**
 * Sets the number of elements, which this primitive draws.
 * The sum of the element index and the number of elements must be equal to or less than
 * the number of the primitive buffer elements.
 * @param {Number} elem_count The number of elements.
 */
b9.Primitive.prototype.setElementCount = function(elem_count) {
    this._vert_count = vert_count;
};

/**
 * Returns the primitive mode of this primitive.
 * @return {Number} The primitive mode.
 */
b9.Primitive.prototype.getPrimitiveMode = function() {
    return this._prim_mode;
};

/**
 * Sets the primitive mode of this primitive.
 * @param {Number} prim_mode A primitive mode.
 */
b9.Primitive.prototype.setPrimitiveMode = function(prim_mode) {
    this._prim_mode = prim_mode;
};

b9.Primitive.prototype.draw_ = function(world_to_screen) {
    var i;
    var tex;
    var gl = b9.System.getGLContext();
    var shader = this._shader ? this._shader : b9.Preset._shader; // TODO
    var final_color_array = this._final_color.getArray();
    var tex_count = this._tex_count;

    var local_to_screen = [];

    var worldArray = [];
    this._world.toArray(worldArray);

    this._setup();

    shader._setup();
    this._prim_buf.bind_(shader);

    b9.Matrix3D.mulArray(world_to_screen, worldArray, local_to_screen);
    gl.uniformMatrix4fv(shader._local_to_screen_loc, false, local_to_screen); // TODO

    gl.uniform4f(shader._node_color_loc,
            final_color_array[0], final_color_array[1], final_color_array[2], final_color_array[3]); // TODO

    for (i = 0; i < tex_count; i++) {
        tex = this._tex_array[i];

        if (tex) {
            tex._setup(shader);
        }
    }

    gl.drawElements(this._prim_mode, this._prim_buf._elem_count, gl.UNSIGNED_SHORT, 0);

    this._prim_buf.unbind_(shader);
};

/**
 *
 * @return {Number}
 */
b9.Primitive.MODE_POINTS = 0;

/**
 *
 * @return {Number}
 */
b9.Primitive.MODE_LINES = 1;

/**
 *
 * @return {Number}
 */
b9.Primitive.MODE_LINE_LOOP = 2;

/**
 *
 * @return {Number}
 */
b9.Primitive.MODE_LINE_STRIP = 3;

/**
 *
 * @return {Number}
 */
b9.Primitive.MODE_TRIANGLES = 4;

/**
 *
 * @return {Number}
 */
b9.Primitive.MODE_TRIANGLE_STRIP = 5;

/**
 *
 * @return {Number}
 */
b9.Primitive.MODE_TRIANGLE_FAN = 6;

b9.Primitive._mat1 = new b9.Matrix3D();
