# nuxt-ssr-with-firex-store-sample


## Before Start

- Firebase Authentication is used, so you needed to add User Authentication

- add follow var in `environments/firebase.js`

```javascript

export const friebaseConfig = {
    apiKey: '******',
    projectId: '******',
    ....
}
```

## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
