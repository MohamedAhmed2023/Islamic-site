//Surah

let SurahsContainer = document.querySelector(".surhasContainer");
getSurahs();
function getSurahs() {
  fetch("https://api.alquran.cloud/v1/meta")
    .then((response) => response.json())
    .then((data) => {
      let surahs = data.data.surahs.references;
      let numberOfSurahs = 114;
      SurahsContainer.innerHTML = "";
      for (let i = 0; i < numberOfSurahs; i++) {
        SurahsContainer.innerHTML += `
           <div class="surah">
               
               <p>${surahs[i].name} </p>
               
           </div>
       `;
      }
      let SurahsTitels = document.querySelectorAll(".surah");
      let popup = document.querySelector(".surah-popup"),
        AyatContainer = document.querySelector(".ayat");
      SurahsTitels.forEach((title, index) => {
        title.addEventListener("click", () => {
          fetch(`https://api.alquran.cloud/v1/surah/${index + 1}`)
            .then((response) => response.json())
            .then((data) => {
              AyatContainer.innerHTML = "";
              let Ayat = data.data.ayahs;
              Ayat.forEach((aya) => {
                popup.classList.add("active");
                AyatContainer.innerHTML += `
                   <p>(${aya.numberInSurah}) - ${aya.text}</p>
               `;
              });
            });
        });
      });
      let closePopup = document.querySelector(".close-popup");
      closePopup.addEventListener("click", () => {
        popup.classList.remove("active");
      });
    });
}

//PrayTime Api

let cards = document.querySelector(".cards");
getPrayTimes();
function getPrayTimes() {
  fetch(
    "https://api.aladhan.com/v1/timingsByCity/26-04-2023?city=cairo&country=egypt&method=8"
  )
    .then((response) => response.json())
    .then((data) => {
      let times = data.data.timings;
      cards.innerHTML = "";
      for (let time in times) {
        cards.innerHTML += `
       <div class="card">
           <div class="circle">
               <svg>
                   <Circle cx="100" cy = "100" r ="100"></Circle>
               </svg>
               <div class="praytime">${times[time]}</div>
           </div>
           <p>${time}</p>
       </div>
   `;
      }
    });
}
