#!/usr/bin/env bash

set -euo pipefail

project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
media_tmp="$(mktemp /tmp/atk-station-11.XXXXXX.wav)"
trap 'rm -f "$media_tmp"' EXIT

script_text='First, place the blue card in the center of the table. Next, put the metal spoon to the right of the card. Finally, press Done.'

npx --yes text2wav@0.0.14 "$script_text" -s 155 > "$media_tmp"

ffmpeg \
  -y \
  -f lavfi \
  -i color=c=0xF0F6FA:s=640x360:r=30:d=10 \
  -i "$media_tmp" \
  -vf 'drawbox=x=210:y=125:w=180:h=110:color=0x22557E:t=fill,drawbox=x=430:y=125:w=18:h=110:color=0x4A5568:t=fill' \
  -c:v libx264 \
  -pix_fmt yuv420p \
  -c:a aac \
  -b:a 128k \
  -shortest \
  -movflags +faststart \
  "$project_root/src/assets/station-11-instructions.mp4"

ffmpeg \
  -y \
  -f lavfi \
  -i color=c=0xF0F6FA:s=640x360 \
  -vf 'drawbox=x=210:y=125:w=180:h=110:color=0x22557E:t=fill,drawbox=x=430:y=125:w=18:h=110:color=0x4A5568:t=fill' \
  -frames:v 1 \
  -update 1 \
  "$project_root/src/assets/station-11-poster.png"
