import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { getQuoteData } from '../../services/quoteService'



const Quote = () => {
  const[quote, setQuote] = useState([])

  useEffect(() => {
    const fetchQuote = async () => {
      const quoteData = await getQuoteData()
      // setQuote(quoteData.results)
      console.log(quote)
    }
    fetchQuote()
  }, [])





  return (
    <Typography>My awesome quote</Typography>
  )
}

export default Quote