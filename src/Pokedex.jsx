import Pokemon from './components/Pokemon.jsx'
import PokemonModal from './components/PokemonModal.jsx'
// import Search from './components/Search.jsx'
import { useState, useEffect } from 'react'

function Pokedex() {
  const [arrayPokemons, setArrayPokemons] = useState([])
  const [modal, setModal] = useState({})

  useEffect(() => {
    async function fetchPokemon() {
      let pokemons = []
      for (let i = 1; i < 21; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        const data = await response.json()
        pokemons.push(data)
      }
      setArrayPokemons([...pokemons])
    }
    fetchPokemon()
  }, [])

  function openModal(index) {
    setModal({ active: 'active', data: arrayPokemons[index] });
  }

  function closeModal() {
    setModal({})
  }

  return (
    <div className="pokedex">
      {/* <Search search={searchPokemon} /> */}
      {arrayPokemons.map((_, i) => {
        return <Pokemon click={openModal} index={i} key={arrayPokemons[i].name} data={arrayPokemons[i]} />
      })}
      <PokemonModal modal={modal} click={closeModal} />
    </div>
  )
}

export default Pokedex
