// 노트 파일명에서 날짜를 추출하고 표시하는 함수
class NoteDateExtractor {
    constructor() {
        this.datePatterns = [
            // 2020.5.1, 2020.3.15 등의 패턴 (가장 구체적)
            /(\d{4})\.(\d{1,2})\.(\d{1,2})/g,
            // 2020.5, 2020.4, 2019.12 등의 패턴
            /(\d{4})\.(\d{1,2})/g,
            // 2017.03.16 등의 패턴
            /(\d{4})\.(\d{2})\.(\d{2})/g,
            // 2060512 (2016년 5월 12일) 등의 패턴
            /20(\d{2})(\d{2})(\d{2})/g,
            // 2015.4.24 등의 패턴
            /(\d{4})\.(\d{1,2})\.(\d{1,2})/g,
            // 2015.4, 2015.3 등의 패턴
            /(\d{4})\.(\d{1,2})/g,
            // 2018, 2019, 2020 등의 연도만 있는 패턴
            /(20\d{2})/g,
            // 2015.4.24, 2016.5.12 등의 패턴 (더 넓은 범위)
            /(20\d{2}\.\d{1,2}\.\d{1,2})/g,
            // 2015.4, 2016.5 등의 패턴 (더 넓은 범위)
            /(20\d{2}\.\d{1,2})/g
        ];
        
        this.init();
    }

    init() {
        // DOM이 로드되면 실행
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.addDateBadges();
            });
        } else {
            // 이미 로드된 경우 즉시 실행
            this.addDateBadges();
        }
        
        // 추가로 약간의 지연 후에도 실행 (동적 콘텐츠를 위해)
        setTimeout(() => {
            this.addDateBadges();
        }, 1000);
    }

    extractDateFromTitle(title) {
        // 디버깅을 위한 로그
        console.log('Checking title:', title);
        
        // 모든 패턴을 시도
        for (let pattern of this.datePatterns) {
            const match = title.match(pattern);
            if (match) {
                const dateStr = match[0];
                console.log('Found date pattern:', dateStr);
                return this.formatDate(dateStr);
            }
        }
        
        // 추가 패턴들 시도
        // 공백이 있는 경우: "2020. 5", "2020. 5. 1"
        const spacedPatterns = [
            /(\d{4})\.\s*(\d{1,2})\.\s*(\d{1,2})/g,
            /(\d{4})\.\s*(\d{1,2})/g,
            /(20\d{2})/g
        ];
        
        for (let pattern of spacedPatterns) {
            const match = title.match(pattern);
            if (match) {
                const dateStr = match[0].replace(/\s+/g, '');
                console.log('Found spaced date pattern:', dateStr);
                return this.formatDate(dateStr);
            }
        }
        
        // 더 넓은 범위의 패턴들
        const broadPatterns = [
            // 2018, 2019, 2020 등의 연도
            /(20\d{2})/g,
            // 2015.4, 2016.5 등의 패턴
            /(20\d{2}\.\d{1,2})/g,
            // 2015.4.24, 2016.5.12 등의 패턴
            /(20\d{2}\.\d{1,2}\.\d{1,2})/g
        ];
        
        for (let pattern of broadPatterns) {
            const match = title.match(pattern);
            if (match) {
                const dateStr = match[0];
                console.log('Found broad date pattern:', dateStr);
                return this.formatDate(dateStr);
            }
        }
        
        console.log('No date found in:', title);
        return null;
    }

    formatDate(dateStr) {
        console.log('Formatting date:', dateStr);
        
        // 2020.5 -> 2020.05
        if (/^\d{4}\.\d{1,2}$/.test(dateStr)) {
            const [year, month] = dateStr.split('.');
            const formatted = `${year}.${month.padStart(2, '0')}`;
            console.log('Formatted as year.month:', formatted);
            return formatted;
        }
        
        // 2020.5.1 -> 2020.05.01
        if (/^\d{4}\.\d{1,2}\.\d{1,2}$/.test(dateStr)) {
            const [year, month, day] = dateStr.split('.');
            const formatted = `${year}.${month.padStart(2, '0')}.${day.padStart(2, '0')}`;
            console.log('Formatted as year.month.day:', formatted);
            return formatted;
        }
        
        // 2017.03.16 -> 2017.03.16
        if (/^\d{4}\.\d{2}\.\d{2}$/.test(dateStr)) {
            console.log('Already formatted:', dateStr);
            return dateStr;
        }
        
        // 2060512 -> 2016.05.12
        if (/^20\d{6}$/.test(dateStr)) {
            const year = '20' + dateStr.substring(2, 4);
            const month = dateStr.substring(4, 6);
            const day = dateStr.substring(6, 8);
            const formatted = `${year}.${month}.${day}`;
            console.log('Formatted from compact:', formatted);
            return formatted;
        }
        
        // 2018, 2019, 2020 등의 연도만 있는 경우
        if (/^20\d{2}$/.test(dateStr)) {
            console.log('Year only:', dateStr);
            return dateStr;
        }
        
        console.log('Returning as-is:', dateStr);
        return dateStr;
    }

    addDateBadges() {
        const noteItems = document.querySelectorAll('.note-item');
        console.log('Found note items:', noteItems.length);
        
        noteItems.forEach((item, index) => {
            const link = item.querySelector('a');
            if (link) {
                const title = link.textContent.trim();
                const href = link.getAttribute('href');
                console.log(`Processing item ${index + 1}:`, title, 'href:', href);
                
                // 1. 제목에서 날짜 추출 시도
                let date = this.extractDateFromTitle(title);
                
                // 2. 제목에서 날짜를 찾지 못한 경우, 파일명에서 추출 시도
                if (!date && href) {
                    const fileName = href.replace('.html', '');
                    date = this.extractDateFromTitle(fileName);
                    console.log('Trying filename:', fileName, 'found date:', date);
                }
                
                // 3. 여전히 날짜를 찾지 못한 경우, 실제 노트 파일에서 날짜 추출 시도
                if (!date && href) {
                    date = this.extractDateFromNoteFile(href);
                    console.log('Trying note file:', href, 'found date:', date);
                }
                
                if (date) {
                    // 이미 배지가 있는지 확인
                    const existingBadge = item.querySelector('.note-date-badge');
                    if (!existingBadge) {
                        const badge = document.createElement('div');
                        badge.className = 'note-date-badge';
                        badge.textContent = date;
                        item.appendChild(badge);
                        console.log('Added badge:', date);
                    } else {
                        console.log('Badge already exists:', existingBadge.textContent);
                    }
                } else {
                    console.log('No date found for:', title);
                }
            }
        });
        
        console.log('Date badge processing complete');
    }
    
    // 노트 파일에서 날짜를 추출하는 함수
    extractDateFromNoteFile(href) {
        // 현재 페이지의 메타데이터에서 날짜 찾기
        const createdMeta = document.querySelector('meta[itemprop="created"]');
        if (createdMeta) {
            const createdDate = createdMeta.getAttribute('content');
            if (createdDate) {
                // 20180101T170252Z 형식을 2018.01.01로 변환
                const dateMatch = createdDate.match(/^(\d{4})(\d{2})(\d{2})/);
                if (dateMatch) {
                    const [, year, month, day] = dateMatch;
                    return `${year}.${month}.${day}`;
                }
            }
        }
        
        // updated 메타데이터도 확인
        const updatedMeta = document.querySelector('meta[itemprop="updated"]');
        if (updatedMeta) {
            const updatedDate = updatedMeta.getAttribute('content');
            if (updatedDate) {
                const dateMatch = updatedDate.match(/^(\d{4})(\d{2})(\d{2})/);
                if (dateMatch) {
                    const [, year, month, day] = dateMatch;
                    return `${year}.${month}.${day}`;
                }
            }
        }
        
        return null;
    }
}

// 자동으로 초기화
new NoteDateExtractor();
