# Full Stack Open 2022

## Lyhyesti

https://fullstackopen.com/

"Kurssilla tutustutaan JavaScriptilla tapahtuvaan moderniin web-sovelluskehitykseen. Pääpaino on React-kirjaston avulla toteutettavissa single page -sovelluksissa, ja niitä tukevissa Node.js:llä toteutetuissa REST- ja GraphQL-rajapinnoissa. Kurssi sisältää myös osat, joissa tutustutaan TypeScriptiin, React Nativeen ja jatkuvaan integraatioon. Kurssilla käsitellään myös sovellusten testaamista, konttitekonologiaa, konfigurointia ja suoritusympäristöjen hallintaa sekä tietokantoja."

"Osallistujilta edellytetään vahvaa ohjelmointirutiinia, web-ohjelmoinnin ja tietokantojen perustuntemusta, Git-versionhallintajärjestelmän peruskäytön hallintaa, kykyä pitkäjänteiseen työskentelyyn sekä valmiutta omatoimiseen tiedonhakuun ja ongelmanratkaisuun. Osallistuminen ei kuitenkaan edellytä kurssilla käsiteltävien tekniikoiden tai JavaScript-kielen hallintaa."

"Jos haluat kurssista virallisen suoritusmerkinnän, kuuluu kurssiin myös koe. Hyväksytty suoritus edellyttää kokeen läpäisemistä, koe ei kuitenkaan vaikuta arvosanaan. Koe suoritetaan Avoimen yliopiston Moodle-järjestelmässä"

## Resurssit

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript
- https://github.com/getify/You-Dont-Know-JS

## Poiminnot

- https://marketplace.visualstudio.com/items?itemName=humao.rest-client

## Osa 0

- Historiaa ja nykyaikaa, SPA, tiedon kulku, sekvenssikaavio

## Osa 1

- Käydään läpi tilaa ja useStaten käyttöä. Myöhemmissä vaiheissa käydään läpi vanhemman Reactin class-komponentteja riittäviltä osin, jos joutuu ylläpitämään vanhaa koodia.
- Hyvän koodin tyyli, sivun komponentointi, tilanhallinta, hookit.

## Osa 2

- Osa osalta kohti syvää päätyä.
- Hyvin selitetty sovelluksen rakenne ja siihen tehtävät muutokset.
- Koodin rakenne ja käytännöt ovat hyvät.
- Mennään jo datan hakuun palvelimelta, filteröintiin ja formeihin.
- Bonuksena APIen kutsuminen ja API avaimien käyttö.

## Osa 3

- Mennään hyvin selkeästi backend-kehitykseen ja esitellään REST APIn tekeminen oikeilla resursseilla.
- Node.js ja Express, CRUD REST API:n tekeminen ja sovelluksen vienti Herokuun, Mongon lisääminen ja pilvipalvelut.

## Osa 4

- Sovelluksen rakenne ja testauksen alkeet. Sovelluksen rakenne jne.
- async/await

- TIL: Koodin suorituksen voi pysäyttää Chromen developer-konsolin debuggeriin kirjoittamalla mihin tahansa kohtaa koodia komennon debugger.

- VS Code Snippets! https://fullstackopen.com/osa2/kokoelmien_renderointi_ja_moduulit#protip-visual-studio-coden-snippetit
- User Snippets under File > Preferences (Code > Preferences on macOS)

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
