import axios from "axios";
export default class DevPortApiClient{
  
 ; 
  constructor(){
    // this.onError = onError;
    this.base_url = process.env.REACT_APP_API_URL;
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
        statusText: "OK",
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

  async downloadFile(apiEndpoint, filename) {
    try {
      const response = await axios.get(apiEndpoint, {
        responseType: "blob", // Specify response type as blob
      });

      const blob = new Blob([response.data], { type: response.headers["content-type"] });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;

      // Append the link to the document body
      document.body.appendChild(link);

      // Trigger a click on the link to start the download
      link.click();

      // Remove the link from the document
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  }

}