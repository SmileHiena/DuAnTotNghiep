
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Họ và tên không được bỏ trống'),
  address: Yup.string().required('Địa chỉ không được bỏ trống'),
  phone: Yup.string().required('Số điện thoại không được bỏ trống').matches(/^[0-9]+$/, "Số điện thoại không hợp lệ"),
  dob: Yup.date().required('Ngày sinh không được bỏ trống').nullable(),
  imageFile: Yup.mixed().required('Ảnh là bắt buộc'),
});

const AddCustomer = () => {
  const router = useRouter();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append('Ten', values.name);
    formData.append('DiaChi', values.address);
    formData.append('SDT', values.phone);
    formData.append('NgaySinh', values.dob);
    formData.append('avatar', values.imageFile); // Thêm ảnh vào form data

    const response = await fetch('http://localhost:3000/khachhang', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('Khách hàng đã được thêm thành công!');
      router.push('/page/khachhang'); // Chuyển hướng về trang danh sách khách hàng
    } else {
      alert('Đã có lỗi xảy ra khi thêm khách hàng.');
    }

    setSubmitting(false);
    resetForm();
  };

  return (
    <div className="app-content">
      <div className="app-title">
        <h1>Thêm Khách Hàng</h1>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <h3 className="tile-title">Tạo Mới Khách Hàng</h3>
            <div className="tile-body">
              <Formik
                initialValues={{ name: '', address: '', phone: '', dob: '', imageFile: null }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ setFieldValue, isSubmitting }) => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="customerName">Họ và Tên</label>
                      <Field
                        className="form-control"
                        id="customerName"
                        name="name"
                        type="text"
                      />
                      <ErrorMessage name="name" component="div" className="text-danger" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="customerAddress">Địa Chỉ</label>
                      <Field
                        className="form-control"
                        id="customerAddress"
                        name="address"
                        type="text"
                      />
                      <ErrorMessage name="address" component="div" className="text-danger" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="customerPhone">Số Điện Thoại</label>
                      <Field
                        className="form-control"
                        id="customerPhone"
                        name="phone"
                        type="tel"
                      />
                      <ErrorMessage name="phone" component="div" className="text-danger" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="customerDob">Ngày Sinh</label>
                      <Field
                        className="form-control"
                        id="customerDob"
                        name="dob"
                        type="date"
                      />
                      <ErrorMessage name="dob" component="div" className="text-danger" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="customerImage">Ảnh</label>
                      <input
                        className="form-control"
                        id="customerImage"
                        name="imageFile"
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                          setFieldValue("imageFile", event.currentTarget.files[0]);
                        }}
                      />
                      <ErrorMessage name="imageFile" component="div" className="text-danger" />
                    </div>
                    <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                      Lưu lại
                    </button>
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={() => router.push('/page/khachhang')}
                    >
                      Hủy bỏ
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
