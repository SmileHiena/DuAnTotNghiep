'use client';
import Head from 'next/head';
import Image from 'next/image';

const NhanVien = () => {
  return (
    <main className="app-content">
      <Head>
        <title>Danh sách nhân viên</title>
      </Head>
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li className="breadcrumb-item active"><a href="#"><b>Danh sách nhân viên</b></a></li>
        </ul>
        <div id="clock"></div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div className="tile-body">
              <div className="row element-button">
                <div className="col-sm-2">
                  <a className="btn btn-add btn-sm" href="/form-add-nhan-vien" title="Thêm">
                    <i className="fas fa-plus"></i> Tạo mới nhân viên
                  </a>
                </div>

                <div className="col-sm-2">
                  <a className="btn btn-delete btn-sm print-file js-textareacopybtn" type="button" title="Sao chép">
                    <i className="fas fa-copy"></i> Sao chép
                  </a>
                </div>
                <div className="col-sm-2">
                  <a className="btn btn-excel btn-sm" href="" title="In">
                    <i className="fas fa-file-excel"></i> Xuất Excel
                  </a>
                </div>

              </div>
              <table className="table table-hover table-bordered js-copytextarea" cellPadding="0" cellSpacing="0" border="0" id="sampleTable">
                <thead>
                  <tr>
                    <th width="10"><input type="checkbox" id="all" /></th>
                    <th>ID nhân viên</th>
                    <th width="150">Họ và tên</th>
                    <th width="20">Ảnh thẻ</th>
                    <th width="300">Địa chỉ</th>
                    <th>Ngày sinh</th>
                    <th>Giới tính</th>
                    <th>SĐT</th>
                    <th>Chức vụ</th>
                    <th width="100">Tính năng</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td width="10"><input type="checkbox" name="check1" value="1" /></td>
                    <td>#CD12837</td>
                    <td>Hồ Thị Thanh Ngân</td>
                    <td><img class="img-card-person" src="/img-anhthe/2.jpg" alt=""/></td>
                    <td>155-157 Trần Quốc Thảo, Quận 3, Hồ Chí Minh</td>
                    <td>12/02/1999</td>
                    <td>Nữ</td>
                    <td>0926737168</td>
                    <td>Bán hàng</td>
                    <td className="table-td-center">
                      <button className="btn btn-primary btn-sm trash" type="button" title="Xóa" >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                      <button className="btn btn-primary btn-sm edit" type="button" title="Sửa" data-toggle="modal" data-target="#ModalUP">
                        <i className="fas fa-edit"></i>
                      </button>
                    </td>
                  </tr>
                  {/* nhan vien */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NhanVien;
