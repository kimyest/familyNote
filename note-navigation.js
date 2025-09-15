// 노트 네비게이션 스크립트
document.addEventListener('DOMContentLoaded', function() {
    // 각 가족 구성원의 노트 목록
    const noteLists = {
        'Daehyun': [
            '6 up.html', '오늘 난 재밌는 꿈을 꾸었다.html', '100D Drücker 20170316.html', '2018 평창동계올림픽 메달현황.html', 
            'Christbaum.html', 'Corona.html', 'Daumen Vergrößert.html', 'Der Räuber läuft los.html', 
            'Drache.html', 'Frühschwimmerprüfung.html', 'Hochzeitstag für Eltern.html', 'Löwebein.html', 
            'Meine Füsse waren in diesem Sommer.html', 'Musikschule Konzert.html', 'Regen Regen.html', 
            'Rudolf.html', 'Sachunterrichtquiz (Baden, Körper).html', 'Torte.html', 'Weihnachtsmann.html', 
            '가을방학이야기.html', '가족그림이야기 (대현).html', '감자칩 이야기.html', '개미의 위험.html', 
            '거북이와 오리.html', '거북이와 오징어.html', '걱정하지 말아요.html', '게임 식당주인 구하기.html', 
            '겨울방학이야기 2015.html', '경주김씨.html', '고양이의 생명.html', '공기의 세계.html', 
            '괜찮아.html', '구름 솜사탕.html', '그림  Osterkorb  2020.4.html', '그림  귀의 문이 열리다  2020.5.html', 
            '그림  봄 Frühling  2020.4.html', '그림  책표지 미운오리새끼  2020.5.html', '그림  파티  2020.5.html', 
            '그림 (1).html', '그림 Fensterblick  2020.5.html', '그림 Mystery Animal.html', '그림 Strand  2019.12.html', 
            '그림 연필이 귀에   2020.5.html', '그림 유령의밤.html', '그림 크렛쎄 화분 2020.5.1.html', 
            '그림 포켓몬 글루만다  2020.3.html', '그림 학용품.html', '그림.html', '그림우리가 사는 세상.html', 
            '꿀벌 멋쟁이의 모험.html', '나의 마법사 주문.html', '나의 특별한 가족.html', '나의 하루.html', 
            '나이팅게일.html', '내 사랑하는 아들이나 딸의 9살생일.html', '내가만든 표지판.html', '놀이.html', 
            '대현 그림 20160512.html', '대현 그림 기묘한 산타할아버지.html', '대현 발표(독일어).html', 
            '대현 연주 (체르니100 nr33).html', '대현 작사 작곡 찬양.html', '대현 학교 작품.html', 
            '대현그림 - 내가만든 로보트.html', '대현그림.html', '대현의 기도.html', '대현의 편지.html', 
            '대현이가 아빠에게 주는 선물.html', '대현이의 에너지보존법칙 실험증거.html', '대현작품.html', 
            '대현편지.html', '대현학교작품.html', '동물이 사는곳.html', '동생의 소중함.html', 
            '돼지고기의 소원.html', '따끈한 고구마.html', '마리오와 소닉 런던올림픽.html', '만화.html', 
            '무지개음식.html', '바다문어가족.html', '발명 빨래로봇.html', '발표.html', '배와 사과의 여행.html', 
            '복심 생화 편지 (대현).html', '봄방학이야기 2015.html', '사랑해요 엄마 (2015.4.24).html', 
            '세상이란.html', '소풍가는날.html', '소풍날.html', '손가락의 자화상.html', '스크로스 게임 2020.html', 
            '시원한 바다.html', '쑤까락과 뽀끄와 쩌까락.html', '쓸모없는 기계들.html', '씨앗은 자라서.html', 
            '아빠는 출장맨.html', '아빠별과 대현이별 이야기.html', '아프리카.html', '악당들.html', 
            '어버이날 선물 2016.html', '어버이날잔치 2015.html', '얼굴.html', '엑스파이져.html', 
            '여기는 새로운 세계.html', '우리의 사랑 축복.html', '원숭이 로리.html', '원숭이섬.html', 
            '월드컵 우승팀순위.html', '자전거 타는날.html', '작고 작은 세상.html', '전기밥솥의 삶.html', 
            '점핑점핑.html', '초능력 날개 고양이 실키.html', '탄산수 제품 아이디어 너펜스워터.html', 
            '태풍이 부는날.html', '푸른하늘.html', '프리미어12 한국야구우승.html', '하나님 좋아하시니.html', 
            '하나빼기일 경주.html', '한자.html', '행복한 대현이네 가족.html', '행복한 시간.html', 
            '행복해진 무지개.html', '[작곡] 하나님 감사합니다.html'
        ],
        'Juwon': [
            '그림 - 봄의 자연 (Frühling).html', 'AmongUs 전기자동차.html', 'Beschreibung über mich.html', 
            'Ode to Joy  피아노 연주.html', '(비행기) 피아노 연주.html', '똥.html', '발표.html', 
            '주원 글쓰기.html', '야옹이를 키운다.html', '산타할아버지.html', '먼지깨비이야기.html', 
            '주원 결혼선언.html', '주원책동물원에 케비가 놀러갔어요.html', '주원 결혼선언2.html'
        ],
        'Sanghoon': [
            '산.html', '이제야.html', '오스트리아.html', '독일.html', '프랑스.html', '스위스.html', 
            '이탈리아.html', '체코.html', '헝가리.html', '폴란드.html', '오스트리아2.html', '독일2.html'
        ],
        'Eunhye': [
            '꽃과 화병.html', 'Flower.html', 'Blumen.html', '꽃.html', '화분.html', '그림.html', 
            '그림2.html', '그림3.html', '독일어 공부.html', '독일어 단어.html', '독일어 문법.html'
        ]
    };

    // 현재 페이지의 파일명 추출
    const currentFile = window.location.pathname.split('/').pop();
    
    // 현재 가족 구성원 확인
    let currentFamily = '';
    if (window.location.pathname.includes('/Daehyun/')) {
        currentFamily = 'Daehyun';
    } else if (window.location.pathname.includes('/Juwon/')) {
        currentFamily = 'Juwon';
    } else if (window.location.pathname.includes('/Sanghoon/')) {
        currentFamily = 'Sanghoon';
    } else if (window.location.pathname.includes('/Eunhye/')) {
        currentFamily = 'Eunhye';
    }

    if (currentFamily && noteLists[currentFamily]) {
        const notes = noteLists[currentFamily];
        const currentIndex = notes.indexOf(currentFile);
        
        if (currentIndex !== -1) {
            // 네비게이션 버튼 생성
            const navContainer = document.createElement('div');
            navContainer.className = 'note-navigation';
            navContainer.style.cssText = `
                position: fixed;
                top: 50%;
                right: 20px;
                transform: translateY(-50%);
                z-index: 1000;
                display: flex;
                flex-direction: column;
                gap: 10px;
            `;

            // 이전 버튼
            if (currentIndex > 0) {
                const prevButton = document.createElement('a');
                prevButton.href = notes[currentIndex - 1];
                prevButton.innerHTML = '← 이전';
                prevButton.style.cssText = `
                    background: #007bff;
                    color: white;
                    padding: 10px 15px;
                    border-radius: 5px;
                    text-decoration: none;
                    font-size: 14px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                    transition: background 0.3s;
                `;
                prevButton.addEventListener('mouseenter', () => {
                    prevButton.style.background = '#0056b3';
                });
                prevButton.addEventListener('mouseleave', () => {
                    prevButton.style.background = '#007bff';
                });
                navContainer.appendChild(prevButton);
            }

            // 다음 버튼
            if (currentIndex < notes.length - 1) {
                const nextButton = document.createElement('a');
                nextButton.href = notes[currentIndex + 1];
                nextButton.innerHTML = '다음 →';
                nextButton.style.cssText = `
                    background: #28a745;
                    color: white;
                    padding: 10px 15px;
                    border-radius: 5px;
                    text-decoration: none;
                    font-size: 14px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                    transition: background 0.3s;
                `;
                nextButton.addEventListener('mouseenter', () => {
                    nextButton.style.background = '#1e7e34';
                });
                nextButton.addEventListener('mouseleave', () => {
                    nextButton.style.background = '#28a745';
                });
                navContainer.appendChild(nextButton);
            }

            // 페이지에 추가
            document.body.appendChild(navContainer);
        }
    }
});
