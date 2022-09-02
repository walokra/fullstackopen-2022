# Full Stack Open 2022

- Käydään Reactin kirjoittamista läpi sopivan alkeista ja edetään eri tapoihin kirjoittaa sama toiminnallisuus.
- Osa 1, c+d: Käydään läpi tilaa ja useStaten käyttöä. Myöhemmissä vaiheissa käydään läpi vanhemman Reactin class-komponentteja riittäviltä osin, jos joutuu ylläpitämään vanhaa koodia.
- Osa 2, a+b+c: vauhti kiihtyy, mennään jo datan hakuun palvelimelta, filteröintiin ja formeihin. Bonuksena APIen kutsuminen ja API avaimien käyttö.
- Osa 3, Node.js ja Express, CRUD REST API:n tekeminen ja sovelluksen vienti Herokuun, Mongon lisääminen ja pilvipalvelut.
- Osa 4, Sovelluksen rakenne ja testauksen alkeet. Sovelluksen rakenne jne.
- Osa 4b, async/await

- TIL: Koodin suorituksen voi pysäyttää Chromen developer-konsolin debuggeriin kirjoittamalla mihin tahansa kohtaa koodia komennon debugger.

- VS Code Snippets! https://fullstackopen.com/osa2/kokoelmien_renderointi_ja_moduulit#protip-visual-studio-coden-snippetit

```
{
  "console.log": {
    "scope": "javascript,typescript",
    "prefix": "clog",
    "body": ["console.log('$1 :', $1);"],
    "description": "Log output to console"
  }
}
```

Web-sovelluskehityksen sääntöjä:

1.  Pidä selaimen developer-konsoli koko ajan auki.

## Resurssit

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript
- https://github.com/getify/You-Dont-Know-JS
