const Home1 = () => {

  
    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="login100-pic js-tilt" data-tilt>
              <img src="images/team.jpg" alt="IMG" />
            </div>
            {/* <!--=====TIÊU ĐỀ======--> */}
            <form className="login100-form validate-form">
              <span className="login100-form-title">
                <b>ĐĂNG NHẬP HỆ THỐNG POS</b>
              </span>
              {/* <!--=====FORM INPUT TÀI KHOẢN VÀ PASSWORD======--> */}
              <div className="wrap-input100 validate-input">
                <input
                  className="input100"
                  type="text"
                  placeholder="Tài khoản quản trị"
                  name="username"
                  id="username"
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="bx bx-user"></i>
                </span>
              </div>
              <div className="wrap-input100 validate-input">
                <input
                  autocomplete="off"
                  className="input100"
                  type="password"
                  placeholder="Mật khẩu"
                  name="current-password"
                  id="password-field"
                />
                <span
                  toggle="#password-field"
                  className="bx fa-fw bx-hide field-icon click-eye"
                ></span>
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="bx bx-key"></i>
                </span>
              </div>
  
            
              {/* <!--=====LINK TÌM MẬT KHẨU======--> */}
              <div className="text-right p-t-12">
                <a className="txt2" href="/forgot.html">
                  Bạn quên mật khẩu?
                </a>
              </div>
            </form>
            {/* <!--=====FOOTER======--> */}
            <div className="text-center p-t-70 txt2">
              Phần mềm quản lý bán hàng <i className="far fa-copyright" aria-hidden="true"></i>
              <a className="txt2" href="https://www.facebook.com/truongvo.vd1503/">
                Code bởi Trường
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Home1;
  