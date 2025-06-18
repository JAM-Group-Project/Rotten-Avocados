import React, { useEffect } from 'react'

function Movie() {

    const getMovie = ()=>{
        fetch("https://api.themoviedb.org/3/discover/movie?api_key=6bff30742e46b5d624e5b0376351ba35")
        .then(res => res.json())
        .then(json => console.log(json))
    }

    useEffect(()=>{
        getMovie()
    }, [])

  return (
    <div>
        Movie
    </div>
  )
}

export default Movie