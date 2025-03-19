import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wapwestsaosakjnekkez.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhcHdlc3RzYW9zYWtqbmVra2V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0MDM2NDYsImV4cCI6MjA1Nzk3OTY0Nn0.Kc3huN1JgY9QBSuWXgE2rINErY4Z5AcsG-hKBhBA-i8'

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    }
}) 