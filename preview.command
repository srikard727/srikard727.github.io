#!/bin/zsh
cd "$(dirname "$0")" || exit 1
print 'Previewing portfolio at http://localhost:4173/'
(sleep 1; open 'http://localhost:4173/') >/dev/null 2>&1 &
python3 -m http.server 4173
