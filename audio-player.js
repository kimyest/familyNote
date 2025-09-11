// 가족노트 홈페이지용 오디오 플레이어
class FamilyAudioPlayer {
    constructor() {
        this.audioElements = [];
        this.currentAudio = null;
        this.init();
    }

    init() {
        // 페이지 로드 후 오디오 요소들을 찾아서 플레이어로 교체
        document.addEventListener('DOMContentLoaded', () => {
            this.replaceAudioElements();
        });
    }

    replaceAudioElements() {
        // 에버노트의 복잡한 오디오 구조를 찾아서 교체
        const audioContainers = document.querySelectorAll('[data-type="audio/x-m4a"], .bZFPJ, [data-testid="default-file-viewer"]');
        
        audioContainers.forEach((container, index) => {
            this.createAudioPlayer(container, index);
        });

        // 기존 audio 태그들도 교체
        const existingAudios = document.querySelectorAll('audio');
        existingAudios.forEach((audio, index) => {
            this.createAudioPlayer(audio, index);
        });
    }

    createAudioPlayer(container, index) {
        // 오디오 파일 경로 찾기
        let audioSrc = this.findAudioSource(container);
        
        if (!audioSrc) {
            // 컨테이너 내부에서 오디오 소스 찾기
            const audioElement = container.querySelector('audio');
            if (audioElement) {
                audioSrc = audioElement.src;
            }
        }

        if (!audioSrc) {
            console.log('오디오 소스를 찾을 수 없습니다:', container);
            return;
        }

        // 새로운 오디오 플레이어 생성
        const playerContainer = document.createElement('div');
        playerContainer.className = 'family-audio-player';
        playerContainer.innerHTML = this.getAudioPlayerHTML(audioSrc, index);

        // 기존 컨테이너 교체
        if (container.parentNode) {
            container.parentNode.replaceChild(playerContainer, container);
        }

        // 이벤트 리스너 추가
        this.addEventListeners(playerContainer, index);
    }

    findAudioSource(container) {
        // 다양한 방법으로 오디오 소스 찾기
        const possibleSources = [
            container.getAttribute('data-src'),
            container.getAttribute('src'),
            container.querySelector('[src*=".m4a"]')?.src,
            container.querySelector('[href*=".m4a"]')?.href
        ];

        return possibleSources.find(src => src && src.includes('.m4a'));
    }

    getAudioPlayerHTML(src, index) {
        return `
            <div class="audio-player-container">
                <div class="audio-header">
                    <div class="audio-icon">🎵</div>
                    <div class="audio-title">음성 녹음</div>
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

    addEventListeners(container, index) {
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
