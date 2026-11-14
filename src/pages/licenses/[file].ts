import type { APIRoute } from 'astro';
import codeLicense from '../../../LICENSE?raw';
import contentLicense from '../../../LICENSE-CONTENT?raw';
import outfitLicense from '../../assets/fonts/outfit-OFL.txt?raw';
import spaceMonoLicense from '../../assets/fonts/space-mono-OFL.txt?raw';

export function getStaticPaths() {
  return Object.entries({
    'MIT.txt': codeLicense,
    'CC-BY-4.0.txt': contentLicense,
    'Outfit-OFL.txt': outfitLicense,
    'Space-Mono-OFL.txt': spaceMonoLicense,
  }).map(([file, notice]) => ({ params: { file }, props: { notice } }));
}

export const GET: APIRoute = ({ props }) => new Response(props.notice, {
  headers: { 'Content-Type': 'text/plain; charset=utf-8' },
});
