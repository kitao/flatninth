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
 * Constructs a shader.
 *
 * @class A programmable shader, consists of a vertex shader and a fragment shader,
 * which decides how the Primitive should be drawn.
 *
 * @param {String} vert_code A vertex shader code.
 * @param {String} frag_code A fragment shader code.
 * @param {Number} uni_count The number of the uniforms.
 * @param {Number} att_count The number of the attributes.
 * @param {Number} tex_count The number of the textures.
 */
b9.Shader = b9.createClass();

/**
 * @ignore
 */
b9.Shader.prototype.initialize = function(vert_code, frag_code, uni_count, att_count, tex_count) {
    this._buf_stat = new b9.BufferState();
    this._vert_code = vert_code;
    this._frag_code = frag_code;
    this._uni_count = uni_count;
    this._att_count = att_count;
    this._tex_count = tex_count;
    this._glprog = null;
};

/**
 * Destructs this shader.
 */
b9.Shader.prototype.finalize = function() {
    var gl = b9.System.getGLContext();

    if (this._glprog) {
        gl.deleteProgram(this._glprog);
        this._glprog = null;
    }
};

/**
 * Returns the number of the uniforms this shader requires.
 * @return {Number} The number of the uniforms.
 */
b9.Shader.prototype.getUniformCount = function() {
    return this._uni_count;
};

/**
 * Returns the number of the attributes this shader requires.
 * @return {Number} The number of the attributes.
 */
b9.Shader.prototype.getAttributeCount = function() {
    return this._att_count;
};

/**
 * Returns the number of the textures this shader requires.
 * @return {Number} The number of the textures.
 */
b9.Shader.prototype.getTextureCount = function() {
    return this._tex_count;
};

b9.Shader.prototype._setup = function() {
    var i;
    var vert_glshd, frag_glshd;
    var gl = b9.System.getGLContext();

    if (this._buf_stat.checkUpdate()) {
        gl = b9.System.getGLContext();

        this._glprog = gl.createProgram();

        vert_glshd = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vert_glshd, this._vert_code);
        gl.compileShader(vert_glshd);

        if (!gl.getShaderParameter(vert_glshd, gl.COMPILE_STATUS)) {
            b9.System.error("vertex shader compile error\n\n" + gl.getShaderInfoLog(vert_glshd));
        }

        frag_glshd = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(frag_glshd, this._frag_code);
        gl.compileShader(frag_glshd);

        if (!gl.getShaderParameter(frag_glshd, gl.COMPILE_STATUS)) {
            b9.System.error("fragment shader compile error\n\n" + gl.getShaderInfoLog(frag_glshd));
        }

        gl.attachShader(this._glprog, vert_glshd);
        gl.attachShader(this._glprog, frag_glshd);
        gl.linkProgram(this._glprog);

        if (!gl.getProgramParameter(this._glprog, gl.LINK_STATUS)) {
            b9.System.error("shader link error");
        }

        gl.deleteShader(vert_glshd);
        gl.deleteShader(frag_glshd);

        this._local_to_screen_loc = gl.getUniformLocation(this._glprog, "b9_local_to_screen");
b9.Debug.trace("b9_local_to_screen=" + this._local_to_screen_loc);
        this._node_color_loc = gl.getUniformLocation(this._glprog, "b9_node_color");
b9.Debug.trace("b9_node_color=" + this._node_color_loc);
        this._pos_loc = gl.getAttribLocation(this._glprog, "b9_vertex_pos");
b9.Debug.trace("b9_vertex_pos=" + this._pos_loc);
        this._color_loc = gl.getAttribLocation(this._glprog, "b9_vertex_color");
b9.Debug.trace("b9_vertex_color=" + this._color_loc);
        this._texcoord_loc = gl.getAttribLocation(this._glprog, "b9_vertex_texcoord");
b9.Debug.trace("b9_vertex_texcoord=" + this._texcoord_loc);

        if (this._uni_count > 0) {
            this._uni_loc_table = new Array(this._uni_count);

            for (i = 0; i < this._uni_count; i++) {
                this._uni_loc_table[i] = gl.getUniformLocation(this._glprog, "b9_uniform_" + ("0" + i).substr(-2));
            }
        }

        if (this._att_count > 0) {
            this._att_loc_table = new Array(this._att_count);

            for (i = 0; i < this._att_count; i++) {
                this._att_loc_table[i] = gl.getAttribLocation(this._glprog, "b9_attrib_" + ("0" + i).substr(-2));
            }
        }

        if (this._tex_count > 0) {
            this._tex_loc_table = new Array(this._tex_count);

            for (i = 0; i < this._tex_count; i++) {
                this._tex_loc_table[i] = gl.getUniformLocation(this._glprog, "b9_texture_" + ("0" + i).substr(-2));
b9.Debug.trace("b9_texture_" + i + "=" + this._tex_loc_table[i]);
            }
        }

        this._buf_stat.finishUpdate();
    }

    gl.useProgram(this._glprog);
};
