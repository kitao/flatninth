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

function testColor() {
    /* initialize */
    /* getR */
    /* getG */
    /* getB */
    /* getA */
    /* getArray */
    /* getIndex */
    var color1 = new b9.Color();

    var array = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);
    var color2 = new b9.Color(array, 4);
    assertTrue(color2.getR() === 5 && color2.getG() === 6 && color2.getB() === 7 && color2.getA() === 8);
    assertTrue(color2.getArray() === array && color2.getIndex() === 4);

    var color3 = new b9.Color(1, 2, 3);
    assertTrue(color3.getR() === 1 && color3.getG() === 2 && color3.getB() === 3 && color3.getA() === 255);

    var color4 = new b9.Color(2, 3, 4, 5);
    assertTrue(color4.getR() === 2 && color4.getG() === 3 && color4.getB() === 4 && color4.getA() === 5);

    var color5 = new b9.Color(color2);
    assertTrue(color5.getR() === 5 && color5.getG() === 6 && color5.getB() === 7 && color5.getA() === 8);

    /* setR */
    assertEquals(10, color1.setR(10).getR());

    /* setG */
    assertEquals(20, color1.setG(20).getG());

    /* setB */
    assertEquals(30, color1.setB(30).getB());

    /* setA */
    assertEquals(40, color1.setA(40).getA());

    /* set */
    assertEquals_object(new b9.Color(10, 20, 30, 255), color1.set(10, 20, 30));
    assertEquals_object(new b9.Color(20, 30, 40, 50), color1.set(20, 30, 40, 50));
    assertEquals_object(color1, color2.set(color1));

    /* add */
    color1.set(10, 20, 30, 40);
    color2.set(20, 30, 40, 50);
    assertEquals_object(new b9.Color(30, 50, 70, 90), color1.add(color2));

    color1.set(200, 200, 200, 200);
    color2.set(60, 70, 80, 90);
    assertEquals_object(new b9.Color(255, 255, 255, 255), color1.add(color2));

    /* sub */
    color1.set(50, 60, 70, 80);
    color2.set(40, 30, 20, 10);
    assertEquals_object(new b9.Color(10, 30, 50, 70), color1.sub(color2));

    color1.set(20, 20, 20, 20);
    color2.set(30, 40, 50, 60);
    assertEquals_object(new b9.Color(0, 0, 0, 0), color1.sub(color2));

    /* mul */
    color1.set(128, 128, 128, 128);
    color2.set(64, 128, 192, 255);
    assertEquals_object(new b9.Color(32, 64, 96, 128), color1.mul(color2));

    color1.set(20, 40, 60, 80);
    assertEquals_object(new b9.Color(10, 20, 30, 40), color1.mul(0.5));

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

    color2.set(0, 20, 30, 40);
    assertFalse(color1.equals(color2));

    color2.set(10, 0, 30, 40);
    assertFalse(color1.equals(color2));

    color2.set(10, 20, 0, 40);
    assertFalse(color1.equals(color2));

    color2.set(10, 20, 30, 0);
    assertFalse(color1.equals(color2));

    /* toString */
    assertEquals("(10, 20, 30, 40)", (new b9.Color(10, 20, 30, 40)).toString());
}
