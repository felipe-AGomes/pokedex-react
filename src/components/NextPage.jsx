function NextPage({ click }) {
  return (
    <div className="next-page-box">
      <span>
        <button onClick={() => click('previus')}>Previus</button>
      </span>
      <span>
        <button onClick={() => click('next')}>Next</button>
      </span>
    </div>
  )
}

export default NextPage