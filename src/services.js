// This is a sample file that demonstrates
// how you can write an abstraction around
// a fetch() call
// This exported function returns a promise
// that resolves with data
// or rejects with an error object
//
// The caller of this function can decide
// what to do with the data
// or what to do with the error
//
// You can add to this file and use this function
// or write your own files/functions



export function getLogin() {

  return fetch('/api/session/', {
    method: 'GET',
    headers: {
      'content-type': 'application/json', 
    },
  })
  .catch( err => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(!response.ok) {  
      return response.json().then( err => Promise.reject(err) );
    }
    return response.json(); 
  });

}


export function fetchLogin(username) {

  return fetch('/api/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json', 
    },
    body: JSON.stringify( { username } ),
  })
  .catch( err => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(!response.ok) {  
      return response.json().then( err => Promise.reject(err) );
    }
    return response.json(); 
  });
}

export function getWord() {

  return fetch('/api/word/', {
    method: 'GET',
    headers: {
      'content-type': 'application/json', 
    },
  })
  .catch( err => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(!response.ok) {  
      return response.json().then( err => Promise.reject(err) );
    }
    return response.json(); 
  });

}


export function fetchWord(word) {
  return fetch('/api/word/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json', 
    },
    body: JSON.stringify( { word } ),
  })
  .catch( err => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(!response.ok) {  
      return response.json().then( err => Promise.reject(err) );
    }
    return response.json(); 
  });
}


