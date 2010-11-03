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
b9.Shader = b9.createClass();

/**
 *
 * @param {String} vert_code
 * @param {String} frag_code
 * @param {Number} uni_count
 * @param {Number} att_count
 * @param {Number} tex_count
 */
b9.Shader.prototype.initialize = function(vert_code, frag_code, uni_count, att_count, tex_count) {
    var gl = b9.System.getGLContext();
    var vert_shader, frag_shader;

    vert_shader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vert_shader, vert_code);
    gl.compileShader(vert_shader);

    if (!gl.getShaderParameter(vert_shader, gl.COMPILE_STATUS)) {
        // TODO: compile error
        // delete shader
    }

    frag_shader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(frag_shader, frag_code);
    gl.compileShader(frag_shader);

    if (!gl.getShaderParameter(frag_shader, gl.COMPILE_STATUS)) {
        // TODO: compile error
        // delete shader x 2
    }

    this._prog = gl.createProgram();
    gl.attachShader(this._prog, vert_shader);
    gl.attachShader(this._prog, frag_shader);
    gl.linkProgram(this._prog);

    if (!gl.getProgramParameter(this._prog, gl.LINK_STATUS)) {
        // TODO: link error
    }

    gl.deleteShader(vert_shader);
    gl.deleteShader(frag_shader);

    /*
        m_local_to_screen_loc = ckLowLevelAPI::getUniformLocation(m_shd_obj, "ck_local_to_screen");
        m_vertex_loc = ckLowLevelAPI::getAttribLocation(m_shd_obj, "ck_vertex");
        m_color_loc = ckLowLevelAPI::getAttribLocation(m_shd_obj, "ck_color");
        m_texcoord_loc = ckLowLevelAPI::getAttribLocation(m_shd_obj, "ck_texcoord");

        char buf[16];

        for (s32 i = 0; i < m_uni_num; i++)
        {
            ckSysMgr::sprintf(buf, 16, "ck_uni_%02d", i);
            m_uni_loc_tbl[i] = ckLowLevelAPI::getUniformLocation(m_shd_obj, buf);
        }

        for (s32 i = 0; i < m_att_num; i++)
        {
            ckSysMgr::sprintf(buf, 16, "ck_att_%02d", i);
            m_att_loc_tbl[i] = ckLowLevelAPI::getAttribLocation(m_shd_obj, buf);
        }

        for (s32 i = 0; i < m_tex_num; i++)
        {
            ckSysMgr::sprintf(buf, 16, "ck_tex_%02d", i);
            m_tex_loc_tbl[i] = ckLowLevelAPI::getUniformLocation(m_shd_obj, buf);
        }
    */
};

/**
 *
 */
b9.Shader.prototype.finalize = function() {
};
