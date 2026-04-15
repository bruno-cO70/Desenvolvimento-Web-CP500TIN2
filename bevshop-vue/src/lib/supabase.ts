import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ezytybxzenfyrsecwpta.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6eXR5Ynh6ZW5meXJzZWN3cHRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1NDA3ODksImV4cCI6MjA4OTExNjc4OX0.eOieZBtwJd8SyA1neBtYY5XlJL520-uqqSnriW4X9rY'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)