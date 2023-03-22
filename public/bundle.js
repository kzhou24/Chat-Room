/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchLogin": () => (/* binding */ fetchLogin),
/* harmony export */   "fetchWord": () => (/* binding */ fetchWord),
/* harmony export */   "getLogin": () => (/* binding */ getLogin),
/* harmony export */   "getWord": () => (/* binding */ getWord)
/* harmony export */ });
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

function getLogin() {
  return fetch('/api/session/', {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchLogin(username) {
  return fetch('/api/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      username: username
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function getWord() {
  return fetch('/api/word/', {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchWord(word) {
  return fetch('/api/word/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      word: word
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");

var dialog = document.querySelector('dialog');
var app = document.querySelector('#app');
onPageLoad();

// Collect the msg corresponding to different errors
function showError(err) {
  var message;
  switch (err.error) {
    case 'required-username':
      message = 'Username cannot be empty or contain special character besides underscore!';
      break;
    case 'auth-insufficient':
      message = 'Your password is not correct!';
      break;
    case 'required-word':
      message = 'Word cannot be empty!';
      break;
    case 'invalid-word':
      message = 'Word cannot contain any character besides lowercase or uppercase letters!';
      break;
  }
  // Use dialogue to imform erorrs
  dialog.showModal();
  dialog.querySelector('p').textContent = message;
}

// generate name list in the chat room
function generateNameList(session) {
  var recordName = [];
  Object.keys(session).map(function (sid) {
    var name = session[sid].username;
    if (recordName.indexOf(name) < 0) {
      recordName.push(name);
    }
  });
  return recordName.map(function (name) {
    return "<li>".concat(name, "</li>");
  }).join('');
}

//generate messages in the chat room

function generateMessageList(session, messages) {
  var messageList = messages.map(function (message) {
    var sid = message[0];
    var word = message[1];
    return "<li>".concat(session[sid].username, ":").concat(word, "</li>");
  }).join(' ');
  return messageList;
}

// load the page
function onPageLoad() {
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.getLogin)().then(function (response) {
    renderWord(app);
  })["catch"](function (error) {
    renderLogin(app);
  });
}

// login page
function renderLogin(container) {
  container.innerHTML = "\n  <form class='app__form' name='login'>\n    <label>\n      Username: \n      <input type='text' name='username'/>\n    </label>\n    <label>\n      Password: \n      <input type='password' name='password'/>\n    </label>\n    <button type='submit'>\n      Login\n    </button>\n  </form>\n";
  var form = document.forms.login;

  // submit the username
  form.onsubmit = function (event) {
    event.preventDefault();
    var username = form.username.value;
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(username).then(function (response) {
      return renderWord(app);
    })["catch"](function (err) {
      return showError(err);
    });
  };
}

// chat room
function renderWord(container) {
  container.innerHTML = "\n  <form name='word' class = \"chat__form\">\n    <label>\n      Current User:\n      <ul class ='user'></ul>\n    </label>\n    <label>\n      Saved Word:\n      <ul class ='messages'></ul>\n    </label>\n    <label>\n      Send Mesage: \n      <input class = \"message\"/>\n    </label>\n    <label>\n      <button type='submit' name='submit'>\n        Send\n      </button>\n      <button type='button' name='logout'>\n        Log Out\n      </button>\n    </label>\n  </form>\n";
  var form = document.forms.word;
  var user = document.querySelector(".user");
  var messages = document.querySelector(".messages");

  // Refresh the page
  function refresh(user, messages) {
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.getWord)().then(function (response)
    // show message lists and name lists
    {
      user.innerHTML = generateNameList(response.session);
      messages.innerHTML = generateMessageList(response.record, response.messages);
    })["catch"](function (error) {
      return renderLogin(app);
    });
  }

  // set the timeout as 5s and break it when it goes back to the login page  
  function refreshChatRoom() {
    refresh(user, messages);
    var timeout = setTimeout(refreshChatRoom, 5000);
    if (!document.forms.word) {
      clearTimeout(timeout);
    }
  }
  refreshChatRoom();

  // log out 
  form.onsubmit = function (event) {
    event.preventDefault();
    var message = document.querySelector(".message").value;
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchWord)(message)
    // delete the session
    .then(function (response) {
      return messages.innerHTML = generateMessageList(response.record, response.messages);
    })["catch"](function (error) {
      return showError(error);
    });
  };
  form.logout.onclick = function (event) {
    fetch('/api/session', {
      method: 'DELETE'
    });
    renderLogin(app);
  };
}
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map