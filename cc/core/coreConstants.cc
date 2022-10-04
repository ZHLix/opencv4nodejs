#include "coreConstants.h"

using namespace cv;

void CoreConstants::Init(v8::Local<v8::Object> target) {
	FF_SET_CV_CONSTANT(target, NORM_INF);
	FF_SET_CV_CONSTANT(target, NORM_L1);
	FF_SET_CV_CONSTANT(target, NORM_L2);
	FF_SET_CV_CONSTANT(target, NORM_L2SQR);
	FF_SET_CV_CONSTANT(target, NORM_HAMMING);
	FF_SET_CV_CONSTANT(target, NORM_HAMMING2);
	FF_SET_CV_CONSTANT(target, NORM_TYPE_MASK);
	FF_SET_CV_CONSTANT(target, NORM_RELATIVE);
	FF_SET_CV_CONSTANT(target, NORM_MINMAX);

	FF_SET_CV_CONSTANT(target, KMEANS_RANDOM_CENTERS);
	FF_SET_CV_CONSTANT(target, KMEANS_PP_CENTERS);
	FF_SET_CV_CONSTANT(target, KMEANS_USE_INITIAL_LABELS);

	v8::Local<v8::Object> termCriteriaTypes = Nan::New<v8::Object>();
	FF_SET_JS_PROP(termCriteriaTypes, COUNT, Nan::New<v8::Integer>(cv::TermCriteria::COUNT));
	FF_SET_JS_PROP(termCriteriaTypes, MAX_ITER, Nan::New<v8::Integer>(cv::TermCriteria::MAX_ITER));
	FF_SET_JS_PROP(termCriteriaTypes, EPS, Nan::New<v8::Integer>(cv::TermCriteria::EPS));
	Nan::Set(target,FF::newString("termCriteria"), termCriteriaTypes);

	v8::Local<v8::Object> haarCascades = Nan::New<v8::Object>();
	FF_SET_CONST_WITH_VALUE(haarCascades, HAAR_EYE, FF::newString("./haarcascades/haarcascade_eye.xml"));
	FF_SET_CONST_WITH_VALUE(haarCascades, HAAR_EYE_TREE_EYEGLASSES, FF::newString("./haarcascades/haarcascade_eye_tree_eyeglasses.xml"));
	FF_SET_CONST_WITH_VALUE(haarCascades, HAAR_FRONTALCATFACE, FF::newString("./haarcascades/haarcascade_frontalcatface.xml"));
	FF_SET_CONST_WITH_VALUE(haarCascades, HAAR_FRONTALCATFACE_EXTENDED, FF::newString("./haarcascades/haarcascade_frontalcatface_extended.xml"));
	FF_SET_CONST_WITH_VALUE(haarCascades, HAAR_FRONTALFACE_ALT, FF::newString("./haarcascades/haarcascade_frontalface_alt.xml"));
	FF_SET_CONST_WITH_VALUE(haarCascades, HAAR_FRONTALFACE_ALT2, FF::newString("./haarcascades/haarcascade_frontalface_alt2.xml"));
	FF_SET_CONST_WITH_VALUE(haarCascades, HAAR_FRONTALFACE_ALT_TREE, FF::newString("./haarcascades/haarcascade_frontalface_alt_tree.xml"));
	FF_SET_CONST_WITH_VALUE(haarCascades, HAAR_FRONTALFACE_DEFAULT, FF::newString("./haarcascades/haarcascade_frontalface_default.xml"));
	FF_SET_CONST_WITH_VALUE(haarCascades, HAAR_FULLBODY, FF::newString("./haarcascades/haarcascade_fullbody.xml"));
	FF_SET_CONST_WITH_VALUE(haarCascades, HAAR_LEFTEYE_2SPLITS, FF::newString("./haarcascades/haarcascade_lefteye_2splits.xml"));
	FF_SET_CONST_WITH_VALUE(haarCascades, HAAR_LICENCE_PLATE_RUS_16STAGES, FF::newString("./haarcascades/haarcascade_licence_plate_rus_16stages.xml"));
	FF_SET_CONST_WITH_VALUE(haarCascades, HAAR_LOWERBODY, FF::newString("./haarcascades/haarcascade_lowerbody.xml"));
	FF_SET_CONST_WITH_VALUE(haarCascades, HAAR_PROFILEFACE, FF::newString("./haarcascades/haarcascade_profileface.xml"));
	FF_SET_CONST_WITH_VALUE(haarCascades, HAAR_RIGHTEYE_2SPLITS, FF::newString("./haarcascades/haarcascade_righteye_2splits.xml"));
	FF_SET_CONST_WITH_VALUE(haarCascades, HAAR_RUSSIAN_PLATE_NUMBER, FF::newString("./haarcascades/haarcascade_russian_plate_number.xml"));
	FF_SET_CONST_WITH_VALUE(haarCascades, HAAR_SMILE, FF::newString("./haarcascades/haarcascade_smile.xml"));
	FF_SET_CONST_WITH_VALUE(haarCascades, HAAR_UPPERBODY, FF::newString("./haarcascades/haarcascade_upperbody.xml"));
	Nan::Set(target,FF::newString("haarCascades"), haarCascades);

	v8::Local<v8::Object> lbpCascades = Nan::New<v8::Object>();
	FF_SET_CONST_WITH_VALUE(lbpCascades, LBP_FRONTALCATFACE, FF::newString("./lbpcascades/lbpcascade_frontalcatface.xml"));
	FF_SET_CONST_WITH_VALUE(lbpCascades, LBP_FRONTALFACE, FF::newString("./lbpcascades/lbpcascade_frontalface.xml"));
	FF_SET_CONST_WITH_VALUE(lbpCascades, LBP_FRONTALFACE_IMPROVED, FF::newString("./lbpcascades/lbpcascade_frontalface_improved.xml"));
	FF_SET_CONST_WITH_VALUE(lbpCascades, LBP_PROFILEFACE, FF::newString("./lbpcascades/lbpcascade_profileface.xml"));
	FF_SET_CONST_WITH_VALUE(lbpCascades, LBP_SILVERWARE, FF::newString("./lbpcascades/lbpcascade_silverware.xml"));
	Nan::Set(target,FF::newString("lbpCascades"), lbpCascades);

	FF_SET_CV_CONSTANT(target, REDUCE_SUM);
	FF_SET_CV_CONSTANT(target, REDUCE_AVG);
	FF_SET_CV_CONSTANT(target, REDUCE_MAX);
	FF_SET_CV_CONSTANT(target, REDUCE_MIN);

#if CV_VERSION_GREATER_EQUAL(3, 2, 0)
	FF_SET_CV_CONSTANT(target, ROTATE_90_CLOCKWISE);
	FF_SET_CV_CONSTANT(target, ROTATE_180);
	FF_SET_CV_CONSTANT(target, ROTATE_90_COUNTERCLOCKWISE);
#endif

	FF_SET_CV_CONSTANT(target, DECOMP_LU);
	FF_SET_CV_CONSTANT(target, DECOMP_CHOLESKY);
	FF_SET_CV_CONSTANT(target, DECOMP_EIG);
	FF_SET_CV_CONSTANT(target, DECOMP_SVD);
	FF_SET_CV_CONSTANT(target, DECOMP_QR);
	FF_SET_CV_CONSTANT(target, DECOMP_NORMAL);

	FF_SET_CV_CONSTANT(target, BORDER_CONSTANT);
	FF_SET_CV_CONSTANT(target, BORDER_REPLICATE);
	FF_SET_CV_CONSTANT(target, BORDER_REFLECT);
	FF_SET_CV_CONSTANT(target, BORDER_WRAP);
	FF_SET_CV_CONSTANT(target, BORDER_REFLECT_101);
	FF_SET_CV_CONSTANT(target, BORDER_TRANSPARENT);
	FF_SET_CV_CONSTANT(target, BORDER_ISOLATED);
	FF_SET_CV_CONSTANT(target, BORDER_DEFAULT);
}
