const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const indexRouter = require("./routes/index");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", indexRouter);

// MongoDB 연결 및 서버 실행
const startServer = async () => {
  const mongoURI = process.env.LOCAL_DB_ADDRESS;

  if (!mongoURI) {
    console.error("❌ LOCAL_DB_ADDRESS 환경변수가 설정되지 않았습니다.");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: "admin", // 인증이 필요한 경우 추가
    });
    console.log("✅ MongoDB 연결 성공");

    app.listen(PORT, () => {
      console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB 연결 실패:", error.message);
    process.exit(1); // 연결 실패 시 앱 종료 (선택)
  }
};

startServer();
