# Vefforritun 2, 2022 hópverkefni 1 (vef2-hopaverkefni1-sse)

## Keyra verkefni á eigin vél

Gert er ráð fyrir postgres og npm sé upp sett

```bash
git clone https://github.com/sthb13/vef2-hopaverkefni1-sse.git
cd vef2-hopaverkefni1-sse
npm install
createdb vef2-sse
# uppfæra .env
npm run build  # býr til gagnagrunn og setur admin inn
npm run lint   # athugar eslint
npm run dev    # þá keyrir þetta á http://localhost:3000/
```

## Heroku

[Hlekkur](https://vef2-hopaverkefni1-sse.herokuapp.com/) á Heroku síðu.

## Test

Til þess að keyra test þarf að vera með tvo terminal glugga opna
í þann fyrri er keyrt:

```bash
npm run dev  # keyra á localhost 3000
```

```bash
npm run test  # staðfestir virkni með testum
```

- POST /users/login -> tekur við gögnum
- POST /users/register -> tekur við gögnum
- GET /users/1 -> krefst auðkenningar
- GET /menu
- POST /menu
- GET /menu/:id
- PATCH /menu/:id -> tekur við gögnum
- DELETE /menu/:id
- GET /categories
- GET /orders/:id -> krefst auðkenningar

ps. mikilvægt er að keyra npm run build áður en gerð eru test.

---

Stjórnandi skráður í gagnagrunn:

- username : admin
- password : 123

---
## Dæmi um keyrslu
### Innskráning sem stjórnandi
```
AUTH_TOKEN_ADMIN=$(curl -L -X POST 'http://localhost:3000/users/login' \
            -H 'Content-Type: application/json' \
            --data '{"username": "admin", "password": "123"}' | jq -r ".token")
echo $AUTH_TOKEN_ADMIN;
```
### Skráning sem notandi
```
curl -L -X POST 'http://localhost:3000/users/register' \
     -H 'Content-Type: application/json' \
     --data '{"username": "jon@gmail.com", "password": "qwerty"}'
```       
### Innskráning sem notandi
```
AUTH_TOKEN_USER=$(curl -L -X POST 'http://localhost:3000/users/login' \
            -H 'Content-Type: application/json' \
            --data '{"username": "jon@gmail.com", "password": "qwerty"}' | jq -r ".token")
echo $AUTH_TOKEN_USER;
```
### Bæta við category/:id
```
curl -X PATCH "http://localhost:3000/categories/6" \
     -H "Authorization: Bearer $AUTH_TOKEN_ADMIN" \
     -H "Content-Type: application/json" \
     -d '{ "title": "Aperitivo"}'
```       

Sjá öll dæmi í þessu [skjali](curl-sse.org).
## Hópmeðlimir

- Eva Margrét Hrólfsdóttir ( emh33 )
- Skúli Þór Bjarnason ( sthb13 )
- Sturla Freyr Magnússon (Stulli888)

