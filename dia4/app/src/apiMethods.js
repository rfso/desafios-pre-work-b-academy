const request = (url, options) =>
  fetch(url, options)
    .then(r => r.json())
    .catch(e => ({ error: true, message: e.message }))

const createRequest = (method) => (url, data) => request(url, {
  method,
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify(data)
})

const GET = (url) => request(url)
const POST = createRequest('POST')
const DELETE = createRequest('DELETE')

export { GET, POST, DELETE }
