import axios from "axios";

export default class GithubApiClient {

  constructor (){
    this.base_url = "https://api.github.com";
  }

  async request(options) {
    let response;
    try{
      response = await axios({
        method: options.method,
        url: this.base_url + options.url, 
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
        ...options.headers,
      })
      return {
        data: response.data,
        statusText: response.statusText,
        code: response.code,
      }
  } catch (error){
    return {
      statusText: "BAD ERR",
      code: error.code,
      message: error.message
      }
    }
  }    

  async get(url, options){
    return this.request({method:'GET', url, ...options})
  }

  isAuthenticated(){
    return localStorage.getItem('accessToken') !== null;
  }  

  logout(){
    localStorage.removeItem('accessToken');
  } 
}