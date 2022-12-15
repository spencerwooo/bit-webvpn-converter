import type { NextApiRequest, NextApiResponse } from 'next'
import { encryptUrl } from '../../lib/convert'

const prefixOptions = {
  web: 'https://webvpn.bit.edu.cn',
  lib: 'https://nlibvpn.bit.edu.cn',
} as const

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // request like /api/https%3A%2F%2Fbit.edu.cn?prefix=web|lib&redirect=true|false
  const { url, prefix = 'web', redirect = 'false' } = req.query

  // if prefix is not one of web or lib, return invalid request
  if (typeof prefix !== 'string' || !['web', 'lib'].includes(prefix)) {
    res.status(400).json({ error: 'Invalid prefix' })
    return
  }
  if (typeof url !== 'string') {
    res.status(400).json({ error: 'Invalid url' })
    return
  }
  if (typeof redirect !== 'string' || !['true', 'false'].includes(redirect)) {
    res.status(400).json({ error: 'Invalid redirect option' })
    return
  }

  const encryptedUrl = prefixOptions[prefix as keyof typeof prefixOptions] + encryptUrl(url)

  // next.js query parameter does not parse boolean directly, so we have to do a string compare
  if (redirect === 'true') {
    res.redirect(302, encryptedUrl)
  } else {
    res.status(200).json({ url: encryptedUrl })
  }
}
