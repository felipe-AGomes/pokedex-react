function Pokemon({ data, index, click }) {
  return (
    <div className="pokemon" onClick={() => {click(index)}}>
      <img
        src={data.name && data.sprites.front_default}
        alt={data.name && data.name}
      />
      <h1>{data.name && data.name}</h1>
    </div>
  )
}

export default Pokemon