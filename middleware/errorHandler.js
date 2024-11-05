export const erroHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500
  if (statusCode === 400) {
    res.json({message: err.message })
  }
  if (statusCode === 401) {
    res.json({message: err.message })
  }
}