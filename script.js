document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("birthdayModal")
  const closeBtn = document.getElementById("closeModal")
  const confettiBtn = document.getElementById("launchConfetti")

  const audio = new Audio("discord.mp3")
  audio.volume = 0.7 

  const playAudio = () => {
    audio.play().catch((error) => {
      console.log("Audio autoplay prevented:", error)

      document.addEventListener(
        "click",
        () => {
          audio.play().catch((e) => console.log("Audio play failed:", e))
        },
        { once: true },
      )
    })
  }


  modal.style.display = "flex"
  playAudio()


  closeBtn.addEventListener("click", () => {
    modal.style.display = "none"
  })


  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none"
    }
  })

  function createConfetti() {
    const confetti = document.createElement("div")
    confetti.classList.add("confetti")

    const colors = ["gold", "bronze", "silver"]
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    confetti.classList.add(randomColor)

    confetti.style.left = Math.random() * window.innerWidth + "px"
    confetti.style.width = Math.random() * 8 + 8 + "px"
    confetti.style.height = confetti.style.width
    confetti.style.animationDuration = Math.random() * 4 + 3 + "s"
    confetti.style.animationDelay = Math.random() * 2 + "s"

    document.body.appendChild(confetti)


    setTimeout(() => {
      if (confetti.parentNode) {
        confetti.remove()
      }
    }, 7000)
  }

  function launchConfettiShow() {
    audio.currentTime = 0 
    audio.play().catch((e) => console.log("Confetti audio play failed:", e))

    for (let wave = 0; wave < 3; wave++) {
      setTimeout(() => {
        for (let i = 0; i < 50; i++) {
          setTimeout(createConfetti, i * 30)
        }
      }, wave * 1000)
    }

    confettiBtn.textContent = "Confettis Lancés ! 🎉"
    confettiBtn.style.background = "linear-gradient(145deg, #FFD700, #FFA500)"

    setTimeout(() => {
      confettiBtn.textContent = "Lancer les Confettis Royaux !"
      confettiBtn.style.background = "linear-gradient(145deg, #D2B48C, #A0522D)"
    }, 3000)
  }

  confettiBtn.addEventListener("click", launchConfettiShow)

  setTimeout(() => {
    for (let i = 0; i < 30; i++) {
      setTimeout(createConfetti, i * 100)
    }
  }, 500)
})
