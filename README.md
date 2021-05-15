# node-zoom-clone-app 🚀

[![Report an issue](https://img.shields.io/badge/Support-Issues-green)](https://github.com/tquangdo/node-zoom-clone-app/issues/new)
***********
![demo](demo.png)

## deploy local
1. `npm i`
2. `nodemon server`

## heroku
![Heroku](https://heroku-badge.herokuapp.com/?app=zoom-clone-app-dotq)
### install
- `npm i -g heroku`
### dashboard on website
![heroku](heroku.png)
***********
### setting
https://github.com/tquangdo/node-zoom-clone-app/blob/master/memo.txt
#### check buildpacks
- `heroku buildpacks -a zoom-clone-app-dotq`
- -> `heroku/nodejs`
- ![buildpacks](buildpacks.png)
***********
>if: `heroku buildpacks:set mars/create-react-app -a zoom-clone-app-dotq`
- `heroku buildpacks -a zoom-clone-app-dotq`
- -> `mars/create-react-app`
