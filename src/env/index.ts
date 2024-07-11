import { z } from 'zod'

const envSchema = z.object({
    API_SERVER: z.string().url().default('http://localhost:3333'),
})

const _env = envSchema.safeParse(import.meta.env)

if (!_env.success) {
    console.error('❌ invalid environment variables', _env.error.format())

    throw new Error('Invalid environment variables')

}

export const env = _env.data