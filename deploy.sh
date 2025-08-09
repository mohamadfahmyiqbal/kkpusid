#!/bin/bash

# Build React app
npm run build

# Kirim hasil build ke VPS (ganti user, host, path sesuai VPS kamu)
rsync -avz --delete ./build/ kkpusid@kkpus.id:/var/www/kkpus.id/
