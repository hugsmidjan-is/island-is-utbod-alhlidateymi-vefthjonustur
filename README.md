# SÍ útboð, bakendi alhliðateymis

## Leiðarljós

Nýtum það SÍ notar:

- NX
- Nest.js
- PostgeSQL

Fylgjum [API Design Guide](https://docs.devland.is/technical-overview/api-design-guide), sér í lagi:

- [Naming Conventions](https://docs.devland.is/technical-overview/api-design-guide/naming-conventions)
- [Pagination](https://docs.devland.is/technical-overview/api-design-guide/pagination)
- Fleira? TODO

## `project-api`

Keyra

```bash
yarn dev
```

Þjónustur á `http://localhost:3000/api/v1/`, swagger á `http://localhost:3000/swagger`.

Test:

```bash
npx nx test project-api
npx nx test project-api --coverage
```

### PostgreSQL

TODO

### Hýsing

TODO

## `project-web` dev

Þarf node 20.15.0, direnv og vercel:

```bash
nvm use 20.15.0
direnv allow

yarn global add vercel # ef ekki uppsett
yarn dlx vercel # ef á yarn 2+
```

Sækja env:

```bash
vercel login
vercel link # y -> Hugsmiðjan -> y
vercel env pull .env.secret --environment=production
```

Dev!

```bash
yarn dev
```

### Build

Alveg eins og fyrir dev nema

```bash
yarn build
```
