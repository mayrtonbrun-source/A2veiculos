import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://imhiqfczmtzyffmsqhgc.supabase.co'
const supabaseKey = 'sb_publishable_G9IZ4L31-ZvicbT4hTjupg_sw5kqVmU'

export const supabase = createClient(supabaseUrl, supabaseKey)