# taaltip

Vue app for use in taalhulp123.nl/taaltip website. It loads segments from a YAML source and displays them as a sortable and filterable collection. They can be opened in a modal window and play an animation.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### FTP location

```
/var/www/taalhulp123.nl/html/www/catalog/view/theme/thulp/taaltip/
```

## Sitemap integration

The main website is built on Opencart and provides an HTML sitemap for users and an XML sitemap for Google. This app prepares code snippets for pasting into those sitemaps on the following URL: https://www.taalhulp123.nl/taaltip#/dump
