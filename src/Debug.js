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
 * @class
 */
b9.Debug = {};

b9.Debug._initialize = function() {
    var i;

    this._is_debug_enabled = true;
    this._is_perf_monitor_enabled = false;

    this._prim_buf = new b9.PrimitiveBuffer(this._MAX_VERTEX_COUNT, this._MAX_VERTEX_COUNT);
    this._prim_array = new Array(this._MAX_PRIMITIVE_COUNT);

    this._cur_prim_count = 0;
    this._cur_vert_count = 0;

    for (i = 0; i < this._MAX_PRIMITIVE_COUNT; i++) {
        this._prim_array[i] = new b9.Primitive(this._prim_buf);
    }
};

/**
 *
 */
b9.Debug.isDebugEnabled = function() {
    return this._is_debug_enabled;
};

/**
 *
 * @param {Boolean} is_debug_enabled
 */
b9.Debug.setDebugEnabled = function(is_enabled) {
    this._is_debug_enabled = is_enabled;
};

/**
 *
 */
b9.Debug.isPerformanceMonitorEnabled = function() {
    return this._is_perf_monitor_enabled;
};

/**
 *
 * @param {Boolean} is_perf_monitor_enabled
 */
b9.Debug.setPerformanceMonitorEnabled = function(is_enabled) {
    this._is_perf_monitor_enabled = is_enabled;
};

/**
 * Writes a message to the console.
 * @param {String} msg A message.
 */
b9.Debug.trace = function(msg) {
    if (this._is_debug_enabled) {
        console.log(msg);
    }
};

/**
 *
 * @param {Number} x
 * @param {Number} y
 * @param {String} str
 * @param {b9.Color} color
 */
b9.Debug.drawString = function(x, y, str, color) {
    if (this._is_debug_enabled) {
        // TODO
    }
};

/**
 *
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x2
 * @param {Number} y2
 * @param {b9.Color} color
 */
b9.Debug.drawLine = function(x1, y1, x2, y2, color) {
    if (this._is_debug_enabled) {
        if (this._cur_prim_count < this._MAX_PRIMITIVE_COUNT && this._cur_vert_count + 1 < this._MAX_VERTEX_COUNT) {
            // TODO

            this._cur_prim_count += 1;
            this._cur_vert_count += 2;
        }


        // TODO
    }
};

/**
 *
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x2
 * @param {Number} y2
 * @param {Number} x3
 * @param {Number} y3
 * @param {b9.Color} color
 */
b9.Debug.drawPolygon3 = function(x1, y1, x2, y2, x3, y3, color) {
    if (this._is_debug_enabled) {
        // TODO
    }
};

/**
 *
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x2
 * @param {Number} y2
 * @param {Number} x3
 * @param {Number} y3
 * @param {Number} x4
 * @param {Number} y4
 * @param {b9.Color} color
 */
b9.Debug.drawPolygon4 = function(x1, y1, x2, y2, x3, y3, x4, y4, color) {
    if (this._is_debug_enabled) {
        // TODO
    }
};

/**
 *
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @param {b9.Color} color
 */
b9.Debug.drawRectangle = function(x, y, width, height, color) {
    if (this._is_debug_enabled) {
        // TODO
    }
};

b9.Debug._render = function() {
    if (this._is_debug_enabled) {
        if (this._is_perf_monitor_enabled) {
            this._renderPerformanceMonitor();
        }



        this._cur_prim_count = 0;
        this._cur_vert_count = 0;
    }
};

b9.Debug._renderPerformanceMonitor = function() {
    // TODO
};

b9.Debug._MAX_PRIMITIVE_COUNT = 100;
b9.Debug._MAX_VERTEX_COUNT = 100;
