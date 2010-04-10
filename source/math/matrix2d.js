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


/*
const ckMat ckMat::ZERO(ckVec(0.0f, 0.0f, 0.0f), ckVec(0.0f, 0.0f, 0.0f), ckVec(0.0f, 0.0f, 0.0f), ckVec(0.0f, 0.0f, 0.0f));
const ckMat ckMat::UNIT(ckVec(1.0f, 0.0f, 0.0f), ckVec(0.0f, 1.0f, 0.0f), ckVec(0.0f, 0.0f, 1.0f), ckVec(0.0f, 0.0f, 0.0f));


ckMat::ckMat() {}


ckMat::ckMat(const ckVec& x_axis_, const ckVec& y_axis_, const ckVec& z_axis_, const ckVec& trans_)
{
    x_axis = x_axis_;
    y_axis = y_axis_;
    z_axis = z_axis_;
    trans = trans_;
}


void ckMat::set(const ckVec& x_axis_, const ckVec& y_axis_, const ckVec& z_axis_, const ckVec& trans_)
{
    x_axis = x_axis_;
    y_axis = y_axis_;
    z_axis = z_axis_;
    trans = trans_;
}


bool ckMat::isUnit() const
{
    return ( //
        x_axis.x == 1.0f && x_axis.y == 0.0f && x_axis.z == 0.0f && //
        y_axis.x == 0.0f && y_axis.y == 1.0f && y_axis.z == 0.0f && //
        z_axis.x == 0.0f && z_axis.y == 0.0f && z_axis.z == 1.0f && //
        trans.x == 0.0f && trans.y == 0.0f && trans.z == 0.0f);
}


ckMat ckMat::rotateX_r32(r32 deg) const
{
    r32 sin = ckMath::sin_r32(deg);
    r32 cos = ckMath::cos_r32(deg);

    return ckMat(ckVec::X_UNIT, ckVec(0.0f, cos, sin), ckVec(0.0f, -sin, cos), ckVec::ZERO).toGlobalFrom(*this);
}


ckMat ckMat::rotateY_r32(r32 deg) const
{
    r32 sin = ckMath::sin_r32(deg);
    r32 cos = ckMath::cos_r32(deg);

    return ckMat(ckVec(cos, 0.0f, -sin), ckVec::Y_UNIT, ckVec(sin, 0.0f, cos), ckVec::ZERO).toGlobalFrom(*this);
}


ckMat ckMat::rotateZ_r32(r32 deg) const
{
    r32 sin = ckMath::sin_r32(deg);
    r32 cos = ckMath::cos_r32(deg);

    return ckMat(ckVec(cos, sin, 0.0f), ckVec(-sin, cos, 0.0f), ckVec::Z_UNIT, ckVec::ZERO).toGlobalFrom(*this);
}


ckMat ckMat::rotateX_s32(s32 deg) const
{
    r32 sin = ckMath::sin_s32(deg);
    r32 cos = ckMath::cos_s32(deg);

    return ckMat(ckVec::X_UNIT, ckVec(0.0f, cos, sin), ckVec(0.0f, -sin, cos), ckVec::ZERO).toGlobalFrom(*this);
}


ckMat ckMat::rotateY_s32(s32 deg) const
{
    r32 sin = ckMath::sin_s32(deg);
    r32 cos = ckMath::cos_s32(deg);

    return ckMat(ckVec(cos, 0.0f, -sin), ckVec::Y_UNIT, ckVec(sin, 0.0f, cos), ckVec::ZERO).toGlobalFrom(*this);
}


ckMat ckMat::rotateZ_s32(s32 deg) const
{
    r32 sin = ckMath::sin_s32(deg);
    r32 cos = ckMath::cos_s32(deg);

    return ckMat(ckVec(cos, sin, 0.0f), ckVec(-sin, cos, 0.0f), ckVec::Z_UNIT, ckVec::ZERO).toGlobalFrom(*this);
}


ckMat ckMat::scale(r32 x_scale, r32 y_scale, r32 z_scale) const
{
    return ckMat(x_axis * x_scale, y_axis * y_scale, z_axis * z_scale, trans);
}


ckMat ckMat::translate(r32 x, r32 y, r32 z) const
{
    return ckMat(x_axis, y_axis, z_axis, x_axis * x + y_axis * y + z_axis * z + trans);
}


ckMat ckMat::slerp(const ckMat& to, r32 ratio) const
{
    return ckQuat::fromMat(*this).slerp(ckQuat::fromMat(to), ratio).toMat(trans.interp(to.trans, ratio));
}


ckMat ckMat::slerp_noTrans(const ckMat& to, r32 ratio) const
{
    return ckQuat::fromMat(*this).slerp(ckQuat::fromMat(to), ratio).toMat(ckVec::ZERO);
}


ckMat ckMat::orthonormal() const
{
    ckVec new_z_axis = z_axis.normalize();
    ckVec new_x_axis = y_axis.cross(z_axis).normalize();
    ckVec new_y_axis = new_z_axis.cross(new_x_axis);

    return ckMat(new_x_axis, new_y_axis, new_z_axis, trans);
}


ckMat ckMat::toLocalOf(const ckMat& mat) const
{
    r32 rsq_xa = 1.0f / mat.x_axis.sqLength();
    r32 rsq_ya = 1.0f / mat.y_axis.sqLength();
    r32 rsq_za = 1.0f / mat.z_axis.sqLength();
    ckVec vec = trans - mat.trans;

    return ckMat( //
        ckVec(x_axis.dot(mat.x_axis) * rsq_xa, x_axis.dot(mat.y_axis) * rsq_ya, x_axis.dot(mat.z_axis) * rsq_za), //
        ckVec(y_axis.dot(mat.x_axis) * rsq_xa, y_axis.dot(mat.y_axis) * rsq_ya, y_axis.dot(mat.z_axis) * rsq_za), //
        ckVec(z_axis.dot(mat.x_axis) * rsq_xa, z_axis.dot(mat.y_axis) * rsq_ya, z_axis.dot(mat.z_axis) * rsq_za), //
        ckVec(vec.dot(mat.x_axis) * rsq_xa, vec.dot(mat.y_axis) * rsq_ya, vec.dot(mat.z_axis) * rsq_za));
}


ckMat ckMat::toGlobalFrom(const ckMat& mat) const
{
    return ckMat( //
        x_axis.toGlobalFrom_noTrans(mat), //
        y_axis.toGlobalFrom_noTrans(mat), //
        z_axis.toGlobalFrom_noTrans(mat), //
        trans.toGlobalFrom(mat));
}


ckMat ckMat::toLocalOf_noTrans(const ckMat& mat) const
{
    r32 rsq_xa = 1.0f / mat.x_axis.sqLength();
    r32 rsq_ya = 1.0f / mat.y_axis.sqLength();
    r32 rsq_za = 1.0f / mat.z_axis.sqLength();

    return ckMat( //
        ckVec(x_axis.dot(mat.x_axis) * rsq_xa, x_axis.dot(mat.y_axis) * rsq_ya, x_axis.dot(mat.z_axis) * rsq_za), //
        ckVec(y_axis.dot(mat.x_axis) * rsq_xa, y_axis.dot(mat.y_axis) * rsq_ya, y_axis.dot(mat.z_axis) * rsq_za), //
        ckVec(z_axis.dot(mat.x_axis) * rsq_xa, z_axis.dot(mat.y_axis) * rsq_ya, z_axis.dot(mat.z_axis) * rsq_za), //
        ckVec::ZERO);
}


ckMat ckMat::toGlobalFrom_noTrans(const ckMat& mat) const
{
    return ckMat( //
        x_axis.toGlobalFrom_noTrans(mat), //
        y_axis.toGlobalFrom_noTrans(mat), //
        z_axis.toGlobalFrom_noTrans(mat), //
        ckVec::ZERO);
}


ckMat ckMat::lookAt(const ckVec& from, const ckVec& to, const ckVec& up)
{
    ckVec new_z_axis = (from - to).normalize();
    ckVec new_x_axis = up.cross(new_z_axis).normalize();
    ckVec new_y_axis = new_z_axis.cross(new_x_axis);

    return ckMat(new_x_axis, new_y_axis, new_z_axis, from);
}
*/
