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
 * @class An ID based on a string.
 */
b9.Asset = {};

b9.Asset._initialize = function(asset_dir) {
    this._asset_dir = asset_dir + "/";
    this._asset_list = null;

    // TODO
};

b9.Asset._finalize = function() {
    // TODO
};

/**
 * hoge
 * @param {String} name hoge
 */
b9.Asset.loadImage = function(name) {
    var asset = { type: b9.Asset.TYPE_IMAGE, data: new Image(), is_ready: false };
    this._asset_list[name] = asset;

    asset.image.src = this._asset_dir + name;

    asset.image.onload = function() {
        asset.image.is_ready = true;
        asset.image.onload = null;
    };

};

/**
 * hoge
 * @param {String} name hoge
 */
b9.Asset.getAsset = function(name) {
    var asset = this._asset_list[name];

    return (asset && asset.is_ready) ? asset.data : null;
};

/**
 * hoge
 * @param {String} name hoge
 */
b9.Asset.removeAsset = function(name) {
    // TODO
};

/**
 * hoge
 * @return {Number}
 */
b9.Asset.TYPE_IMAGE = 0;
