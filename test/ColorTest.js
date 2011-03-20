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

function testColor() {
    var color1, color2, color3, color4;

    /* initialize */
    color1 = new b9.Color();

    color2 = new b9.Color(1, 2, 3, 4);
    assertTrue(color2.r === 1 && color2.g === 2 && color2.b === 3 && color2.a === 4);

    color3 = new b9.Color(2, 3, 4);
    assertTrue(color3.r === 2 && color3.g === 3 && color3.b === 4 && color3.a === 255);

    color4 = new b9.Color(color2);
    assertTrue(color4.r === 1 && color4.g === 2 && color4.b === 3 && color4.a === 4);

    /* set */
    assertEquals_object(new b9.Color(1, 2, 3, 4), color1.set(1, 2, 3, 4));
    assertEquals_object(new b9.Color(2, 3, 4, 255), color1.set(2, 3, 4));
    assertEquals_object(new b9.Color(2, 3, 4, 255), color2.set(color1));

    /* add */
    color1.set(1, 2, 3, 4);
    color2.set(2, 3, 4, 5);
    assertEquals_object(new b9.Color(3, 5, 7, 9), color1.add(color2));

    color1.set(200, 200, 200, 200);
    color2.set(60, 70, 80, 90);
    assertEquals_object(new b9.Color(255, 255, 255, 255), color1.add(color2));

    /* sub */
    color1.set(5, 6, 7, 8);
    color2.set(4, 3, 2, 1);
    assertEquals_object(new b9.Color(1, 3, 5, 7), color1.sub(color2));

    color1.set(1, 1, 1, 1);
    color2.set(3, 4, 5, 6);
    assertEquals_object(new b9.Color(0, 0, 0, 0), color1.sub(color2));

    /* mul */
    color1.set(128, 128, 128, 128);
    color2.set(10, 20, 30, 40);
    assertEquals_object(new b9.Color(5, 10, 15, 20), color1.mul(color2));

    color1.set(40, 60, 80, 100);
    assertEquals_object(new b9.Color(10, 15, 20, 25), color1.mul(0.25));

    color1.set(10, 20, 30, 40);
    assertEquals_object(new b9.Color(0, 0, 0, 0), color1.mul(-1.0));

    color1.set(10, 20, 30, 40);
    assertEquals_object(new b9.Color(255, 255, 255, 255), color1.mul(100.0));

    /* div */
    color1.set(20, 40, 60, 80);
    assertEquals_object(new b9.Color(10, 20, 30, 40), color1.div(2.0));

    color1.set(10, 20, 30, 40);
    assertEquals_object(new b9.Color(0, 0, 0, 0), color1.div(-1.0));

    color1.set(10, 20, 30, 40);
    assertEquals_object(new b9.Color(255, 255, 255, 255), color1.div(0.01));

    /* lerp */
    color1.set(20, 40, 60, 80);
    color2.set(40, 60, 80, 100);
    assertEquals_object(new b9.Color(20, 40, 60, 80), color1.lerp(color2, -1.0));

    color1.set(20, 40, 60, 80);
    color2.set(40, 60, 80, 100);
    assertEquals_object(new b9.Color(30, 50, 70, 90), color1.lerp(color2, 0.5));

    color1.set(20, 40, 60, 80);
    color2.set(40, 60, 80, 100);
    assertEquals_object(color2, color1.lerp(color2, 2.0));

    /* equals */
    color1.set(10, 20, 30, 40);
    color2.set(color1);
    assertTrue(color1.equals(color2));

    color2.set(11, 20, 30, 40);
    assertFalse(color1.equals(color2));

    color2.set(10, 21, 30, 40);
    assertFalse(color1.equals(color2));

    color2.set(10, 20, 31, 40);
    assertFalse(color1.equals(color2));

    color2.set(10, 20, 30, 41);
    assertFalse(color1.equals(color2));

    /* toString */
    assertEquals("(10, 20, 30, 40)", (new b9.Color(10, 20, 30, 40)).toString());

    /* ZERO */
    assertEquals_object(new b9.Color(0, 0, 0, 0), b9.Color.ZERO);

    /* FULL */
    assertEquals_object(new b9.Color(255, 255, 255, 255), b9.Color.FULL);
}
