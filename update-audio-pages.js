// 음성 파일이 포함된 HTML 페이지들을 업데이트하는 스크립트
const fs = require('fs');
const path = require('path');

// 음성 파일이 포함된 페이지 목록
const audioPages = [
    // 대현의 노트
    'Daehyun/[작곡] 하나님 감사합니다.html',
    'Daehyun/걱정하지 말아요.html',
    'Daehyun/대현 연주 (체르니100 nr33).html',
    'Daehyun/대현 발표(독일어).html',
    'Daehyun/꿀벌 멋쟁이의 모험.html',
    'Daehyun/작고 작은 세상.html',
    'Daehyun/푸른하늘.html',
    'Daehyun/동물이 사는곳.html',
    'Daehyun/발표.html',
    'Daehyun/나이팅게일.html',
    'Daehyun/소풍날.html',
    'Daehyun/아빠는 출장맨.html',
    'Daehyun/소풍가는날.html',
    'Daehyun/무지개음식.html',
    'Daehyun/태풍이 부는날.html',
    
    // 주원의 노트
    'Juwon/Ode to Joy  피아노 연주.html',
    'Juwon/(비행기) 피아노 연주.html',
    'Juwon/Beschreibung über mich.html',
    'Juwon/주원 결혼선언2.html',
    'Juwon/주원 결혼선언.html',
    'Juwon/주원책동물원에 케비가 놀러갔어요.html',
    'Juwon/먼지깨비이야기.html',
    'Juwon/주원 발표.html',
    'Juwon/산타할아버지.html',
    'Juwon/야옹이를 키운다.html',
    'Juwon/주원 글쓰기.html',
    'Juwon/발표.html',
    'Juwon/똥.html',
    
    // 상훈의 노트
    'Sanghoon/오스트리아.html'
];

function updateAudioPage(filePath) {
    try {
        console.log(`업데이트 중: ${filePath}`);
        
        // 파일 읽기
        let content = fs.readFileSync(filePath, 'utf8');
        
        // head 섹션에 스타일과 스크립트 추가
        const headInsert = `
    <link rel="stylesheet" href="../styles.css">
    <script src="../audio-player.js"></script>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
            margin: 0;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .back-to-home {
            display: inline-block;
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 25px;
            font-weight: bold;
            margin-bottom: 20px;
            transition: all 0.3s ease;
        }
        
        .back-to-home:hover {
            background: linear-gradient(45deg, #764ba2, #667eea);
            transform: scale(1.05);
            color: white;
        }
        
        .audio-section {
            margin: 30px 0;
            padding: 20px;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            border-radius: 15px;
            color: white;
            text-align: center;
        }
        
        .audio-section h3 {
            margin: 0 0 10px 0;
            font-size: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }
        
        .audio-section p {
            margin: 0;
            opacity: 0.9;
            font-size: 1rem;
        }
        
        /* 기존 에버노트 스타일 개선 */
        en-note.peso {
            background: transparent !important;
            padding: 0 !important;
        }
        
        img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            margin: 10px 0;
        }
    </style>`;
        
        // head 태그 안에 스타일과 스크립트 추가
        content = content.replace(
            /<\/head>/,
            headInsert + '\n  </head>'
        );
        
        // body 시작 부분에 컨테이너와 네비게이션 추가
        const bodyInsert = `
    <div class="container">
        <a href="../index.html" class="back-to-home">🏠 홈으로 돌아가기</a>
        
        <div class="audio-section">
            <h3>🎵 소리듣기 섹션</h3>
            <p>아래에서 음성 녹음을 재생할 수 있습니다</p>
        </div>
        
        <div class="content">`;
        
        content = content.replace(
            /<body[^>]*>/,
            '$&\n' + bodyInsert
        );
        
        // body 끝 부분에 컨테이너 닫기 추가
        content = content.replace(
            /<\/body>/,
            '        </div>\n    </div>\n  </body>'
        );
        
        // 파일 저장
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ 완료: ${filePath}`);
        
    } catch (error) {
        console.error(`❌ 오류 발생: ${filePath}`, error.message);
    }
}

// 모든 오디오 페이지 업데이트
console.log('🎵 음성 파일이 포함된 페이지들을 업데이트합니다...\n');

audioPages.forEach(page => {
    if (fs.existsSync(page)) {
        updateAudioPage(page);
    } else {
        console.log(`⚠️  파일을 찾을 수 없습니다: ${page}`);
    }
});

console.log('\n🎉 모든 오디오 페이지 업데이트가 완료되었습니다!');
console.log('\n📱 이제 모바일에서도 음성을 쉽게 들을 수 있습니다:');
console.log('   - 재생/일시정지 버튼');
console.log('   - 진행률 바 (클릭하여 원하는 위치로 이동)');
console.log('   - 볼륨 조절');
console.log('   - 시간 표시');
console.log('   - 반응형 디자인');
