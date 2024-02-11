import { application } from "express";

class DevPortApiClient{
  
  constructor(onError){
    this.onError = onError;
    this.base_url = 'http://localhost:4000';
  }


  async request(options) {
    response = await(this.base_url + options.url, {
      method: options.method,
      body: options.body ? JSON.stringify(options.body) : null,
      headers: {
        'Content-Type': 'application/json'
      },
    })
  }

  async get(url, options){
    this.request({method: 'GET', url, ...options })
  }

  async post(url, options){
    this.request({method: 'POST', url, body, ...options })
  }

}