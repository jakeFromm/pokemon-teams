const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
    const main = document.querySelector("main")
    
    const getTrainers = () => {
        fetch(TRAINERS_URL)
            .then(resp => resp.json())
            .then(trainers => renderTrainers(trainers))
    }

    const renderTrainers = (trainers) => {
        trainers.forEach(trainerObj => {
            renderTrainer(trainerObj)
        })
            
        
    }

    const renderTrainer = (trainerObj) => {
        const trainerCard = document.createElement("div")
        trainerCard.classList.add("card")
        trainerCard.dataset.id = trainerObj.id
        pokeList = document.createElement("ul")
        const pokeArray = trainerObj.pokemons
        trainerCard.innerHTML = `
           <button data-trainer-id="${trainerObj.id}">Add Pokemon</button>
        `
        pokeArray.forEach(pokemon => {
            const pokeLi = document.createElement("li")
            const pokeButton = document.createElement("button")
            pokeButton.classList.add("release")
            pokeButton.setAttribute("data-pokemon-id", pokemon.id)
            pokeButton.textContent = "Release"
            pokeLi.textContent = `
                ${pokemon.nickname} (${pokemon.species}) 
            `
            pokeLi.append(pokeButton) 
            pokeList.append(pokeLi)
            trainerCard.append(pokeList)
        })
        main.append(trainerCard)
    }

    getTrainers();
})

// const sampleCard = document.createElement("div")
    // sampleCard.innerHTML = `
    //     <div class="card" data-id="1"><p>Prince</p>
    //     <button data-trainer-id="1">Add Pokemon</button>
    //     <ul>
    //         <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
    //         <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
    //         <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
    //         <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
    //         <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
    //     </ul>
    //     </div>
    // `
