function Pokemon({ data, index, click }) {
  return (
    <div className="pokemon" onClick={() => {click(index)}}>
      <img
        src={data && data.sprites.front_default}
        alt={data && data.name}
      />
      <h1>{data && data.name}</h1>
    </div>
  )
}

export default Pokemon