
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lufvewhunkzvjiugcjdp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1ZnZld2h1bmt6dmppdWdjamRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2NzI3NTcsImV4cCI6MjA2NTI0ODc1N30.wHblD-PHCAeIDCjhn_VkrjUuGECMSPRaC16WKNmO844'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
