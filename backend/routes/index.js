const tokensRoutes = require('./tokensRoutes');

const appRouter = (app) => {
  tokensRoutes(app);
};

module.exports = appRouter;

/* 
 "1": {
    "name": "Japan street sunset",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    "image": "https://cdnb.artstation.com/p/assets/images/images/040/889/485/large/arseniy-chebynkin-bar-ext-sunset.jpg?1630162839"
  },
  "2": {
    "name": "VOID",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    "image": "https://cdnb.artstation.com/p/assets/images/images/040/759/017/large/jeffri-honesta-voiddlow.jpg?1629809136"
  },
  "3": {
    "name": "2042",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    "image": "https://cdnb.artstation.com/p/assets/images/images/040/901/841/large/treadmill-focus2.jpg?1630204608"
  },
  "4": {
    "name": "Sage Babylon",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    "image": "https://cdna.artstation.com/p/assets/images/images/039/973/508/large/fabiana-kofman-babylon02.jpg?1627484504"
  },
  "5": {
    "name": "New Build",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    "image": "https://cdna.artstation.com/p/assets/images/images/040/620/384/large/justin-currie-screen-shot-2021-08-19-at-9-52-51-am.jpg?1629392543"
  },
  "6": {
    "name": "Spider-man",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    "image": "https://cdnb.artstation.com/p/assets/images/images/038/846/851/large/pengwei-deng-wtf-is-this3.jpg?1624255327"
  }
*/