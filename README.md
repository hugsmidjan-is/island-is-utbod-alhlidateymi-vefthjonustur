# sí útboð 2025 verkefni

Byggt á [dmr.ir repo](https://github.com/DMR-is/dmr.is).

## Dev

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
