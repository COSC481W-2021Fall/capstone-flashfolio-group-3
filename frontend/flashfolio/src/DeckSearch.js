import { useEffect, useState } from 'react'
import axios from 'axios'

export default function DeckSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true)
  const [decks, setDecks] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setDecks([])
  }, [query])

  useEffect(() => {
    setLoading(true)
    axios({
      method: 'GET',
      url: 'http://openlibrary.org/search.json',
      params: { q: query, page: pageNumber },
    }).then(res => {
      setDecks(prevDecks => {
        return [...new Set([...prevDecks, ...res.data.docs.map(b => b.title)])]
      })
      setHasMore(res.data.docs.length > 0)
      setLoading(false)
    })
  }, [query, pageNumber])

  return { loading, decks, hasMore }
}