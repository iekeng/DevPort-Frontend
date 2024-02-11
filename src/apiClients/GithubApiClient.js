import axios from "axios";

class GithubApiClient {

  constructor (onError){
    this.error = onError;
    this.base_url = "https://api.github.com";
  }

  async request(options) {
    let response;
    try{
      response = await axios.get(this.base_url + options.url, {
        method: options.method,
        headers: {
          Authorization: 'Bearer: ' + localStorage.getItem('accessToken'),
        },
        ...options.headers,
      })
  } catch (error) {
    return {
      ok: false,
      status: 500,
      json: async () => { return {
        code: 500,
        message: 'Server is unresponsive',
        description: error.toString(),
        } }
      }
    }
    return {
      ok: response.ok,
      status: response.status,
      body: response.message ? response.message : response.data,
      };
    }    


  async get(url, options){
    this.request({method: GET, url, ...options})
  }

  logout(){
      localStorage.removeItem('accessToken');
  }

  isAuthenticated() {
      return localStorage.getItem('accessToken') !== null;
  }   
}