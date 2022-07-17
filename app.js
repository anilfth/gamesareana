const charactersList = document.getElementById("charactersList");
const searchBar = document.getElementById("searchBar");

let hpCharacters = [];
searchBar.addEventListener("keyup", (e) => {
  let searchString = e.target.value.toLowerCase();
  const filters = hpCharacters.filter((character) => {
    return character?.title?.toLowerCase().includes(searchString);
  });
  displayCharacters(filters);
});

const loadCharacters = async () => {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      hpCharacters = JSON.parse(this.responseText);
      console.log(hpCharacters);
      displayCharacters(hpCharacters);
    }
  };
  xmlhttp.open(
    "GET",
    "https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json",
    true
  );
  xmlhttp.send();
};

const displayCharacters = (characters) => {
  const htmlString = characters
    .map((character) => {
      return `
            <div class="character">
                <h2>Title:${character?.title}</h2>
                <br/>
                <p>Plateform: ${character?.plateform}</p>
                <br/>
                <p>Score:${character?.score}</p>
                <br/>
                <p>Editor:${character?.editors_choice}</p>
                <br/>
                <p>Genre:${character?.genre}</p>
                </div>
                `;
    })
    .join("");
  charactersList.innerHTML = htmlString;
};

loadCharacters();
