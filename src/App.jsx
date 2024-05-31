import { useEffect, useState } from 'react'

function App() {
  const [id, setId] = useState("1")
  const [personagem, setPersonagem] = useState("")

  useEffect(() => {
    if (id) {
      buscarPersonagem(id)
    }
  }, [id])

  const buscarPersonagem = async (idDoPersonagem) => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${idDoPersonagem}`)
      const dados = await response.json()
      setPersonagem(dados)
    } catch (error) {
      console.error('Erro ao buscar personagem:', error)
    }
  }

  const buscarProximoPersonagem = () => {
    setId((prevId) => (Number(prevId) + 1).toString())
  }

  const buscarPersonagemAnterior = () => {
    setId((prevId) => (Number(prevId) - 1 > 0 ? (Number(prevId) - 1).toString() : prevId))
  }

  return (
    <div className="container text-center">
      <div className="container mt-5">
        <div className="row mb-3">
          <div className="col-12 col-md-6 offset-md-3">
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                placeholder="Digite o ID do personagem aqui"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <button className="btn btn-success btn-lg" onClick={() => buscarPersonagem(id)}>
                Buscar
              </button>
            </div>
          </div>
        </div>
        {personagem && (
          <div className="row">
            <div className="col-12 col-md-4"> 
              <img src={personagem.image} alt={personagem.name} className="img-fluid" width="600" height="500" />
            </div>
            <div className="col-12 col-md-8">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title" style={{ fontFamily: "-moz-initial" }}>{personagem.name}</h2>
                  <p className="card-text">Status: {personagem.status}</p>
                  <p className="card-text">Espécie: {personagem.species}</p>
                  <p className="card-text">Gênero: {personagem.gender}</p>
                  <p className="card-text">Origem: {personagem.origin.name}</p>
                  <p className="card-text">Localidade: {personagem.location.name}</p>
                  <p className="card-text">Criada em: {new Date(personagem.created).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {personagem && (
          <div className="mt-3">
            <div className="btn-group" role="group">
              <button className="btn btn-warning btn-lg me-4" onClick={buscarPersonagemAnterior}>Anterior</button>
              <button className="btn btn-success btn-lg me-4" onClick={buscarProximoPersonagem}>Próximo</button>
            </div>
          </div>
        )}

{/* verificando duas condições antes de mostrar o conteúdo para o usuario:personagem e episodio, carrega somente se tiver conteudo nelas. */}

        {personagem && personagem.episode.length > 0 && (
          <div className="mt-3">
            <h3 style={{ fontFamily: "-moz-initial", color: "moccasin" }}>Episódios:</h3>
            <ul className="list-group">
              {personagem.episode.map((episodio, indice) => (
                <li key={indice} className="list-group-item">
                  <a href={episodio} target="_blank" rel="noopener noreferrer">
                    {episodio}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default App