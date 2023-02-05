function Search({ search }) {
  return(
    <div className="search-box">
      <form onSubmit={search} >
        <input type="text" placeholder="Pokemon Name" />
      </form>
    </div>
  )
}

export default Search