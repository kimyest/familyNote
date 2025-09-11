// 가족노트 홈페이지용 오디오 플레이어
console.log('FamilyAudioPlayer 스크립트 로드됨');

class FamilyAudioPlayer {
    constructor() {
        console.log('FamilyAudioPlayer 인스턴스 생성');
        this.audioElements = [];
        this.currentAudio = null;
        this.init();
    }

    init() {
        console.log('FamilyAudioPlayer init() 시작');
        
        // 페이지 로드 후 오디오 요소들을 찾아서 플레이어로 교체
        document.addEventListener('DOMContentLoaded', () => {
            console.log('DOMContentLoaded 이벤트 발생');
            this.replaceAudioElements();
        });
        
        // 추가로 1초 후에도 시도 (동적 로딩 대비)
        setTimeout(() => {
            console.log('1초 후 replaceAudioElements 실행');
            this.replaceAudioElements();
        }, 1000);
        
        // 3초 후에도 시도 (더 늦은 로딩 대비)
        setTimeout(() => {
            console.log('3초 후 replaceAudioElements 실행');
            this.replaceAudioElements();
        }, 3000);
        
        // "Untitled Attachment" 텍스트를 직접 찾아서 교체
        setTimeout(async () => {
            console.log('2초 후 replaceUntitledAttachments 실행');
            await this.replaceUntitledAttachments();
        }, 2000);
        
        // 5초 후에도 한 번 더 시도
        setTimeout(async () => {
            console.log('5초 후 replaceUntitledAttachments 재실행');
            await this.replaceUntitledAttachments();
        }, 5000);
    }

    async replaceAudioElements() {
        console.log('오디오 요소 교체 시작');
        
        // 더 광범위한 셀렉터로 오디오 요소 찾기
        const selectors = [
            '[data-type="audio/x-m4a"]',
            '.bZFPJ',
            '[data-testid="default-file-viewer"]',
            '[data-resource-hash]',
            '.kUq1e',
            'div:contains("Untitled Attachment")'
        ];
        
        let audioContainers = [];
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            console.log(`셀렉터 "${selector}"로 찾은 요소:`, elements.length);
            audioContainers = audioContainers.concat(Array.from(elements));
        });
        
        // 중복 제거
        audioContainers = [...new Set(audioContainers)];
        console.log('총 찾은 오디오 컨테이너:', audioContainers.length);
        
        // 모든 오디오 파일 찾기
        const allAudioFiles = await this.findAllAudioSources();
        console.log('찾은 모든 오디오 파일:', allAudioFiles);
        
        for (let i = 0; i < audioContainers.length; i++) {
            console.log(`오디오 컨테이너 ${i} 처리 중:`, audioContainers[i]);
            await this.createAudioPlayer(audioContainers[i], i, allAudioFiles);
        }

        // 기존 audio 태그들도 교체
        const existingAudios = document.querySelectorAll('audio');
        console.log('찾은 기존 오디오 태그:', existingAudios.length);
        for (let i = 0; i < existingAudios.length; i++) {
            console.log(`기존 오디오 ${i} 처리 중:`, existingAudios[i]);
            await this.createAudioPlayer(existingAudios[i], i, allAudioFiles);
        }
        
        console.log('오디오 요소 교체 완료');
    }
    
    async replaceUntitledAttachments() {
        console.log('Untitled Attachment 요소 찾기 시작');
        
        // 모든 오디오 파일 찾기
        const allAudioFiles = await this.findAllAudioSources();
        console.log('찾은 모든 오디오 파일:', allAudioFiles);
        
        // 더 직접적인 방법으로 "Untitled Attachment"가 포함된 요소 찾기
        const allElements = document.querySelectorAll('*');
        let attachmentIndex = 0;
        
        for (let element of allElements) {
            if (element.textContent && element.textContent.includes('Untitled Attachment')) {
                console.log('Untitled Attachment 포함 요소 찾음:', element);
                
                // 이 요소가 이미 교체되었는지 확인
                if (element.classList.contains('family-audio-player')) {
                    console.log('이미 교체된 요소, 건너뛰기');
                    continue;
                }
                
                // 부모 요소를 찾아서 교체
                let parentToReplace = element;
                
                // div나 span 같은 적절한 컨테이너 찾기
                while (parentToReplace && 
                       !['DIV', 'SPAN', 'P', 'SECTION'].includes(parentToReplace.tagName) &&
                       parentToReplace !== document.body) {
                    parentToReplace = parentToReplace.parentElement;
                }
                
                if (parentToReplace && parentToReplace !== document.body) {
                    console.log('교체할 부모 요소 찾음:', parentToReplace);
                    await this.createAudioPlayer(parentToReplace, attachmentIndex, allAudioFiles);
                    attachmentIndex++;
                }
            }
        }
        
        console.log('Untitled Attachment 교체 완료');
    }

    async createAudioPlayer(container, index, allAudioFiles = []) {
        console.log(`오디오 플레이어 생성 시작 - 인덱스: ${index}`);
        
        // 오디오 파일 경로 찾기
        let audioSrc = await this.findAudioSource(container);
        console.log('찾은 오디오 소스:', audioSrc);
        
        if (!audioSrc) {
            // 컨테이너 내부에서 오디오 소스 찾기
            const audioElement = container.querySelector('audio');
            if (audioElement) {
                audioSrc = audioElement.src;
                console.log('컨테이너 내부에서 찾은 오디오 소스:', audioSrc);
            }
        }

        if (!audioSrc && allAudioFiles.length > 0) {
            // 인덱스에 따라 오디오 파일 선택
            audioSrc = allAudioFiles[index] || allAudioFiles[0];
            console.log('인덱스로 선택한 오디오 소스:', audioSrc);
        }

        if (!audioSrc) {
            console.log('오디오 소스를 찾을 수 없습니다:', container);
            return;
        }

        // 새로운 오디오 플레이어 생성
        const playerContainer = document.createElement('div');
        playerContainer.className = 'family-audio-player';
        playerContainer.innerHTML = this.getAudioPlayerHTML(audioSrc, index, allAudioFiles);
        console.log('생성된 플레이어 HTML:', playerContainer.innerHTML);

        // 기존 컨테이너 교체
        if (container.parentNode) {
            container.parentNode.replaceChild(playerContainer, container);
            console.log('오디오 플레이어 교체 완료');
        } else {
            console.log('컨테이너의 부모 노드를 찾을 수 없습니다');
        }

        // 이벤트 리스너 추가
        this.addEventListeners(playerContainer, index, allAudioFiles);
        console.log('이벤트 리스너 추가 완료');
    }

    async findAudioSource(container) {
        console.log('오디오 소스 찾기 시작:', container);
        
        // data-resource-hash로 음성파일 찾기
        const resourceHash = container.getAttribute('data-resource-hash');
        console.log('리소스 해시:', resourceHash);
        
        if (resourceHash) {
            // 현재 페이지의 파일명에서 폴더명 추출
            const currentPath = window.location.pathname;
            const fileName = currentPath.split('/').pop().replace('.html', '');
            const folderName = fileName + ' files';
            console.log('폴더명:', folderName);
            
            // 폴더 내의 m4a 파일들을 시도해보기
            const possibleM4aFiles = [
                'Evernote 20170121 215227.m4a',
                'Evernote 20170316 190652.m4a',
                'Evernote 20180101 180233.m4a',
                'Evernote 20180101 180046.m4a',
                'Evernote 20180101 175537.m4a',
                'Evernote 20180101 175255.m4a',
                'Evernote 20180101 175020.m4a',
                'Evernote 20180101 174732.m4a',
                'Evernote 20180101 174440.m4a',
                'Evernote 20170115 215227.m4a',
                'Evernote 20170115 215228.m4a',
                'Evernote 20170115 215229.m4a'
            ];
            
            // 각 파일을 시도해보고 존재하는 파일 찾기
            for (const m4aFile of possibleM4aFiles) {
                const fullPath = `${folderName}/${m4aFile}`;
                console.log('파일 경로 시도:', fullPath);
                try {
                    const response = await fetch(fullPath, { method: 'HEAD' });
                    if (response.ok) {
                        console.log('파일 찾음:', fullPath);
                        return fullPath;
                    }
                } catch (error) {
                    console.log('파일 없음:', fullPath);
                    // 파일이 없으면 다음 파일 시도
                    continue;
                }
            }
            
            // 기본값으로 첫 번째 파일 반환
            const defaultPath = `${folderName}/${possibleM4aFiles[0]}`;
            console.log('기본 파일 경로 반환:', defaultPath);
            return defaultPath;
        }
        
        // 기존 방법들도 시도
        const possibleSources = [
            container.getAttribute('data-src'),
            container.getAttribute('src'),
            container.querySelector('[src*=".m4a"]')?.src,
            container.querySelector('[href*=".m4a"]')?.href
        ];

        const foundSource = possibleSources.find(src => src && src.includes('.m4a'));
        console.log('기존 방법으로 찾은 소스:', foundSource);
        return foundSource;
    }
    
    async findAllAudioSources(container) {
        console.log('모든 오디오 소스 찾기 시작:', container);
        
        // 현재 페이지의 파일명에서 폴더명 추출
        const currentPath = window.location.pathname;
        const fileName = currentPath.split('/').pop().replace('.html', '');
        const folderName = fileName + ' files';
        console.log('폴더명:', folderName);
        
        // 폴더 내의 m4a 파일들을 시도해보기
        const possibleM4aFiles = [
            'Evernote 20170103 214508.m4a',
            'Evernote 20170103 214740.m4a',
            'Evernote 20170121 215227.m4a',
            'Evernote 20170316 190652.m4a',
            'Evernote 20180101 180233.m4a',
            'Evernote 20180101 180046.m4a',
            'Evernote 20180101 175537.m4a',
            'Evernote 20180101 175255.m4a',
            'Evernote 20180101 175020.m4a',
            'Evernote 20180101 174732.m4a',
            'Evernote 20180101 174440.m4a',
            'Evernote 20170115 215227.m4a',
            'Evernote 20170115 215228.m4a',
            'Evernote 20170115 215229.m4a'
        ];
        
        const foundFiles = [];
        
        // 각 파일을 시도해보고 존재하는 파일 찾기
        for (const m4aFile of possibleM4aFiles) {
            const fullPath = `${folderName}/${m4aFile}`;
            console.log('파일 경로 시도:', fullPath);
            try {
                const response = await fetch(fullPath, { method: 'HEAD' });
                if (response.ok) {
                    console.log('파일 찾음:', fullPath);
                    foundFiles.push(fullPath);
                }
            } catch (error) {
                console.log('파일 없음:', fullPath);
                // 파일이 없으면 다음 파일 시도
                continue;
            }
        }
        
        console.log('찾은 모든 파일:', foundFiles);
        return foundFiles;
    }

    getAudioPlayerHTML(src, index, allAudioFiles = []) {
        const fileNumber = allAudioFiles.length > 1 ? ` (${index + 1}/${allAudioFiles.length})` : '';
        return `
            <div class="audio-player-container">
                <div class="audio-header">
                    <div class="audio-icon">🎵</div>
                    <div class="audio-title">음성 녹음${fileNumber}</div>
                    <div class="audio-duration" id="duration-${index}">--:--</div>
                </div>
                
                <div class="audio-controls">
                    <button class="play-pause-btn" id="play-pause-${index}">
                        <span class="play-icon">▶️</span>
                        <span class="pause-icon" style="display: none;">⏸️</span>
                    </button>
                    
                    <div class="progress-container">
                        <div class="progress-bar" id="progress-${index}">
                            <div class="progress-fill" id="progress-fill-${index}"></div>
                        </div>
                        <div class="time-display">
                            <span class="current-time" id="current-time-${index}">0:00</span>
                        </div>
                    </div>
                    
                    <button class="volume-btn" id="volume-${index}">
                        <span class="volume-icon">🔊</span>
                    </button>
                </div>
                
                <audio preload="metadata" id="audio-${index}" src="${src}"></audio>
            </div>
        `;
    }

    addEventListeners(container, index, allAudioFiles = []) {
        const audio = container.querySelector(`#audio-${index}`);
        const playPauseBtn = container.querySelector(`#play-pause-${index}`);
        const progressBar = container.querySelector(`#progress-${index}`);
        const progressFill = container.querySelector(`#progress-fill-${index}`);
        const currentTimeSpan = container.querySelector(`#current-time-${index}`);
        const durationSpan = container.querySelector(`#duration-${index}`);
        const volumeBtn = container.querySelector(`#volume-${index}`);

        if (!audio) return;

        // 재생/일시정지 버튼
        playPauseBtn.addEventListener('click', () => {
            this.togglePlayPause(audio, playPauseBtn, index);
        });

        // 진행률 바 클릭
        progressBar.addEventListener('click', (e) => {
            this.seekTo(audio, e, progressBar);
        });

        // 오디오 이벤트 리스너
        audio.addEventListener('loadedmetadata', () => {
            durationSpan.textContent = this.formatTime(audio.duration);
        });

        audio.addEventListener('timeupdate', () => {
            this.updateProgress(audio, progressFill, currentTimeSpan);
        });

        audio.addEventListener('ended', () => {
            this.resetPlayer(playPauseBtn, progressFill, currentTimeSpan);
        });

        // 볼륨 버튼
        volumeBtn.addEventListener('click', () => {
            this.toggleMute(audio, volumeBtn);
        });

        // 다른 오디오가 재생되면 현재 오디오 정지
        audio.addEventListener('play', () => {
            this.pauseOtherAudios(index);
        });
    }

    togglePlayPause(audio, button, index) {
        const playIcon = button.querySelector('.play-icon');
        const pauseIcon = button.querySelector('.pause-icon');

        if (audio.paused) {
            audio.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'inline';
        } else {
            audio.pause();
            playIcon.style.display = 'inline';
            pauseIcon.style.display = 'none';
        }
    }

    seekTo(audio, event, progressBar) {
        const rect = progressBar.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const percentage = clickX / rect.width;
        audio.currentTime = percentage * audio.duration;
    }

    updateProgress(audio, progressFill, currentTimeSpan) {
        const percentage = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = percentage + '%';
        currentTimeSpan.textContent = this.formatTime(audio.currentTime);
    }

    resetPlayer(button, progressFill, currentTimeSpan) {
        const playIcon = button.querySelector('.play-icon');
        const pauseIcon = button.querySelector('.pause-icon');
        
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
        progressFill.style.width = '0%';
        currentTimeSpan.textContent = '0:00';
    }

    toggleMute(audio, button) {
        const volumeIcon = button.querySelector('.volume-icon');
        
        if (audio.muted) {
            audio.muted = false;
            volumeIcon.textContent = '🔊';
        } else {
            audio.muted = true;
            volumeIcon.textContent = '🔇';
        }
    }

    pauseOtherAudios(currentIndex) {
        this.audioElements.forEach((audio, index) => {
            if (index !== currentIndex && !audio.paused) {
                audio.pause();
                const button = document.querySelector(`#play-pause-${index}`);
                if (button) {
                    const playIcon = button.querySelector('.play-icon');
                    const pauseIcon = button.querySelector('.pause-icon');
                    playIcon.style.display = 'inline';
                    pauseIcon.style.display = 'none';
                }
            }
        });
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
}

// 오디오 플레이어 초기화
new FamilyAudioPlayer();
