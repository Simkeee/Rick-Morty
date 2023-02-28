
const selectedCharacterId = localStorage.getItem('idN');
console.log(selectedCharacterId);


fetch(`https://rickandmortyapi.com/api/character/${selectedCharacterId}`)
  .then(response => response.json())
  .then(character => {
  
    const characterImageElement = document.getElementById('characterImage');
    characterImageElement.src =character.image;
    characterImageElement.alt = character.name;


    const characterNameElement = document.getElementById('characterName');
    characterNameElement.textContent = character.name;

    const characterStatusElement = document.getElementById('characterStatus');
    characterStatusElement.textContent ='*Status: '  + character.status;

    const characterSpeciesElement = document.getElementById('characterSpecies');
    characterSpeciesElement.textContent ='*Species: '  + character.species;

    const characterTypeElement = document.getElementById('characterType');
    characterTypeElement.textContent ='*Type: '  + character.type ? character.type : 'N/A';

    const characterGenderElement = document.getElementById('characterGender');
    characterGenderElement.textContent = '*Gender: '  + character.gender;

    const characterOriginElement = document.getElementById('characterOrigin');
    characterOriginElement.textContent ='*Orign: '  + character.origin.name;

    const characterLocationElement = document.getElementById('characterLocation');
    characterLocationElement.textContent ='*Location: '  + character.location.name;
  })
  .catch(error => console.error(error));