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
 * @class hoge
 */
b9.AssetManager = {};

b9.AssetManager._initialize = function() {
    this._asset_list = {};

    // TODO
};

b9.AssetManager._finalize = function() {
    this._asset_list = null;

    // TODO
};

/**
 * hoge
 * @param {String} name hoge
 */
b9.AssetManager.getImageAsset = function(name) {
    var image = this._asset_list[name];

    if (!image) {
        image = new Image();
        image.is_ready = false;
        image.src = name;
        image.onload = function() { image.is_ready = true; };

        this._asset_list[name] = image;
    }

    return image;
};

/**
 * hoge
 * @param {String} name hoge
 */
b9.AssetManager.removeAsset = function(name) {
    // TODO
};
