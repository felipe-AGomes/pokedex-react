function Search({ search }) {
  return(
    <div className="search-box">
      <form onSubmit={search} >
        <input type="text" />
      </form>
    </div>
  )
}

export default Search