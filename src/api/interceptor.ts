export function apiReqInterceptor() {
  const {fetch: originalFetch} = window

  window.fetch = async (...args) => {
    let [resource, config] = args

    // request interceptor here
    console.log(import.meta.env)

    resource = `https://youtube.googleapis.com/youtube/v3/${resource}&key=${
      import.meta.env.VITE_API_KEY
    }`

    const response = await originalFetch(resource, config)

    // response interceptor here

    return response
  }
}
