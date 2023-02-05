import Pokemon from './components/Pokemon.jsx'
import PokemonModal from './components/PokemonModal.jsx'
import Search from './components/Search.jsx'
import NextPage from './components/NextPage.jsx'
import { useState, useEffect } from 'react'

function Pokedex() {
  const [arrayPokemons, setArrayPokemons] = useState([])
  const [pokemonDisplayed, setPokemonDisplayed] = useState(0)
  const [modal, setModal] = useState({})

  async function fetchPokemon(index = 1) {
    let pokemons = []
    let pokemonsToSearch = index + 100
    for (index; index < pokemonsToSearch; index++) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
      const data = await response.json()
      pokemons.push(data)
    }
    setPokemonDisplayed(pokemonsToSearch)
    setArrayPokemons([...pokemons])
  }
  
  useEffect(() => {
    fetchPokemon()
  }, [])

  function openModal(index) {
    setModal({ active: 'active', data: arrayPokemons[index] });
  }

  function closeModal() {
    setModal({})
  }

  function searchPokemon(event) {
    event.preventDefault()
    const pokemonName = event.target[0].value
    
    if (pokemonName === '') {
      fetchPokemon()
      return
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
      .then(response => response.json())
      .then(response => setArrayPokemons([response]))
  }

  function nexPage(event) {
    if (event === 'next') {
      fetchPokemon(pokemonDisplayed)
      return
    }
    fetchPokemon(pokemonDisplayed - 200)
  }

  return (
    <div className="pokedex">
      <Search search={searchPokemon} />
      {arrayPokemons.map((_, i) => {
        return <Pokemon click={openModal} index={i} key={arrayPokemons[i].name} data={arrayPokemons[i]} />
      })}
      <NextPage click={nexPage} />
      <PokemonModal modal={modal} click={closeModal} />
    </div>
  )
}

export default Pokedex
