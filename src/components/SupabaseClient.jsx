import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://zlmsmdibvnnhxthvdhhf.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsbXNtZGlidm5uaHh0aHZkaGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2NjE5MjAsImV4cCI6MjA1NDIzNzkyMH0.Hr3Hkp8nPmwlfHODkBtAt1eG7kCgLUFqCV59N7VxLlI'; // Replace with your Supabase anon key
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;