# 🏠 가족노트 홈페이지

에버노트에서 내보낸 가족 4명의 소중한 노트들을 웹사이트로 만든 프로젝트입니다.

## 📋 프로젝트 개요

이 프로젝트는 에버노트에서 내보낸 HTML 파일들을 활용하여 가족 구성원들의 노트를 아름다운 웹사이트로 구성한 것입니다.

### 👨‍👩‍👧‍👦 가족 구성원

- **👦 대현**: 창의적이고 상상력이 풍부한 작품과 일기 (100+ 노트)
- **👩 은혜**: 예술적 감성이 뛰어난 그림과 독일어 공부 (12 노트)
- **👨 상훈**: 깊이 있는 사고와 여행 경험을 담은 글 (24 노트)
- **👧 주원**: 귀엽고 발랄한 그림과 일상 이야기 (90+ 노트)

## 🚀 GitHub Pages로 배포하기

### 1단계: GitHub 저장소 생성
1. GitHub에서 새 저장소를 생성합니다
2. 저장소 이름을 `familyNote` 또는 원하는 이름으로 설정합니다
3. Public으로 설정하여 GitHub Pages를 사용할 수 있도록 합니다

### 2단계: 파일 업로드
1. 이 프로젝트의 모든 파일을 GitHub 저장소에 업로드합니다
2. 주요 파일들:
   - `index.html` - 메인 홈페이지
   - `styles.css` - 공통 스타일시트
   - `Daehyun/`, `Eunhye/`, `Sanghoon/`, `Juwon/` - 각 가족 구성원의 노트 폴더

### 3단계: GitHub Pages 활성화
1. GitHub 저장소의 **Settings** 탭으로 이동
2. 왼쪽 메뉴에서 **Pages** 클릭
3. **Source**에서 **Deploy from a branch** 선택
4. **Branch**에서 **main** 선택
5. **Save** 버튼 클릭

### 4단계: 웹사이트 접속
- 몇 분 후 `https://[사용자명].github.io/[저장소명]`으로 접속 가능
- 예: `https://yourusername.github.io/familyNote`

## 📁 프로젝트 구조

```
familyNote/
├── index.html              # 메인 홈페이지
├── styles.css              # 공통 스타일시트
├── README.md               # 프로젝트 설명서
├── Daehyun/                # 대현의 노트
│   ├── index.html          # 대현의 노트 목록
│   ├── Evernote_index.html # 원본 에버노트 인덱스
│   └── [노트 파일들...]
├── Eunhye/                 # 은혜의 노트
│   ├── index.html          # 은혜의 노트 목록
│   ├── Evernote_index.html # 원본 에버노트 인덱스
│   └── [노트 파일들...]
├── Sanghoon/               # 상훈의 노트
│   ├── index.html          # 상훈의 노트 목록
│   ├── Evernote_index.html # 원본 에버노트 인덱스
│   └── [노트 파일들...]
└── Juwon/                  # 주원의 노트
    ├── index.html          # 주원의 노트 목록
    ├── Evernote_index.html # 원본 에버노트 인덱스
    └── [노트 파일들...]
```

## 🎨 주요 기능

- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 기기에서 최적화
- **네비게이션**: 각 페이지에서 다른 가족 구성원의 노트로 쉽게 이동
- **아름다운 UI**: 그라데이션과 카드 디자인으로 현대적인 느낌
- **이미지 최적화**: 자동으로 반응형 이미지 표시
- **접근성**: 키보드 네비게이션과 스크린 리더 지원

## 🛠️ 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: Flexbox, Grid, 애니메이션
- **반응형 디자인**: 모바일 퍼스트 접근법

## 📱 브라우저 지원

- Chrome (권장)
- Firefox
- Safari
- Edge

## 🔧 커스터마이징

### 색상 변경
`styles.css` 파일에서 CSS 변수를 수정하여 색상을 변경할 수 있습니다:

```css
/* 주요 색상 */
--primary-color: #667eea;
--secondary-color: #764ba2;
--text-color: #333;
--background-color: #f5f7fa;
```

### 폰트 변경
`styles.css`의 `font-family` 속성을 수정하여 원하는 폰트를 사용할 수 있습니다.

## 📞 지원

문제가 있거나 개선 사항이 있다면 GitHub Issues를 통해 알려주세요.

## 📄 라이선스

이 프로젝트는 개인 사용을 위한 것입니다. 가족의 소중한 추억을 보존하고 공유하는 목적으로 만들어졌습니다.

---

💝 **Made with ❤️ for our family**
