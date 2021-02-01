class DrumKit {
    constructor() {
        this.pads = document.querySelectorAll(".pad");
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.currentKick = "./allSounds/kick-classic.wav";
        this.currentSnare = "./allSounds/snare-acoustic01.wav";
        this.currentHihat = "./allSounds/hihat-acoustic01.wav";
        this.playBtn = document.querySelector(".play");
        this.bpm = 150;
        this.index = 0;
        this.isPlaying = null;
        this.selects = document.querySelectorAll("select");
        this.muteBtns = document.querySelectorAll(".mute");
        this.tempoSlider = document.querySelector(".tempo-slider");
    }
    activePad() {
        this.classList.toggle("active"); //Add toggle event to each pad that calls this
    }
    repeat() {
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        // loop over pads
        activeBars.forEach((bar) => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            // Check if pad is active
            if (bar.classList.contains("active")) {
                // Check each sound
                if (bar.classList.contains("kick-pad")) {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if (bar.classList.contains("snare-pad")) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if (bar.classList.contains("hihat-pad")) {
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        });
        this.index++;
    }
    start() {
        const interval = (60 / this.bpm) * 1000;
        if (!this.isPlaying) {
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval);
        } else {
            // Clear interval
            clearInterval(this.isPlaying);
            this.isPlaying = null;
            this.index = 0;
        }
    }
    updateBtn() {
        if (this.isPlaying) {
            this.playBtn.innerHTML = "Stop";
            this.playBtn.classList.add("active");
        } else {
            this.playBtn.innerHTML = "Play";
            this.playBtn.classList.remove("active");
        }
    }
    changeSound(e) {
        const selectName = e.target.name;
        const selectValue = e.target.value;
        switch (selectName) {
            case "kick-select":
                this.kickAudio.src = selectValue;
            case "snare-select":
                this.snareAudio.src = selectValue;
            case "hihat-select":
                this.hihatAudio.src = selectValue;
        }
    }
    mute(e) {
        const muteIndex = e.target.getAttribute("data-track");
        if (e.target.classList.contains("active")) {
            e.target.classList.remove("active");
        } else {
            e.target.classList.add("active");
        }

        if (e.target.classList.contains("active")) {
            switch (muteIndex) {
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.snareAudio.volume = 0;
                    break;
                case "2":
                    this.hihatAudio.volume = 0;
                    break;
            }
        } else {
            switch (muteIndex) {
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                case "1":
                    this.snareAudio.volume = 1;
                    break;
                case "2":
                    this.hihatAudio.volume = 1;
                    break;
            }
        }
    }
    changeTempo(e) {
        this.bpm = e.target.value;
        const tempoText = document.querySelector(".tempo-num");
        tempoText.innerHTML = e.target.value;
    }
    updateTempo() {
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const playBtn = document.querySelector(".play");
        if (playBtn.classList.contains("active")) {
            this.start();
        }
    }
}

const drumKit = new DrumKit();

// Event listeners

drumKit.pads.forEach((pad) => {
    pad.addEventListener("click", drumKit.activePad);
    pad.addEventListener("animationend", function () {
        this.style.animation = "";
    });
});

drumKit.playBtn.addEventListener("click", () => {
    drumKit.start();
    drumKit.updateBtn();
});

drumKit.selects.forEach((select) => {
    select.addEventListener("change", function (e) {
        drumKit.changeSound(e);
    });
});

drumKit.muteBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
        drumKit.mute(e);
    });
});

drumKit.tempoSlider.addEventListener("input", function (e) {
    drumKit.changeTempo(e);
});

drumKit.tempoSlider.addEventListener("change", function (e) {
    drumKit.updateTempo(e);
});
