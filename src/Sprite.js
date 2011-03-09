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
 * Constructs a point sprite.
 *
 * @class A derived class of the b9.Node class, which draws TODO.
 * @extends b9.Node
 *
 * @param {Number} [uni_count] The number of the shader uniforms. If not specified, 0 is used.
 * @param {Number} [tex_count] The number of the textures. This number is must be equal to or more than 1.
 * If not specified, 1 is used.
 */
b9.Sprite = b9.createClass(b9.Node);

/**
 * @ignore
 */
b9.Sprite.prototype.initialize = function(uni_count, tex_count) {
    var i;

    this.initializeSuper();

    this._uni_count = uni_count;
    this._tex_count = b9.Math.max(tex_count, 1);
    this._pivot_type = b9.Sprite.PIVOT_CENTER;
    this._width = b9.Sprite._DEFAULT_SPRITE_SIZE;
    this._height = b9.Sprite._DEFAULT_SPRITE_SIZE;

    this._tex_array = new Array(tex_count);
    for (i = 0; i < tex_count; i++) {
        this._tex_array[i] = null;
    }

    this._shader = null;
};

/**
 * Destructs this sprite.
 */
b9.Sprite.prototype.finalize = function() {
    this.finalizeSuper();
};

/**
 *
 * @return {Number}
 */
b9.Sprite.prototype.getPivotType = function() {
    return this._pivot_type;
};

/**
 *
 * @param {Number} pivot_type
 */
b9.Sprite.prototype.setPivotType = function(pivot_type) {
    this._pivot_type = pivot_type;
};

/**
 *
 */
b9.Sprite.prototype.getWidth = function() {
    return this._width;
};

/**
 *
 */
b9.Sprite.prototype.getHeight = function() {
    return this._height;
};

/**
 * Returns the number of the shader uniforms of this primitive.
 * @return {Number} The number of the shader uniforms.
 */
b9.Primitive.prototype.getUniformCount = function() {
    return this._uni_count;
};

/**
 * Returns the number of the shader attributes.
 * @return {Number} The number of the attributes.
 */
b9.PrimitiveBuffer.prototype.getAttributeCount = function() {
    return this._att_count;
};

/**
 * Returns the number of the textures of this sprite.
 * @return {Number} The number of the textures.
 */
b9.Sprite.prototype.getTextureCount = function() {
    return this._tex_count;
};

/**
 * Returns the specified texture of this sprite.
 * @param {Number} tex_no A texture number.
 * @return {b9.Texture} The texture.
 */
b9.Sprite.prototype.getTexture = function(tex_no) {
    return this._tex_array[tex_no];
};

/**
 * Sets the specified texture of this sprite.
 * @param {Number} tex_no A texture number.
 * @param {b9.Texture} tex A texture.
 */
b9.Sprite.prototype.setTexture = function(tex_no, tex) {
    this._tex_array[tex_no] = tex;
};

/**
 * Returns the shader of this sprite. If the default shader is used, returns null.
 * @return {b9.Shader} The shader.
 */
b9.Sprite.prototype.getShader = function() {
    return this._shader;
};

/**
 * Sets the shader of this sprite. If null is specified, the default shader is used.
 * @param {b9.Shader} shader A shader.
 */
b9.Sprite.prototype.setShader = function(shader) {
    this._shader = shader;
};

b9.Sprite.prototype._render = function(world_to_screen) {
    // TODO
};

/**
 *
 * @param {Number} width
 * @param {Number} height
 */
b9.Sprite.prototype.setSize = function(width, height) {
    this._width = width;
    this._height = height;
};

/**
 *
 * @return {Number}
 */
b9.Sprite.PIVOT_CENTER = 0;

/**
 *
 * @return {Number}
 */
b9.Sprite.PIVOT_LEFT_TOP = 1;

/**
 *
 * @return {Number}
 */
b9.Sprite.PIVOT_RIGHT_TOP = 2;

/**
 *
 * @return {Number}
 */
b9.Sprite.PIVOT_LEFT_BOTTOM = 3;

/**
 *
 * @return {Number}
 */
b9.Sprite.PIVOT_RIGHT_BOTTOM = 4;

b9.Sprite._DEFAULT_SPRITE_SIZE = 16.0;
