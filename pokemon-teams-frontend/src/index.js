const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers/`
const POKEMONS_URL = `${BASE_URL}/pokemons/`

document.addEventListener("DOMContentLoaded", () => {
    const main = document.querySelector("main")
    
    const getTrainers = () => {
        fetch(TRAINERS_URL)
            .then(resp => resp.json())
            .then(renderTrainers)
    }

    const renderTrainers = trainers => {
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
            <p>${trainerObj.name}</p>
            <button class="add-pokemon" data-trainer-id="${trainerObj.id}">Add Pokemon</button>
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

    function clickHandler(){
        document.addEventListener("click", e => {
            if (e.target.matches(".release")) {
                const button = e.target
                const pokeLi = button.parentElement
                
                pokeId = button.getAttribute(["data-pokemon-id"])
                // const trainerId = pokeLi.parentElement.parentElement.dataset.id
                
                const options = {
                    method: "DELETE"
                }

                fetch(POKEMONS_URL + pokeId, options)
                    .then(resp => resp.json())
                    .then(_data => {
                        pokeLi.remove()
                    })
            } else if (e.target.matches(".add-pokemon")){
                const button = e.target
                const trainerId = button.parentElement.getAttribute(["data-id"])
                
                const options = {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"                    
                    },
                    body: JSON.stringify({trainer_id: trainerId})
                }
                fetch(POKEMONS_URL, options)
                    .then(resp => resp.json())
                    .then(pokemon => {
                        if (!pokemon.error) {
                            const pokeList = e.target.parentElement.querySelector("ul")
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
                        }
                    })
            }
        })
        
    }

    clickHandler();
    getTrainers();
})
