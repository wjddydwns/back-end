const Ad = require("../models/Ad");

const adController = {};

// 광고 생성
adController.createAd = async (req, res) => {
    try {
        // 1. 프론트엔드에서 광고 URL(ad_path) 받기
        const { ad_path } = req.body;
        if (!ad_path) {
            return res.status(400).json({ status: "fail", error: "ad_path가 필요합니다." });
        }

        // 2. 광고 데이터 저장
        const ad = new Ad({ ad_path });
        await ad.save();

        // 3. 성공 응답
        res.status(200).json({ status: "success", message: "광고가 성공적으로 등록되었습니다.", ad });
    } catch (error) {
        res.status(400).json({ status: "fail", error: error.message });
    }
};

// 광고 조회
adController.getAd = async (req, res) => {
    try {
        // 1. 광고 ID 또는 특정 필터를 기반으로 광고 검색
        const { ad_path } = req.query; // 프론트엔드에서 query 파라미터로 보낼 경우 사용
        let ads;

        if (ad_path) {
            ads = await Ad.find({ ad_path });
        } else {
            ads = await Ad.find(); // 전체 광고 리스트 반환
        }

        if (!ads || ads.length === 0) {
            throw new Error("등록된 광고가 없습니다.");
        }

        // 2. 성공 응답
        res.status(200).json({ status: "success", message: "등록된 광고를 찾았습니다.", ads });
    } catch (error) {
        res.status(400).json({ status: "fail", error: error.message });
    }
};

module.exports = adController;
