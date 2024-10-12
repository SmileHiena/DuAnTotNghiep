import '../../../../public/styles/register.css';
import Link from 'next/link';

const Register = () => {
    return (
        <div className="registration-container">
            <div className='box-register'>
            <form className="registration-form">
                <h1>Đăng ký</h1>
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
                <label>
                        <input type="checkbox" />
                        Tôi đồng ý các điểu khoản 
                    </label>
                </div>

                <button className='regiter-button' type="submit">Đăng ký</button>

                <p className="login-link">Bạn đã có tài khoản? <spam className='link-login'>Đăng nhập ngay!</spam></p>

            </form>
        </div>
        </div>
    );
};

export default Register;