#!/bin/bash
supabase link --project-ref $SUPABASE_PROJECT_ID --workdir=./src/lib/
supabase db push --workdir=./src/lib/



