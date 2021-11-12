import React, { useState, useRef, useCallback } from 'react'
import { useHistory } from 'react-router-dom';
import Flashcard from "./Flashcard";
import "./Viewer.css";
import DeckSearch from './DeckSearch'

export default function Load() {

	const arrayOfCards = [
		{ FrontSide: "1", BackSide: "1B" },
		{ FrontSide: "2", BackSide: "2B" },
		{ FrontSide: "3", BackSide: "3B" },
		{ FrontSide: "4", BackSide: "4B" },
		{ FrontSide: "5", BackSide: "5B" },
		{ FrontSide: "6", BackSide: "6B" },
		{ FrontSide: "7", BackSide: "7B" },
		{ FrontSide: "8", BackSide: "8B" },
		{ FrontSide: "9", BackSide: "9B" },
		{ FrontSide: "10", BackSide: "10B" },
	  ];
	  
	//////////////////////////////////////////////Erik Test Code
	const [query, setQuery] = useState('')
	const [pageNumber, setPageNumber] = useState(1)

	const {
		decks,
		hasMore,
		loading,
		error
	} = DeckSearch(query, pageNumber)

	const observer = useRef()
    const lastDeckElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  function handleSearch(e) {
    setQuery(e.target.value)
    setPageNumber(1)
  }
    /////////////////////////////////////////////////////////////Erik End
	
	const history = useHistory();
	
	const viewButton = () => {
		history.push("/view/0");
	  };
	  const homeButton = () => {
		history.push("/");
	  };
	  const editButton = () => {
		history.push("/edit/0");
	  };
	  
	return (
		<div>
			Discover<br/>
			<div class ="buttons">
					<button onClick={viewButton}>View deck 0</button>
				</div>

				<div class ="buttons">
					<button onClick={homeButton}>Home</button>
				</div>

				<div class ="buttons">
					<button onClick={editButton}>Edit deck 0</button>
				</div>
	
				<div class="flash-grid">
					{arrayOfCards.map(fc => {
						return <div><Flashcard flashcard={fc} /></div>
					})}
				</div>
			)
		</div>
		
	)
}