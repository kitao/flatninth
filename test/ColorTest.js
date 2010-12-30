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

    var array = new Float32Array([0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]);
    var color2 = new b9.Color(array, 4);
    assertEquals_float(color2.getR(), 0.5);
    assertEquals_float(color2.getG(), 0.6);
    assertEquals_float(color2.getB(), 0.7);
    assertEquals_float(color2.getA(), 0.8);
    assertTrue(color2.getArray() === array && color2.getIndex() === 4);

    var color3 = new b9.Color(0.1, 0.2, 0.3);
    assertEquals_float(color3.getR(), 0.1);
    assertEquals_float(color3.getG(), 0.2);
    assertEquals_float(color3.getB(), 0.3);
    assertEquals_float(color3.getA(), 1.0);
    assertTrue(color3.getArray() !== array && color3.getIndex() === 0);

    var color4 = new b9.Color(-1.0, -1.0, -1.0);
    assertEquals_float(color4.getR(), 0.0);
    assertEquals_float(color4.getG(), 0.0);
    assertEquals_float(color4.getB(), 0.0);
    assertEquals_float(color4.getA(), 1.0);
    assertTrue(color4.getArray() !== array && color4.getIndex() === 0);

    var color5 = new b9.Color(2.0, 2.0, 2.0);
    assertEquals_float(color5.getR(), 1.0);
    assertEquals_float(color5.getG(), 1.0);
    assertEquals_float(color5.getB(), 1.0);
    assertEquals_float(color5.getA(), 1.0);
    assertTrue(color5.getArray() !== array && color5.getIndex() === 0);

    var color6 = new b9.Color(0.1, 0.2, 0.3, 0.4);
    assertEquals_float(color6.getR(), 0.1);
    assertEquals_float(color6.getG(), 0.2);
    assertEquals_float(color6.getB(), 0.3);
    assertEquals_float(color6.getA(), 0.4);
    assertTrue(color6.getArray() !== array && color6.getIndex() === 0);

    var color7 = new b9.Color(-1.0, -1.0, -1.0, -1.0);
    assertEquals_float(color7.getR(), 0.0);
    assertEquals_float(color7.getG(), 0.0);
    assertEquals_float(color7.getB(), 0.0);
    assertEquals_float(color7.getA(), 0.0);
    assertTrue(color7.getArray() !== array && color7.getIndex() === 0);

    var color8 = new b9.Color(2.0, 2.0, 2.0, 2.0);
    assertEquals_float(color8.getR(), 1.0);
    assertEquals_float(color8.getG(), 1.0);
    assertEquals_float(color8.getB(), 1.0);
    assertEquals_float(color8.getA(), 1.0);
    assertTrue(color8.getArray() !== array && color8.getIndex() === 0);

    var color9 = new b9.Color(color2);
    assertEquals_float(color9.getR(), 0.5);
    assertEquals_float(color9.getG(), 0.6);
    assertEquals_float(color9.getB(), 0.7);
    assertEquals_float(color9.getA(), 0.8);
    assertTrue(color9.getArray() !== array && color9.getIndex() === 0);

    /* setR */
    assertEquals_float(0.5, color1.setR(0.5).getR());
    assertEquals_float(0.0, color1.setR(-1.0).getR());
    assertEquals_float(1.0, color1.setR(2.0).getR());

    /* setG */
    assertEquals_float(0.5, color1.setG(0.5).getG());
    assertEquals_float(0.0, color1.setG(-1.0).getG());
    assertEquals_float(1.0, color1.setG(2.0).getG());

    /* setB */
    assertEquals_float(0.5, color1.setB(0.5).getB());
    assertEquals_float(0.0, color1.setB(-1.0).getB());
    assertEquals_float(1.0, color1.setB(2.0).getB());

    /* setA */
    assertEquals_float(0.5, color1.setA(0.5).getA());
    assertEquals_float(0.0, color1.setA(-1.0).getA());
    assertEquals_float(1.0, color1.setA(2.0).getA());

    /* set */
    assertEquals_object(new b9.Color(0.1, 0.2, 0.3, 1.0), color1.set(0.1, 0.2, 0.3));
    assertEquals_object(new b9.Color(0.0, 0.0, 0.0, 1.0), color1.set(-1.0, -1.0, -1.0));
    assertEquals_object(new b9.Color(1.0, 1.0, 1.0, 1.0), color1.set(2.0, 2.0, 2.0));

    assertEquals_object(new b9.Color(0.2, 0.3, 0.4, 0.5), color1.set(0.2, 0.3, 0.4, 0.5));
    assertEquals_object(new b9.Color(0.0, 0.0, 0.0, 0.0), color1.set(-1.0, -1.0, -1.0, -1.0));
    assertEquals_object(new b9.Color(1.0, 1.0, 1.0, 1.0), color1.set(2.0, 2.0, 2.0, 2.0));

    assertEquals_object(color1, color2.set(color1));

    /* add */
    color1.set(0.1, 0.2, 0.3, 0.4);
    color2.set(0.2, 0.3, 0.4, 0.5);
    assertEquals_object(new b9.Color(0.3, 0.5, 0.7, 0.9), color1.add(color2));

    color1.set(0.9, 0.9, 0.9, 0.9);
    color2.set(0.6, 0.7, 0.8, 0.9);
    assertEquals_object(new b9.Color(1.0, 1.0, 1.0, 1.0), color1.add(color2));

    /* sub */
    color1.set(0.5, 0.6, 0.7, 0.8);
    color2.set(0.4, 0.3, 0.2, 0.1);
    assertEquals_object(new b9.Color(0.1, 0.3, 0.5, 0.7), color1.sub(color2));

    color1.set(0.1, 0.1, 0.1, 0.1);
    color2.set(0.3, 0.4, 0.5, 0.6);
    assertEquals_object(new b9.Color(0, 0, 0, 0), color1.sub(color2));

    /* mul */
    color1.set(0.5, 0.5, 0.5, 0.5);
    color2.set(0.2, 0.4, 0.6, 0.8);
    assertEquals_object(new b9.Color(0.1, 0.2, 0.3, 0.4), color1.mul(color2));

    color1.set(0.2, 0.4, 0.6, 0.8);
    assertEquals_object(new b9.Color(0.1, 0.2, 0.3, 0.4), color1.mul(0.5));

    color1.set(0.1, 0.2, 0.3, 0.4);
    assertEquals_object(new b9.Color(0.0, 0.0, 0.0, 0.0), color1.mul(-1.0));

    color1.set(0.1, 0.2, 0.3, 0.4);
    assertEquals_object(new b9.Color(1.0, 1.0, 1.0, 1.0), color1.mul(100.0));

    /* div */
    color1.set(0.2, 0.4, 0.6, 0.8);
    assertEquals_object(new b9.Color(0.1, 0.2, 0.3, 0.4), color1.div(2.0));

    color1.set(0.1, 0.2, 0.3, 0.4);
    assertEquals_object(new b9.Color(0.0, 0.0, 0.0, 0.0), color1.div(-1.0));

    color1.set(0.1, 0.2, 0.3, 0.4);
    assertEquals_object(new b9.Color(1.0, 1.0, 1.0, 1.0), color1.div(0.01));

    /* lerp */
    color1.set(0.2, 0.4, 0.6, 0.8);
    color2.set(0.4, 0.6, 0.8, 1.0);
    assertEquals_object(new b9.Color(0.2, 0.4, 0.6, 0.8), color1.lerp(color2, -1.0));

    color1.set(0.2, 0.4, 0.6, 0.8);
    color2.set(0.4, 0.6, 0.8, 1.0);
    assertEquals_object(new b9.Color(0.3, 0.5, 0.7, 0.9), color1.lerp(color2, 0.5));

    color1.set(0.2, 0.4, 0.6, 0.8);
    color2.set(0.4, 0.6, 0.8, 1.0);
    assertEquals_object(color2, color1.lerp(color2, 2.0));

    /* equals */
    color1.set(0.1, 0.2, 0.3, 0.4);
    color2.set(color1);
    assertTrue(color1.equals(color2));

    color2.set(0.0, 2.0, 3.0, 4.0);
    assertFalse(color1.equals(color2));

    color2.set(0.1, 0.0, 0.3, 0.4);
    assertFalse(color1.equals(color2));

    color2.set(0.1, 0.2, 0.0, 0.4);
    assertFalse(color1.equals(color2));

    color2.set(0.1, 0.2, 0.3, 0.0);
    assertFalse(color1.equals(color2));

    /* toString */
    assertEquals("(0, 0.25, 0.5, 1)", (new b9.Color(0.0, 0.25, 0.5, 1.0)).toString());
}
