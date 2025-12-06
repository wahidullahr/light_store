# Supabase Integration Setup

This document describes the Supabase integration setup for the Huslampe website.

## Environment Variables

You need to create a `.env.local` file in the root directory with your Supabase credentials.

### Steps to Set Up Environment Variables

1. Create a file named `.env.local` in the root directory (same level as `package.json`)

2. Add the following content to `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://idjeqwuqtxvlmpusqrwf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkamVxd3VxdHh2bG1wdXNxcndmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMzExNTgsImV4cCI6MjA4MDYwNzE1OH0.s-V9QKad-FIHaPOnNJZNIciUSHG1YqAZ5anPUJh3jLg

# Service Role Key (Server-side only - NEVER expose to client)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkamVxd3VxdHh2bG1wdXNxcndmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTAzMTE1OCwiZXhwIjoyMDgwNjA3MTU4fQ.m8KtyBVwCzTbIl2hhpdfebeUBKfHr_gcbBknJnTnHIM
```

3. Save the file

4. Restart your development server if it's running

## File Structure

```
src/lib/supabase/
├── client.ts      # Client-side Supabase client (for React components)
├── server.ts      # Server-side Supabase client (for API routes, Server Components)
├── index.ts       # Main exports
└── test-connection.ts  # Connection testing utilities
```

## Usage

### Client-Side (React Components)

```typescript
import { supabase } from '@/lib/supabase/client';

// Example: Fetch data
const { data, error } = await supabase
  .from('your_table')
  .select('*');
```

### Server-Side (API Routes, Server Components)

```typescript
import { supabaseAdmin } from '@/lib/supabase/server';

// Example: Insert data (bypasses RLS)
const { data, error } = await supabaseAdmin
  .from('your_table')
  .insert({ column: 'value' });
```

## Testing the Connection

### Option 1: API Endpoint

Visit: `http://localhost:3000/api/supabase/test`

This will test the server-side Supabase connection.

### Option 2: Programmatic Test

```typescript
import { testSupabaseConnection } from '@/lib/supabase/test-connection';

const result = await testSupabaseConnection();
console.log(result);
```

## Security Notes

- **Never commit `.env.local`** to version control (it's already in `.gitignore`)
- **Never expose `SUPABASE_SERVICE_ROLE_KEY`** to the client
- Use `supabase` (client) for user-facing operations
- Use `supabaseAdmin` (server) only in API routes and Server Components

## Next Steps

1. Create your database tables in Supabase Dashboard
2. Set up Row Level Security (RLS) policies if needed
3. Create TypeScript types for your database schema
4. Implement your features using the Supabase clients

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Next.js with Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

