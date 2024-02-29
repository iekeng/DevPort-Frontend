import axios from "axios";

export default class DevPortApiClient{
  
  constructor(){
    // this.onError = onError;
    this.base_url = "http://localhost:4000";
  }

  async request(options) {
    let query = new URLSearchParams(options.query || {}).toString()
    
    if (query !== ''){
      query = '?' + query;
    } 

    let response;

    try {
      response = await axios({
      method: options.method,
      url: this.base_url + options.url + query,
      data: options.body ? JSON.stringify(options.body) : null,
      headers: {
        'Content-Type': 'application/json',
      }
    })
      return {
        data: response.data,
        statusText: response.statusText,
        code: response.code,
      }
    } catch (error) {    
      return {
        statusText: "BAD ERR",
        code: error.code,
        message: error.message
      }
    }
  }

  async get(url, query, options){
    return this.request({method:'GET', url, query, ...options })
  }

  async post(url, body, options){
    return this.request({method:'POST', url, body, ...options })
  }

  async put(url, body, options){
    return this.request({method:'PUT', url, body, ...options })
  }

  async del(url, body, query, options){
    return this.request({method:'DELETE', url, query, ...options })
  }
}