#!/bin/bash
printf "$SUPABASE_DB_PASSWORD" | supabase link --project-ref $SUPABASE_PROJECT_ID --workdir=./src/lib/
printf "$SUPABASE_DB_PASSWORD" | supabase db push --workdir=./src/lib/



