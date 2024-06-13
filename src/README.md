
---
# PRESUPUESTADOR
---

## Deploy

```
cd src/
npm run build
```
Para servidores apache, incluir `.htaccess`

```
<IfModule mod_rewrite.c>
    Options +FollowSymLinks -MultiViews

    RewriteEngine On

    RewriteCond %{REQUEST_FILENAME} -d
    RewriteRule ^(.*)/$ $1.html

    RewriteCond %{REQUEST_FILENAME}.html -f
    RewriteRule !.*\.html$ %{REQUEST_FILENAME}.html [L]

    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME}\.html -f
    RewriteRule ^(.*)$ $1.html [NC,L]

    # Protect some contents
    RewriteRule ^.*/?\.git+ - [F,L]

</IfModule>
```



## Proyecto base:
https://stackblitz.com/github/vercel/next.js/tree/canary/examples/layout-component

### Tecnologías usadas
- **Next** (https://nextjs.org)
- **React-boostrap** (https://react-bootstrap.github.io)
- **React-JsonSchema-Form** (https://react-jsonschema-form.readthedocs.io/en/latest/)
- **React-pouchdb** (https://github.com/ArnoSaine/react-pouchdb)

### Librerías js

- Holder.js (https://github.com/imsky/holder) :(

- React-JsonSchema-Form-layout-grid (https://github.com/Narazaka/react-jsonschema-form-layout-grid) (*o*)

- React-fontawesome (https://github.com/FortAwesome/react-fontawesome)

- React-jsonschema-crud (https://github.com/ashutosh-shirole/react-jsonschema-crud)

- https://reactjsexample.com/

- https://www.npmjs.com/package/lowdb

----
## Articulos

Estilos en React: https://malcoded.com/posts/react-component-style/

MD en React: https://blog.logrocket.com/how-to-safely-render-markdown-using-react-markdown/

https://www.itdo.com/blog/como-crear-un-formulario-con-react-json-schema-form/

Wizard con react-jsonschema-form (https://jsfiddle.net/gmz7qern/)

https://reactjsexample.com/a-type-safe-zero-dependency-layout-solution-with-data-fetching-capabilities-for-next-js/

https://malcoded.com/posts/react-component-style/

https://nimblewebdeveloper.com/blog/convert-react-class-to-function-component

https://dev.to/ackshaey/level-up-your-javascript-browser-logs-with-these-console-log-tips-55o2

---
## Prototipado

Maqueta Figma: https://www.figma.com/file/hNnrYXkW8u8od2fQd1fnJZ/Presupuestador?node-id=54%3A18

https://whimsical.com/presupuestador-ko4AJmxW2wH4SMft6C5YY


## Hooks

https://dev.to/gabrielrufino/react-hook-usestate-in-typescript-4mn6

https://www.w3schools.com/react/react_usecontext.asp

https://medium.com/geekculture/how-to-use-context-usereducer-and-localstorage-in-next-js-cc7bc925d3f2

https://www.youtube.com/watch?v=b2psfRzk-r8

## Selector circular

https://stackoverflow.com/questions/68195152/how-to-detect-props-changes-in-react

https://stackoverflow.com/questions/58047950/how-to-pass-a-react-component-as-a-variable-to-child-component#58048010

https://frontarm.com/articles

## react-jsonschema-form

https://github.com/rjsf-team/react-jsonschema-form/issues/758

https://github.com/burningtree/awesome-json#format-extensions

### PouchDb

https://reactjsexample.com/no-dependencies-simple-react-hook-for-pouchdb/

### CUIT/CUIL
https://es.stackoverflow.com/questions/341991/c%c3%b3mo-validar-un-cuit-por-regex#383275

### Print css

https://www.campusmvp.es/recursos/post/estilos-css-para-imprimir-pautas-basicas-y-ejemplos.aspx

https://github.com/vladocar/Hartija---CSS-Print-Framework