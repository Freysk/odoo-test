# 

# Odoo — Integration's Test

## Author

- ***Development :**** Frédéric Defays <br>

## Made with

- Build : npm / gulp
- Languages : Handlebars / Sass / Javascript (ES6)
- Library : Bootstrap 4.6

## Installation

To install all the needed dependencies :

```
> npm i -D
```

Then, to compil the src folder and launch the local server :

```
> npm run start
```

## General about notes

The project has been thought to be maintanable and scalable. Keeping components reusable as much as possible to avoid codes repetition and be DRY as much as possible. I used handlebars is this purpose.

I also separated data from markup to keep with good practices.

Note that was the first time I've really dived into bootstrap. I'm used to work differently by using BEM methodology. Then it's possible that the mix is not ideal for best practices for this first attempt.

The build is one I prepared on a previous project adapted for small static websites.

Even so I think carousel is not a good practice for several reasons. I tried to keep to the actual mockup. Then I made a custom carousel for the Awards section. The accordeon is also homemade via js vanilla.

About the hierarchy of files :

- ```.hbs``` (= markup) there is a hbs file by reusable component, section or area.
- ```.scss``` there is a .scss file by component name identically everywhere (hbs, js if needed)
- ```.js``` in data folder (= data) are structured data for content. They are data for sections and areas. The specific data for smaller components are dynamically loaded.
- assets folder for medias