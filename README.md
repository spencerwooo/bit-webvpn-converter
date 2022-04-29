# Web VPN Converter

*Connect to your local networks in BIT from anywhere in the world.*

## Demo

[![screenshot](assets/screenshot.png)](https://webvpn.swo.moe)

## API reference

### Base

```http
GET /api/<ENCODED_URL>
```

Note that `ENCODED_URL` must be URL encoded.

### Optional params

* `prefix`: Must be one of `web` (default) or `lib`. Adds either `webvpn.bit.edu.cn` or `libvpn.bit.edu.cn` as prefix to the URL.
* `redirect`: Either `true` or `false` (default). If `true`, the client will be redirected to the converted/encrypted URL directly.

### Example

```http
GET /api/https%3A%2F%2Fbit.edu.cn?prefix=web&redirect=false
```

```json
{
  "url": "https://webvpn.bit.edu.cn/https/77726476706e69737468656265737421f2fe55d222347d1e7d06"
}
```

## Development

```bash
pnpm install
pnpm dev
pnpm build
```
