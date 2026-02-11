import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

// Manual env parsing since dotenv seems to fail or path is tricky in this env
function loadEnv() {
    try {
        const envPath = path.join(process.cwd(), '.env.local')
        if (fs.existsSync(envPath)) {
            const envConfig = fs.readFileSync(envPath, 'utf8')
            envConfig.split('\n').forEach(line => {
                const parts = line.split('=')
                if (parts.length >= 2) {
                    const key = parts[0].trim()
                    const value = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '')
                    if (key && value) {
                        process.env[key] = value
                    }
                }
            })
            console.log('Loaded .env.local manually')
        } else {
            console.log('.env.local not found at:', envPath)
        }
    } catch (e) {
        console.error('Error loading env:', e)
    }
}

loadEnv()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase URL or Key after manual load')
    console.log('URL exists:', !!supabaseUrl)
    console.log('Key exists:', !!supabaseKey)
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function uploadLogo() {
    const filePath = path.join(process.cwd(), 'public', 'logo-email.png')

    if (!fs.existsSync(filePath)) {
        console.error('File not found:', filePath)
        return
    }

    const fileBuffer = fs.readFileSync(filePath)
    const fileName = 'logo-email.png'

    console.log('Checking buckets...')

    // Try to upload to 'brand' first
    const targetBucket = 'brand'

    console.log(`Attempting upload to bucket: ${targetBucket}`)

    const { data, error } = await supabase
        .storage
        .from(targetBucket)
        .upload(fileName, fileBuffer, {
            contentType: 'image/png',
            upsert: true
        })

    if (error) {
        console.error('Upload error:', error.message)
        if (error.message.includes('not found') || error.message.includes('does not exist')) {
            console.log('\n--- GUIDANCE ---')
            console.log('It seems the bucket "public" does not exist.')
            console.log('Please go to Supabase Dashboard -> Storage -> Create a new bucket named "public".')
            console.log('Make sure to make it "Public" (uncheck "Secure").')
        }
    } else {
        console.log('Upload successful!')
        const { data: { publicUrl } } = supabase
            .storage
            .from(targetBucket)
            .getPublicUrl(fileName)

        console.log('Public URL:', publicUrl)
    }
}

uploadLogo()
