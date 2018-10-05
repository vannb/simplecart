import _ from 'lodash';
import fetch from 'isomorphic-unfetch';
import { API } from '../constants';

export default class Network {
  static async fetch(url, method, body, headers) {
    return fetch(`${API}${url}`, {
      method,
      headers: _.extend({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }, headers),
      body: body ? JSON.stringify(body) : null,
    });
  }

  static async ajax(url, method, body, headers) {
    return Network.fetch(url, method, body, headers);
  }

  static get(url, headers) {
    return Network.ajax(url, 'GET', null, headers);
  }

  static put(url, body, headers) {
    return Network.ajax(url, 'PUT', body, headers);
  }

  static post(url, body, headers) {
    return Network.ajax(url, 'POST', body, headers);
  }

  static delete(url, body, headers) {
    return Network.ajax(url, 'DELETE', body, headers);
  }
}
