function PokemonModal({ modal, click }) {
  const { active, data } = modal

  return (
    <div className={`modal${active === 'active' ? ' active' : ''}`}>
    <div className="header">Status</div>
    <div className="boxStatus">
      <div className="image">
        <img
          src={data && data.sprites.front_default}
          alt={data && data.name}
        />
        <h1>{data && data.name}</h1>
      </div>
      <div className="description">
        <p>Name: {data && data.name}</p>
        <p>Weight: {data && data.weight} Kg</p>
        <div className="list">
          <p className="title">Abilities: </p>
          <ul>
            {data && data.abilities.map((e) => {
              return <li key={e.ability.name}>{e.ability.name}</li>
            })}
          </ul>
        </div>
        <div className="list">
          <p className="title">Type:</p>  
          <ul>
          {data && data.types.map((e) => {
              return <li key={e.type.name}>{e.type.name}</li>
            })}
          </ul>
        </div>
      </div>
      <div className="button" onClick={click}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
  )
}

export default PokemonModal