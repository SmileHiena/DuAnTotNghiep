
import './Register.css';

const Register = () => {
  return (
    <div className="registration-container">
      <form className="registration-form">
        <h2>Đăng ký</h2>
        <label>Họ và tên *</label>
        <input className='form-input' type="text" placeholder="Họ và tên" required />

        <label>Số điện thoại *</label>
        <input className='form-input' type="text" placeholder="Số điện thoại" required />

        <label>Tên đăng nhập *</label>
        <input className='form-input' type="text" placeholder="Tên đăng nhập" required />

        <label>Email *</label>
        <input className='form-input' type="email" placeholder="Email" required />

        <label>Mật khẩu *</label>
        <input className='form-input' type="password" placeholder="Mật khẩu" required />

        <label>Nhập lại mật khẩu *</label>
        <input className='form-input' type="password" placeholder="Nhập lại mật khẩu" required />

        <div className="checkbox">
          <input className='form-input' type="checkbox" />
          <label>Tôi đồng ý với điều khoản.</label>
        </div>

        <button className='regiter-button'type="submit">Đăng ký</button>

        <p className="login-link">Bạn đã có tài khoản? Đăng nhập ngay!</p>
      </form>
    </div>
  );
};

export default Register;
