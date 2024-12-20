
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const bcrypt = require("bcrypt");
const { ObjectId } = require('mongodb');
const path = require('path');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');


let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    
    cb(null, Date.now() + '-' + file.originalname);
  },
});


function checkFileUpLoad(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Bạn chỉ được upload file ảnh"));
  }
  cb(null, true);
}


let upload = multer({ storage: storage, fileFilter: checkFileUpLoad });


const connectDb = require("../models/db");
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'screntime12@gmail.com',
    pass: 'cxgd hlre chto yjbz',
  },
});
const verificationCodesemail = {};
const generateVerificationCode = () => Math.floor(100000 + Math.random() * 900000).toString();

router.post("/users/send-code", async (req, res) => {
  const { Email } = req.body;

  if (!Email) {
    return res.status(400).json({ success: false, message: "Email là bắt buộc!" });
  }

  
  const db = await connectDb();
  const userCollection = db.collection("taikhoan");

  
  const existingUser = await userCollection.findOne({ Email });
  if (existingUser) {
    
    return res.status(400).json({ success: false, message: "Email đã tồn tại xin nhập Email khác!" });
  }

  const verificationCode = generateVerificationCode();

  try {
    verificationCodesemail[Email] = verificationCode;
    await transporter.sendMail({
      from: 'screntime12@gmail.com',
      to: Email, 
      subject: 'Mã xác nhận của bạn',
      html: `
     
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Xác Thực Tài Khoản</title>
    <style>
      /* Reset CSS */
      body,
      h1,
      h2,
      h3,
      p {
        margin: 0;
        padding: 0;
      }

      body {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f0f4f8;
        color: #333;
        line-height: 1.6;
        margin: 0;
        padding: 0;
      }

      .email-wrapper {
        width: 100%;
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      }

      .header {
        background: linear-gradient(135deg, #6a11cb, #2575fc);
        color: #ffffff;
        text-align: center;
        padding: 30px 20px;
      }

      .header h1 {
        margin: 0;
        font-size: 28px;
        font-weight: bold;
        letter-spacing: 1px;
      }

      .content {
        padding: 30px 20px;
        text-align: center;
      }

      .content p {
        font-size: 16px;
        margin-bottom: 20px;
        color: #555555;
      }

      .verification-code {
        display: inline-block;
        font-size: 32px;
        font-weight: bold;
        color: #6a11cb;
        background-color: #f0f4ff;
        padding: 10px 20px;
        border-radius: 8px;
        margin: 20px 0;
        letter-spacing: 3px;
      }

      .cta-button {
        display: inline-block;
        margin-top: 20px;
        text-decoration: none;
        background-color: #2575fc;
        color: #ffffff;
        padding: 12px 30px;
        font-size: 16px;
        font-weight: bold;
        border-radius: 50px;
        box-shadow: 0 4px 10px rgba(37, 117, 252, 0.3);
        transition: all 0.3s ease;
      }

      .cta-button:hover {
        background-color: #1a5fb4;
        transform: translateY(-3px);
      }

      .footer {
        background-color: #f9f9f9;
        padding: 15px 20px;
        text-align: center;
        color: #777;
        font-size: 12px;
      }

      .footer a {
        color: #6a11cb;
        text-decoration: none;
      }

      /* Responsive Design */
      @media (max-width: 600px) {
        .header h1 {
          font-size: 24px;
        }
        .content p {
          font-size: 14px;
        }
        .verification-code {
          font-size: 28px;
        }
      }
    </style>
  </head>
  <body>
    <div class="email-wrapper">
      <!-- Header -->
      <div class="header">
        <h1>Xác Thực Tài Khoản</h1>
      </div>

      <!-- Body Content -->
      <div class="content">
        <p>Xin chào bạn,</p>
        <p>
          Cảm ơn bạn đã đăng ký tài khoản! Để hoàn tất quá trình, vui lòng sử
          dụng mã xác nhận dưới đây:
        </p>

        <!-- Verification Code -->
        <div class="verification-code">${verificationCode}</div>

        <!-- CTA Button -->
       

        <p style="margin-top: 20px">
          Nếu bạn không yêu cầu hành động này, vui lòng bỏ qua email này.
        </p>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p>Trân trọng,</p>
        <p>Đội ngũ hỗ trợ của chúng tôi</p>
        <p>
          <a href="mailto:supportScreenTime@example.com">supportScreenTime@example.com</a> |
    
        </p>
      </div>
    </div>
  </body>
</html>
      `
    });


    res.json({ success: true, message: 'Mã xác nhận đã được gửi!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Có lỗi xảy ra khi gửi mã xác nhận!' });
  }
});


router.post("/users/verify-code", async (req, res) => {
  const { Email, verificationCode } = req.body;  

  if (!Email || !verificationCode) {
    return res.status(400).json({ success: false, message: "Email và mã xác nhận là bắt buộc!" });
  }

  try {
    const storedCode = verificationCodesemail[Email];  

    if (!storedCode || storedCode !== verificationCode) {
      return res.status(400).json({ success: false, message: "Mã xác nhận không đúng!" });
    }

    
    delete verificationCodesemail[Email];  

    res.json({ success: true, message: "Xác thực thành công!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Có lỗi xảy ra khi xác thực mã!" });
  }
});

router.post("/register", upload.single("Anh"), async (req, res) => {
  try {
    const db = await connectDb();
    const userCollection = db.collection("taikhoan");
    const { Email, MatKhau, SDT, TenDangNhap, Ten, NgaySinh, DiaChi, GioiTinh } = req.body;
    const imagePath = req.file ? req.file.path : null;
    const newId = (await userCollection.countDocuments()) + 1;
    const { v4: uuidv4 } = require('uuid');
    
    const existingUser = await userCollection.findOne({ Email });
    const User = await userCollection.findOne({ TenDangNhap });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });

      
    }
    if (User) {
      return res.status(400).json({ message: "Tên đăng nhập đã tồn tại" });

      
    }
    const hashPassword = await bcrypt.hash(MatKhau, 10);

    
    const newUser = {
      id: uuidv4(),
      userId: newId,
      Email,
      NgaySinh,
      DiaChi,
      GioiTinh,
      MatKhau: hashPassword,
      SDT,
      TenDangNhap,
      Ten,
      Anh: imagePath ? req.file.filename : null,
      IsAdmin: 1,
      IsLocked: false
    };

    
    const result = await userCollection.insertOne(newUser);
    if (result.insertedId) {
      return res.status(200).json({ message: "Đăng ký thành công" });
    } else {
      return res.status(500).json({ message: "Đăng ký thất bại" });
    }
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});

router.put("/updateUser/:id", async (req, res) => {
  try {
    const db = await connectDb();
    const userCollection = db.collection("taikhoan");
    const userId = req.params.id; 

    
    const { Ten, Email, DiaChi, SDT, NgaySinh } = req.body;

    
    const existingUser = await userCollection.findOne({ Email, id: { $ne: userId } });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    
    const updateUser = await userCollection.updateOne(
      { id: userId }, 
      {
        $set: {
          Ten,
          Email,
          DiaChi,
          SDT,
          NgaySinh,
          
        },
      }
    );

    if (updateUser.modifiedCount > 0) {
      return res.status(200).json({ message: "Cập nhật thành công" });
    } else {
      return res.status(400).json({ message: "Không có thay đổi nào" });
    }
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});

router.put('/updateprofilepicture/:id', upload.single("Anh"), async (req, res) => {
  try {
    const userId = req.params.id;
    const fileName = req.file ? req.file.filename : null; 

    const db = await connectDb(); 
    const userCollection = db.collection('taikhoan');

    
    if (!fileName) {
      return res.status(400).json({ message: 'Không có ảnh nào được tải lên.' });
    }

    
    await userCollection.updateOne(
      { id: userId },
      { $set: { Anh: fileName } } 
    );

    return res.status(200).json({ message: 'Cập nhật ảnh thành công!', image: fileName });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi!' });
  }
});

router.put("/updatepassword/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { oldPassword, newPassword } = req.body;

    
    const db = await connectDb();
    const userCollection = db.collection("taikhoan");

    
    const user = await userCollection.findOne({ id: userId });
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại.' });
    }

    
    if (!user.MatKhau) {
      return res.status(400).json({ message: 'Mật khẩu không hợp lệ.' });
    }

    console.log('Old Password:', oldPassword); 
    console.log('User Password Hash:', user.MatKhau); 

    
    const isMatch = await bcrypt.compare(oldPassword, user.MatKhau);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mật khẩu cũ không đúng.' });
    }

    
    const hashedPassword = await bcrypt.hash(newPassword, 10); 

    
    await userCollection.updateOne(
      { id: userId },
      { $set: { MatKhau: hashedPassword } } 
    );

    return res.status(200).json({ message: 'Đổi mật khẩu thành công.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình đổi mật khẩu.' });
  }
});


router.post("/login", async (req, res, next) => {
  const { usernameOrEmail, MatKhau } = req.body;

  try {
    const db = await connectDb();
    const userCollection = db.collection("taikhoan");

    
    const user = await userCollection.findOne({
      $or: [{ TenDangNhap: usernameOrEmail }, { Email: usernameOrEmail }],
    });

    if (!user) {
      return res.status(403).json({
        message: "Tài khoản không tồn tại, vui lòng kiểm tra email hoặc tên đăng nhập.",
      });
    }

    
    if (user.IsLocked) {
      return res.status(403).json({
        message: "Tài khoản của bạn đã bị khóa.",
      });
    }

    
    const isPasswordCorrect = await bcrypt.compare(MatKhau, user.MatKhau);
    if (!isPasswordCorrect) {
      return res.status(403).json({ message: "Mật khẩu không chính xác." });
    }

    
    const token = jwt.sign(
      {
        TenDangNhap: user.TenDangNhap,
        Email: user.Email,
        SDT: user.SDT,
        Ten: user.Ten,
        IsAdmin: user.IsAdmin,
      },
      process.env.JWT_SECRET || "secretkey" 
    );

    
    res.cookie("authToken", token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      maxAge: 365 * 24 * 60 * 60 * 1000, 
    });

    
    res.status(200).json({
      message: "Đăng nhập thành công",
      token,
      TenDangNhap: user.TenDangNhap,
      Email: user.Email,
      SDT: user.SDT,
      Ten: user.Ten,
      IsAdmin: user.IsAdmin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server, vui lòng thử lại." });
  }
});


router.get("/users", async (req, res, next) => {
  const db = await connectDb();
  const userCollection = db.collection("taikhoan");
  const users = await userCollection.find().toArray();
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.get("/users/:id", async (req, res, next) => {
  const db = await connectDb();
  const usersCollection = db.collection("taikhoan");
  let id = req.params.id;

  
  const users = await usersCollection.findOne({ _id: ObjectId(id) });
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});



router.get("/users", async (req, res, next) => {
  const db = await connectDb();
  const userCollection = db.collection("taikhoan");
  const users = await userCollection.find().toArray();
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.get("/users/:id", async (req, res, next) => {
  const db = await connectDb();
  const usersCollection = db.collection("taikhoan");
  let id = req.params.id;

  
  const users = await usersCollection.findOne({ _id: ObjectId(id) });
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});


router.get("/users/:id/Ten", async (req, res, next) => {
  const db = await connectDb();
  const userCollection = db.collection("taikhoan");
  let id = req.params.id;

  try {
    const user = await userCollection.findOne(
      { _id: ObjectId(id) }, 
      { projection: { Ten: 1 } } 
    );
    if (user) {
      res.status(200).json({ Ten: user.Ten });
    } else {
      res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server, vui lòng thử lại." });
  }
});


router.get('/detailuser', async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const bearerToken = token.split(' ')[1];
  jwt.verify(bearerToken, process.env.JWT_SECRET || "secretkey", async (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Token không hợp lệ" });
    }
    const db = await connectDb();
    const userCollection = db.collection('taikhoan');
    const userInfo = await userCollection.findOne({ Email: user.Email });
    if (userInfo) {
      res.status(200).json(userInfo);
    } else {
      res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
  });
});
module.exports = router;
const verificationCodes = {};

router.post("/forgot-password", async (req, res) => {
  const { Email } = req.body;

  try {
    const db = await connectDb();
    const userCollection = db.collection("taikhoan");

    
    const user = await userCollection.findOne({ Email });
    if (!user) {
      return res.status(400).json({ message: "Email không tồn tại trong hệ thống" });
    }

    
    const verificationCode = Math.floor(100000 + Math.random() * 999999); 

    
    verificationCodes[Email] = verificationCode;

    
    const mailOptions = {
      from: 'screntime12@gmail.com',
      to: Email,
      subject: 'Mã xác thực để đặt lại mật khẩu',
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px;">
            <h2 style="color: #4CAF50; text-align: center;">Đặt lại mật khẩu</h2>
            <p style="font-size: 16px; line-height: 1.6;">
              Chào bạn, <br><br>
              Để đảm bảo tính bảo mật, chúng tôi đã nhận được yêu cầu đặt lại mật khẩu của bạn. Vui lòng sử dụng mã xác thực dưới đây để hoàn tất quá trình đặt lại mật khẩu.
            </p>
            <h3 style="color: #4CAF50; text-align: center; font-size: 22px; font-weight: bold;">${verificationCode}</h3>
            <p style="font-size: 16px; line-height: 1.6;">
              <strong>Lưu ý:</strong> Mã xác thực này không chia sẽ ra bên ngoài. Nếu bạn không yêu cầu thay đổi mật khẩu, vui lòng bỏ qua email này.
            </p>
            <p style="font-size: 16px; line-height: 1.6;">
              Trân trọng,<br>
              Đội ngũ hỗ trợ khách hàng
            </p>
          </div>
        </div>
      `,
    };


    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Lỗi khi gửi email:', error);
        return res.status(500).json({ message: "Gửi email thất bại" });
      }

      console.log('Email đã được gửi:', info.response);
      return res.status(200).json({ message: "Mã xác thực đã được gửi tới email của bạn" }); 
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});

router.post("/verify-code", async (req, res) => {
  const { Email, verificationCode } = req.body;

  if (verificationCodes[Email] === Number(verificationCode)) {
    
    return res.status(200).json({ message: "Mã xác thực hợp lệ" });
  } else {
    return res.status(400).json({ message: "Mã xác thực không chính xác" });
  }
});


router.post("/reset-password", async (req, res) => {
  const { Email, newPassword } = req.body;

  try {
    const db = await connectDb();
    const userCollection = db.collection("taikhoan");

    
    const user = await userCollection.findOne({ Email });
    if (!user) {
      return res.status(400).json({ message: "Email không tồn tại trong hệ thống" });
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    
    await userCollection.updateOne(
      { Email },
      { $set: { MatKhau: hashedPassword } }
    );

    return res.status(200).json({ message: "Mật khẩu đã được thay đổi thành công" });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});
module.exports = router;