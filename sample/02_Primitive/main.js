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

function main() {
    var color = new b9.Color();
    var displayInfo = ["P: CHANGE PRIM MODE", "F: TOGGLE FULLSCREEN", "Q: QUIT"];

    b9.System.setup("sample_canvas", 60);

    b9.Resource.add("flatninth_logo", new b9.Texture("../assets/catcake_logo_71x14.png"));
//    b9.Resource.add("coin", new b9.Texture("../assets/coin_400x200.png"));
    b9.Resource.add("coin", new b9.Texture("../assets/test_texture_64x64.png"));

    //newFlatninthLogo();
    newTriangle();
    newBlob(0.0, 0.0, color.set(128, 128, 128));
    newBlob(-200.0, 120.0, color.set(255, 128, 64));
    newBlob(0.0, 240.0, color.set(64, 255, 128));
    newBlob(200.0, 120.0, color.set(128, 64, 255));
    newBlob(-200.0, -120.0, color.set(255, 64, 128));
    newBlob(0.0, -240.0, color.set(128, 255, 64));
    newBlob(200.0, -120.0, color.set(64, 128, 255));

    b9.System.start();
}

main();
