 // jyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyffffffffffffffffffffffffffffffffff
  



 document.addEventListener("DOMContentLoaded", function () {
    // Timer Function Start
    function startTimer(duration, display) {
        let timer = duration,
            minutes,
            seconds;
        setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
  
            display.textContent = minutes + ":" + seconds;
  
            if (--timer < 0) {
                timer = 0;
            }
        }, 1000);
    }
  
    window.onload = function () {
        const countdownTime = 49 * 60 + 59; // 49:59 থেকে শুরু হবে
        const display = document.querySelector("#time-counter"); // যেখানে টাইমার দেখাবে
        startTimer(countdownTime, display);
    };
  
    const questions = [
        {
            number: "1-2",
            text: "피해를 주다 칭찬하다 존중하다 무시하다 피해를 주다 칭찬하다 존중하다",
            image: "alim.jpg",
            options: [
                { image: "1.jpg" }, // Option with image
                { audio: "qu1.wav" }, // Option with audio
                { audio: "qu1.wav" }, // Option with audio
                { text: "사전" }, // Option with text
            ],
            solved: false,
            selectedOption: null,
        },
        {
            number: "2",
            text: "피해를 주다 칭찬하다 존중하다 무시하다 피해를 주다 칭찬하다 존중하다",
            // image: "alim.jpg",
            options: [
                { image: "1.jpg" }, // Option with image
                { image: "1.jpg" }, // Option with image
                { image: "1.jpg" }, // Option with image
                { image: "1.jpg" }, // Option with image
                
            ],
            solved: false,
            selectedOption: null,
        },
        // Add more questions as needed
    ];
  
    let currentQuestionIndex = 0;
  
    function displayQuestion(index) {
        const question = questions[index];
        document.getElementById("question-number").textContent = question.number;
        document.getElementById("question-text").textContent = question.text;
  
        const smallImage = document.getElementById("question-img");
        const overlay = document.getElementById("image-overlay");
        const largeImage = document.getElementById("large-img");
        const closeButton = document.getElementById("close-btn");
  
        if (question.image) {
            smallImage.src = question.image;
            smallImage.style.display = "block";
        } else {
            smallImage.style.display = "none";
        }
  
        smallImage.addEventListener("click", function () {
            largeImage.src = smallImage.src;
            overlay.style.display = "flex";
        });
  
        closeButton.addEventListener("click", function () {
            overlay.style.display = "none";
        });
  
        overlay.addEventListener("click", function () {
            overlay.style.display = "none";
        });
  
        const optionsBox = document.getElementById("options-box");
        optionsBox.innerHTML = "";
  
        question.options.forEach((option, i) => {
            const optionDiv = document.createElement("div");
            optionDiv.className = "option";
  
            if (option.image) {
                optionDiv.innerHTML = `
                    <span class="option-number">${i + 1}</span>
                    <img src="${option.image}" alt="Option Image" class="option-media">
                    ${option.text ? `<span class="option-text">${option.text}</span>` : ''}
                `;
            } else if (option.audio) {
                optionDiv.innerHTML = `
                    <span class="option-number">${i + 1}</span>
                    <i class="fas fa-volume-up option-audio-icon" data-audio="${option.audio}" data-play-count="0" style="color: green;"></i>
                `;
            } else if (option.text) {
                optionDiv.innerHTML = `
                    <span class="option-number">${i + 1}</span>
                    <span class="option-text">${option.text}</span>
                `;
            }
  
            optionsBox.appendChild(optionDiv);
  
            if (question.selectedOption === i) {
                optionDiv.querySelector(".option-number").classList.add("active");
            }
  
            optionDiv.addEventListener("click", function () {
                document.querySelectorAll(".option-number").forEach(function (opt) {
                    opt.classList.remove("active");
                });
  
                this.querySelector(".option-number").classList.add("active");
                question.selectedOption = i;
                question.solved = true;
  
                updateStatus();
            });
        });
  
        const audioIcons = document.querySelectorAll(".option-audio-icon");
        audioIcons.forEach(icon => {
            let audioElement = null;
  
            icon.addEventListener("click", function () {
                let playCount = parseInt(this.dataset.playCount);
  
                if (playCount >= 1) {
                    return; // Already played twice, do nothing
                }
  
                if (!audioElement) {
                    audioElement = new Audio(this.dataset.audio);
  
                    audioElement.addEventListener("ended", function () {
                        playCount++;
                        icon.dataset.playCount = playCount;
  
                        icon.classList.remove("wave-animation");
                        icon.style.color = "black"; // Icon color turns black after playing twice
                        audioElement = null;
                    });
                }
  
                if (icon.classList.contains("fa-volume-up")) {
                    audioElement.play();
                    icon.classList.remove("fa-volume-up");
                    icon.classList.add("fa-volume-mute");
                    icon.classList.add("wave-animation");
                } else {
                    audioElement.pause();
                    icon.classList.remove("fa-volume-mute");
                    icon.classList.remove("wave-animation");
                    icon.classList.add("fa-volume-up");
                    audioElement = null;
                }
            });
        });
    }
  
    function updateStatus() {
        const solvedCount = questions.filter((q) => q.solved).length;
        const unsolvedCount = questions.length - solvedCount;
  
        document.getElementById("solved-link").textContent = `Solved Question: ${solvedCount}`;
        document.getElementById("unsolved-link").textContent = `Unsolved Question: ${unsolvedCount}`;
        document.getElementById("total-link").textContent = `Total Question: ${questions.length}`;
    }
  
    document.getElementById("previous-btn").addEventListener("click", function () {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayQuestion(currentQuestionIndex);
        }
    });
  
    document.getElementById("next-btn").addEventListener("click", function () {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion(currentQuestionIndex);
        }
    });
  
    displayQuestion(currentQuestionIndex);
    updateStatus();
  });
   