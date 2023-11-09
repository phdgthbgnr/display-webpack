- **node** : 14.18.1
- **npm** : 6.14.15

## webpack

- **console**

  - npm run watch --banner="120x600" ( watch + browser - mode production) slow
  - npm run dev --banner="120x600" (watch + browser - mode development : no compression / no minification) fast

- **no console**
  - npm run build --banner="120x600" (mode production)
  - npm run build (build all formats mode production)

---

npm init -y
npm install webpack webpack-cli --save-dev

---

https://webpack.js.org/guides/getting-started/
https://webpack.js.org/configuration/

### test compilation :

npx webpack --config webpack.config.js

### HTML Webpack Plugin :

https://github.com/jantimon/html-webpack-plugin

#### Attention aux node_modules qui risquent de pas être les bons si re-installés sur master

---

### multiple entries output :

https://stackoverflow.com/questions/37801495/multiple-dynamic-entry-scripts-in-webpack

https://dev.to/bbenefield89/webpack-how-to-create-dynamic-entry-output-paths-1oc9

https://github.com/bbozzay/webpack-dynamic-entries

- à voir :

  https://opensourcelibs.com/lib/webpack-sweet-entry

  https://githubhelp.com/webpack-contrib/image-minimizer-webpack-plugin

  https://developpaper.com/preprocessing-html-files-with-html-webpack-plugin/

  https://www.geekco.fr/posts/fr/webpack-4-ma-configuration-pour-compiler-javascript-html-css-images-et-fonts

  https://stackoverflow.com/questions/52579994/vue-webpack-configuration-doesnt-minify-images

  https://webpack.js.org/plugins/copy-webpack-plugin/

#### regex dimension from folder name

([0-9]+)(?:[xX]{1})([0-9]+)
