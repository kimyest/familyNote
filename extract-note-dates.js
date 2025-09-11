// 노트 파일들에서 날짜를 추출하고 인덱스 페이지에 추가하는 스크립트
class NoteDateExtractorAdvanced {
    constructor() {
        this.datePatterns = [
            // 2018.1.1, 2018.01.01 등의 패턴
            /(\d{4})\.(\d{1,2})\.(\d{1,2})/g,
            // 2018.1, 2018.01 등의 패턴
            /(\d{4})\.(\d{1,2})/g,
            // 2018, 2019, 2020 등의 연도
            /(20\d{2})/g,
            // 20180101T170252Z 형식
            /(\d{4})(\d{2})(\d{2})T/g
        ];
        
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.processAllNotes();
            });
        } else {
            this.processAllNotes();
        }
    }

    async processAllNotes() {
        const noteItems = document.querySelectorAll('.note-item');
        console.log('Processing', noteItems.length, 'note items');
        
        for (let item of noteItems) {
            const link = item.querySelector('a');
            if (link) {
                const href = link.getAttribute('href');
                const title = link.textContent.trim();
                
                // 이미 배지가 있는지 확인
                const existingBadge = item.querySelector('.note-date-badge');
                if (existingBadge) {
                    console.log('Badge already exists for:', title);
                    continue;
                }
                
                // 1. 제목에서 날짜 추출
                let date = this.extractDateFromText(title);
                
                // 2. 파일명에서 날짜 추출
                if (!date && href) {
                    const fileName = href.replace('.html', '');
                    date = this.extractDateFromText(fileName);
                }
                
                // 3. 실제 파일 내용에서 날짜 추출 (비동기)
                if (!date && href) {
                    try {
                        date = await this.extractDateFromFile(href);
                    } catch (error) {
                        console.log('Error reading file:', href, error);
                    }
                }
                
                if (date) {
                    this.addDateBadge(item, date);
                    console.log('Added date badge for:', title, '->', date);
                } else {
                    console.log('No date found for:', title);
                }
            }
        }
        
        console.log('Date extraction complete');
    }

    extractDateFromText(text) {
        for (let pattern of this.datePatterns) {
            const match = text.match(pattern);
            if (match) {
                const dateStr = match[0];
                return this.formatDate(dateStr);
            }
        }
        return null;
    }

    async extractDateFromFile(href) {
        try {
            const response = await fetch(href);
            const html = await response.text();
            
            // HTML에서 날짜 패턴 찾기
            for (let pattern of this.datePatterns) {
                const match = html.match(pattern);
                if (match) {
                    const dateStr = match[0];
                    return this.formatDate(dateStr);
                }
            }
            
            // 메타데이터에서 날짜 찾기
            const createdMatch = html.match(/<meta itemprop="created" content="(\d{4})(\d{2})(\d{2})/);
            if (createdMatch) {
                const [, year, month, day] = createdMatch;
                return `${year}.${month}.${day}`;
            }
            
            const updatedMatch = html.match(/<meta itemprop="updated" content="(\d{4})(\d{2})(\d{2})/);
            if (updatedMatch) {
                const [, year, month, day] = updatedMatch;
                return `${year}.${month}.${day}`;
            }
            
        } catch (error) {
            console.log('Error fetching file:', href, error);
        }
        
        return null;
    }

    formatDate(dateStr) {
        // 2018.1.1 -> 2018.01.01
        if (/^\d{4}\.\d{1,2}\.\d{1,2}$/.test(dateStr)) {
            const [year, month, day] = dateStr.split('.');
            return `${year}.${month.padStart(2, '0')}.${day.padStart(2, '0')}`;
        }
        
        // 2018.1 -> 2018.01
        if (/^\d{4}\.\d{1,2}$/.test(dateStr)) {
            const [year, month] = dateStr.split('.');
            return `${year}.${month.padStart(2, '0')}`;
        }
        
        // 20180101T -> 2018.01.01
        if (/^\d{4}\d{2}\d{2}T$/.test(dateStr)) {
            const year = dateStr.substring(0, 4);
            const month = dateStr.substring(4, 6);
            const day = dateStr.substring(6, 8);
            return `${year}.${month}.${day}`;
        }
        
        // 2018, 2019, 2020 등
        if (/^20\d{2}$/.test(dateStr)) {
            return dateStr;
        }
        
        return dateStr;
    }

    addDateBadge(item, date) {
        const badge = document.createElement('div');
        badge.className = 'note-date-badge';
        badge.textContent = date;
        item.appendChild(badge);
    }
}

// 자동으로 초기화
new NoteDateExtractorAdvanced();
