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

    this._buf_stat = new b9.BufferState();
    this._shader = null;
    this._uni_count = uni_count;
    this._tex_count = b9.Math.max(tex_count, 1);
    this._pivot_type = b9.Sprite.PIVOT_CENTER;
    this._width = b9.Sprite._DEFAULT_SPRITE_SIZE;
    this._height = b9.Sprite._DEFAULT_SPRITE_SIZE;
    this._color = new b9.Color(255, 255, 255, 255);

    this._tex_array = new Array(tex_count);
    for (i = 0; i < tex_count; i++) {
        this._tex_array[i] = null;
    }

    this._texcoord_data = new Float32Array(4 * 2);
    this._texcoord_glbuf = null;

    for (i = 0; i < 4; i++) {
        this._pos_array[i] = new b9.Vector3D(this._pos_data, i * 3);
    }

    this.setTexCoord(0.0, 0.0, 1.0, 1.0);

    this._is_uploaded = false;
};

/**
 * Destructs this sprite.
 */
b9.Sprite.prototype.finalize = function() {
    // TODO

    this.finalizeSuper();
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

/**
 * Returns the number of the shader uniforms of this primitive.
 * @return {Number} The number of the shader uniforms.
 */
b9.Primitive.prototype.getUniformCount = function() {
    return this._uni_count;
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
 * @return {Number}
 */
b9.Sprite.prototype.getWidth = function() {
    return this._width;
};

/**
 *
 * @return {Number}
 */
b9.Sprite.prototype.getHeight = function() {
    return this._height;
};

/**
 *
 * @return {b9.Color}
 */
b9.Sprite.prototype.getColor = function() {
    return this._color;
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
b9.Sprite.prototype.getTexCoordU1 = function() {
    return this._texcoord_data[0];
};

/**
 *
 * @return {Number}
 */
b9.Sprite.prototype.getTexCoordV1 = function() {
    return this._texcoord_data[1];
};

/**
 *
 * @return {Number}
 */
b9.Sprite.prototype.getTexCoordU2 = function() {
    return this._texcoord_data[6];
};

/**
 *
 * @return {Number}
 */
b9.Sprite.prototype.getTexCoordV2 = function() {
    return this._texcoord_data[7];
};

/**
 *
 * @param {Number} u1
 * @param {Number} v1
 * @param {Number} u2
 * @param {Number} v2
 */
b9.Sprite.setTexCoord = function(u1, v1, u2, v2) {
    this._texcoord_data[0] = u1;
    this._texcoord_data[1] = v1;

    this._texcoord_data[2] = u1;
    this._texcoord_data[3] = v2;

    this._texcoord_data[4] = u2;
    this._texcoord_data[5] = v1;

    this._texcoord_data[6] = u2;
    this._texcoord_data[7] = v2;

    this._is_uploaded = false;
};

b9.Sprite.prototype._render = function(world_to_screen) {
    var shader = b9.Preset._sprite_shader;

    shader._setup();

    b9.Sprite._setupCommonBuffer(this._pivot_type, shader);

    if (this._buf_stat.checkUpdate()) {
        this._texcoord_glbuf = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, this._texcoord_glbuf);
        gl.bufferData(gl.ARRAY_BUFFER, this._texcoord_data, gl.DYNAMIC_DRAW);

        this._buf_stat.finishUpdate();
    }

    gl.enableVertexAttribArray(shader._texcoord_loc);
    gl.vertexAttribPointer(shader._texcoord_loc, 2, gl.FLOAT, false, 0, 0);

    b9.Matrix3D.mulArrayAs4x4(world_to_screen.getArray(), this._world.getArray(), local_to_screen.getArray());
    gl.uniformMatrix4fv(shader._local_to_screen_loc, false, local_to_screen.getArray()); // TODO

    gl.uniform4f(shader._node_color_loc,
            final_color_array[0], final_color_array[1], final_color_array[2], final_color_array[3]); // TODO

    gl.uniform2f(shader._sprite_scale_loc, this._width, this._height);

    for (i = 0; i < tex_count; i++) {
        tex = this._tex_array[i];

        if (tex) {
            tex._setup(shader);
        }
    }

    gl.drawArrays(gl.MODE_TRIANGLE_STRIP, 0, 4);

    // teardown
    gl.disableVertexAttribArray(shader._pos_loc);
    gl.disableVertexAttribArray(shader._texcoord_loc);
};

b9.Sprite._s_buf_stat = new b9.BufferState();
b9.Sprite._s_pos_glbuf = null;
b9.Sprite._s_pos_array = new Array(5 * 4);
b9.Sprite._s_pos_data = new Array(5 * 4 * 3);

b9.Sprite._setupCommonBuffer = function(pivot_type, shader) {
    var i;
    var gl;
    var pos_array, pos_data;

    if (!this._s_buf_stat || this._s_buf_stat.checkUpdate()) {
        gl = b9.System.getGLContext();

        pos_array = this._s_pos_array;
        pos_data = this._s_pos_data;

        for (i = 0; i < 20; i++) {
            pos_array[i] = new b9.Vector3D(pos_data, i * 3);
        }

        // b9.Sprite.PIVOT_CENTER
        pos_array[0].set(-0.5, 0.5, 0.0);
        pos_array[1].set(-0.5, -0.5, 0.0);
        pos_array[2].set(0.5, 0.5, 0.0);
        pos_array[3].set(0.5, -0.5, 0.0);

        // b9.Sprite.PIVOT_LEFT_TOP
        pos_array[4].set(0.0, 0.0, 0.0);
        pos_array[5].set(0.0, -1.0, 0.0);
        pos_array[6].set(1.0, 0.0, 0.0);
        pos_array[7].set(1.0, -1.0, 0.0);

        // b9.Sprite.PIVOT_RIGHT_TOP
        pos_array[8].set(-1.0, 0.0, 0.0);
        pos_array[9].set(-1.0, -1.0, 0.0);
        pos_array[10].set(0.0, 0.0, 0.0);
        pos_array[11].set(0.0, -1.0, 0.0);

        // b9.Sprite.PIVOT_LEFT_BOTTOM
        pos_array[12].set(0.0, 1.0, 0.0);
        pos_array[13].set(0.0, 0.0, 0.0);
        pos_array[14].set(1.0, 1.0, 0.0);
        pos_array[15].set(1.0, 0.0, 0.0);

        // b9.Sprite.PIVOT_RIGHT_BOTTOM
        pos_array[16].set(-1.0, 1.0, 0.0);
        pos_array[17].set(-1.0, 0.0, 0.0);
        pos_array[18].set(0.0, 1.0, 0.0);
        pos_array[19].set(0.0, 0.0, 0.0);

        this._s_pos_glbuf = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, this._s_pos_glbuf);
        gl.bufferData(gl.ARRAY_BUFFER, pos_data, gl.DYNAMIC_DRAW);

        this._s_buf_stat.finishUpdate();
    }

    //gl.bindBuffer(gl.ARRAY_BUFFER, this._s_pos_glbuf_array[pivot_type]);
    gl.enableVertexAttribArray(shader._pos_loc);
    gl.vertexAttribPointer(shader._pos_loc, 3, gl.FLOAT, false, 0, 0);
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
