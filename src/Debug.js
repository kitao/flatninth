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
    this._is_debugging = true;
    this._is_perf_monitor = false;
    this._is_debug_console = false;
};

/**
 *
 * @param {Boolean} is_on
 */
b9.Debug.switchDebugging = function(is_on) {
    this._is_debugging = is_on;
};

/**
 *
 * @param {Boolean} is_on
 */
b9.Debug.switchPerformanceMonitor = function(is_on) {
    this._is_perf_monitor = is_on;
};

/**
 *
 * @param {Boolean} is_on
 */
b9.Debug.switchDebugConsole = function(is_on) {
    this._is_debug_console = is_on;
};

/**
 * Writes a message to the console.
 * @param {String} msg A message.
 */
b9.Debug.trace = function(msg) {
    if (this._is_debugging) {
        console.log(msg);

        // TODO
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
    if (this._is_debugging) {
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
    if (this._is_debugging) {
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
b9.Debug.drawPolygon3 = function(x1, y1, x2, y2, x3, y3, color) {
    if (this._is_debugging) {
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
    if (this._is_debugging) {
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
    if (this._is_debugging) {
        // TODO
    }
};

b9.Debug._render = function() {
    if (this._is_debugging) {
        if (this._is_perf_monitor) {
            this._renderPerformanceMonitor();
        }

        if (this._is_debug_console) {
            this._renderDebugConsole();
        }
    }
};

b9.Debug._renderPerformanceMonitor = function() {
    // TODO
};

b9.Debug._renderDebugConsole = function() {
    // TODO
};
