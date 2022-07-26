const quoteUrl = 'https://zenquotes.io/api/today'

async function getQuoteData(url) {
  const res = await fetch(url)
  let data = await res.json()
  console.log(data)
    
  return res.json()
}

export {
  getQuoteData
}