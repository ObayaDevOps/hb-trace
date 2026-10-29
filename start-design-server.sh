#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PORT="${1:-8000}"
PAGE="$SCRIPT_DIR/hb-trace-high-level-design.html"

if [[ ! "$PORT" =~ ^[0-9]+$ ]] || (( PORT < 1 || PORT > 65535 )); then
  printf 'Usage: %s [port 1-65535]\n' "$0" >&2
  exit 2
fi

if [[ ! -f "$PAGE" ]]; then
  printf 'Design page not found: %s\n' "$PAGE" >&2
  exit 1
fi

printf 'Serving HB-TRACE design from %s\n' "$SCRIPT_DIR"
printf 'Open http://127.0.0.1:%s/hb-trace-high-level-design.html\n' "$PORT"
printf 'Press Ctrl+C to stop.\n'

cd "$SCRIPT_DIR"
exec python3 -m http.server "$PORT" --bind 127.0.0.1
