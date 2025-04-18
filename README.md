🧩 Back-End API 서버

Express.js로 구축된 백엔드 서버입니다. 프론트엔드(👉 front-end)와 함께 작동하며, 사용자 인증과 상품 관리를 위한 API를 제공합니다.

**데이터베이스 설계**
![image](https://github.com/user-attachments/assets/28c58291-0bf1-4c76-ad94-569b6f739007)

**POSTMAN**
![image](https://github.com/user-attachments/assets/c3d5fc14-fec1-4fb7-9127-77d08c498617)
![image](https://github.com/user-attachments/assets/029b5624-07ef-47ce-9e20-af2155bf9d97)
![image](https://github.com/user-attachments/assets/5e15f65e-108a-4302-86c7-34f436b0804e)

**MongoDB**
![image](https://github.com/user-attachments/assets/cf6c1b60-145b-486f-99d3-875507979a68)

🛠 기술 스택

기술	설명
서버 런타임
백엔드 프레임워크
NoSQL 데이터베이스
MongoDB ODM
사용자 인증
🔐 인증 구조

<sub>출처: Medium</sub>

회원가입 시 bcrypt로 비밀번호를 해싱하고, 로그인 시 JWT 토큰을 발급하여 인증 처리합니다.


📦 API 기능 흐름 예시
mermaid
복사
편집
sequenceDiagram
  participant Client
  participant API
  participant DB

  Client->>API: 로그인 요청 (이메일, 비밀번호)
  API->>DB: 사용자 정보 조회
  DB-->>API: 사용자 존재, 해시된 비밀번호
  API-->>Client: JWT 토큰 발급
