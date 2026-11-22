// Generates the riso-style postcard illustrations in public/scenes/*.svg.
// Run: node scripts/buildScenes.mjs
import { mkdirSync, writeFileSync } from 'node:fs'

const INK = '#1d1b3a'
const PAPER = '#f6eedb'
const PINK = '#ff4f8b'
const BLUE = '#2a4bd7'
const YELLOW = '#ffd23f'
const TEAL = '#1fb5a4'
const ORANGE = '#ff7a2f'
const MULT = 'style="mix-blend-mode:multiply"'

const head =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><defs>' +
  '<filter id="g" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="4"/>' +
  '<feColorMatrix values="0 0 0 0 .11 0 0 0 0 .1 0 0 0 0 .23 0 0 0 .26 -.02"/></filter>' +
  `<pattern id="d" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><circle cx="3.5" cy="3.5" r="1.4" fill="${INK}"/></pattern></defs>`
const tail = '<rect width="400" height="300" filter="url(#g)"/></svg>'

const dots = (o) => `<rect width="400" height="300" fill="url(#d)" opacity="${o}"/>`

const scenes = {
  spa: `
<rect width="400" height="300" fill="#bfe9df"/>
<circle cx="305" cy="85" r="50" fill="${YELLOW}"/><circle cx="305" cy="85" r="50" fill="url(#d)" opacity=".25"/>
<g ${MULT}>
<rect y="212" width="400" height="88" fill="${TEAL}"/>
<g fill="none" stroke="${PAPER}" stroke-width="4" stroke-linecap="round"><path d="M20 240q20-10 40 0t40 0"/><path d="M230 268q20-10 40 0t40 0t40 0"/><path d="M60 280q20-10 40 0t40 0"/></g>
<ellipse cx="140" cy="206" rx="78" ry="22" fill="${BLUE}"/><ellipse cx="140" cy="176" rx="56" ry="17" fill="${PINK}"/><ellipse cx="140" cy="151" rx="36" ry="13" fill="${YELLOW}"/>
<g fill="none" stroke="${BLUE}" stroke-width="6" stroke-linecap="round"><path d="M250 205q-16-22 0-44t0-44"/><path d="M290 205q16-22 0-44t0-44"/><path d="M330 205q-16-22 0-44t0-44"/></g>
<g fill="${PINK}" transform="translate(310 238)"><ellipse rx="11" ry="30" transform="rotate(-62) translate(0 -22)"/><ellipse rx="11" ry="30" transform="rotate(62) translate(0 -22)"/><ellipse rx="11" ry="32" transform="translate(0 -22)"/></g>
</g>
<g fill="none" stroke="${INK}" stroke-width="4"><ellipse cx="140" cy="206" rx="78" ry="22"/><ellipse cx="140" cy="176" rx="56" ry="17"/><ellipse cx="140" cy="151" rx="36" ry="13"/></g>`,

  casino: `
<rect width="400" height="300" fill="${PINK}"/>${dots('.18')}
<circle cx="205" cy="150" r="118" fill="${PAPER}" stroke="${INK}" stroke-width="5"/>
<circle cx="205" cy="150" r="82" fill="none" stroke="${BLUE}" stroke-width="56" stroke-dasharray="21.5 21.5" ${MULT}/>
<circle cx="205" cy="150" r="108" fill="none" stroke="${INK}" stroke-width="3" stroke-dasharray="3 9"/>
<circle cx="205" cy="150" r="52" fill="${YELLOW}" stroke="${INK}" stroke-width="5"/><circle cx="205" cy="150" r="16" fill="${INK}"/>
<path d="M205 134v-28M205 166v28M189 150h-28M221 150h28" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
<circle cx="205" cy="64" r="9" fill="#fff" stroke="${INK}" stroke-width="3"/>
<g transform="rotate(-14 70 235)"><rect x="30" y="195" width="80" height="80" rx="14" fill="${PAPER}" stroke="${INK}" stroke-width="5"/><g fill="${INK}"><circle cx="52" cy="217" r="7"/><circle cx="70" cy="235" r="7"/><circle cx="88" cy="253" r="7"/><circle cx="88" cy="217" r="7"/><circle cx="52" cy="253" r="7"/></g></g>
<g transform="translate(335 250)" stroke="${INK}" stroke-width="4"><ellipse cy="14" rx="40" ry="14" fill="${BLUE}"/><ellipse cy="-2" rx="40" ry="14" fill="${YELLOW}"/><ellipse cy="-18" rx="40" ry="14" fill="${BLUE}"/><ellipse cy="-18" rx="24" ry="7" fill="none" stroke="${PAPER}" stroke-dasharray="6 6"/></g>`,

  wedding: `
<rect width="400" height="300" fill="#ffd9e6"/>
<circle cx="200" cy="150" r="130" fill="${YELLOW}" opacity=".55" ${MULT}/>
<path d="M82 300V150a118 118 0 0 1 236 0V300" fill="none" stroke="${TEAL}" stroke-width="26" ${MULT}/>
<g stroke="${INK}" stroke-width="3.5"><circle cx="88" cy="238" r="14" fill="${PINK}"/><circle cx="84" cy="190" r="13" fill="${PAPER}"/><circle cx="92" cy="146" r="15" fill="${YELLOW}"/><circle cx="114" cy="94" r="14" fill="${PINK}"/><circle cx="160" cy="48" r="15" fill="${PAPER}"/><circle cx="212" cy="38" r="14" fill="${YELLOW}"/><circle cx="262" cy="56" r="15" fill="${PINK}"/><circle cx="296" cy="102" r="13" fill="${PAPER}"/><circle cx="314" cy="150" r="15" fill="${PINK}"/><circle cx="316" cy="198" r="14" fill="${YELLOW}"/><circle cx="312" cy="242" r="13" fill="${PAPER}"/></g>
<g fill="none" stroke-width="12" ${MULT}><circle cx="172" cy="190" r="40" stroke="${YELLOW}"/><circle cx="228" cy="190" r="40" stroke="${BLUE}"/></g>
<g fill="none" stroke="${INK}" stroke-width="3"><circle cx="172" cy="190" r="46"/><circle cx="172" cy="190" r="34"/><circle cx="228" cy="190" r="46"/><circle cx="228" cy="190" r="34"/></g>
<path d="M200 130c-8-16-34-10-30 10 4 16 30 28 30 28s26-12 30-28c4-20-22-26-30-10z" fill="${PINK}" stroke="${INK}" stroke-width="4" transform="translate(0 -22)"/>`,

  airplane: `
<rect width="400" height="300" fill="${PINK}"/>${dots('.2')}
<defs><clipPath id="w"><rect x="105" y="26" width="190" height="250" rx="95"/></clipPath></defs>
<g clip-path="url(#w)"><rect x="100" y="20" width="200" height="260" fill="#8fc2ff"/>
<circle cx="230" cy="110" r="42" fill="${YELLOW}"/>
<g fill="${PAPER}"><circle cx="140" cy="130" r="26"/><circle cx="172" cy="118" r="34"/><circle cx="210" cy="136" r="26"/><rect x="130" y="132" width="100" height="26"/><circle cx="230" cy="238" r="30"/><circle cx="266" cy="244" r="26"/><circle cx="196" cy="248" r="24"/></g>
<path d="M95 215L300 150L300 190L95 262Z" fill="${BLUE}" ${MULT}/><path d="M95 215L300 150" stroke="${INK}" stroke-width="4"/></g>
<rect x="105" y="26" width="190" height="250" rx="95" fill="none" stroke="${PAPER}" stroke-width="16"/>
<rect x="105" y="26" width="190" height="250" rx="95" fill="none" stroke="${INK}" stroke-width="4"/>
<g fill="${INK}"><rect x="40" y="70" width="38" height="8" rx="4"/><rect x="40" y="90" width="26" height="8" rx="4"/><rect x="322" y="200" width="38" height="8" rx="4"/><rect x="334" y="220" width="26" height="8" rx="4"/></g>`,

  amusement: `
<rect width="400" height="300" fill="${YELLOW}"/>
<circle cx="200" cy="138" r="120" fill="${ORANGE}" opacity=".35" ${MULT}/>
<rect y="262" width="400" height="38" fill="${TEAL}" ${MULT}/>
<g stroke="${INK}" stroke-width="7" stroke-linecap="round" fill="none"><path d="M200 138L140 270M200 138L260 270"/><circle cx="200" cy="138" r="98"/><circle cx="200" cy="138" r="52" stroke-width="5"/><path d="M200 40v196M102 138h196M131 69l138 138M269 69L131 207" stroke-width="4"/></g>
<g stroke="${INK}" stroke-width="4"><rect x="184" y="24" width="32" height="30" rx="7" fill="${PINK}"/><rect x="253" y="52" width="32" height="30" rx="7" fill="${BLUE}"/><rect x="282" y="123" width="32" height="30" rx="7" fill="${PINK}"/><rect x="253" y="192" width="32" height="30" rx="7" fill="${BLUE}"/><rect x="184" y="222" width="32" height="30" rx="7" fill="${PINK}"/><rect x="115" y="192" width="32" height="30" rx="7" fill="${BLUE}"/><rect x="86" y="123" width="32" height="30" rx="7" fill="${PINK}"/><rect x="115" y="52" width="32" height="30" rx="7" fill="${BLUE}"/></g>
<circle cx="200" cy="138" r="14" fill="${PAPER}" stroke="${INK}" stroke-width="5"/>
<g stroke="${INK}" stroke-width="3"><path d="M352 120v70M44 140v70" fill="none"/><ellipse cx="352" cy="100" rx="22" ry="27" fill="${PINK}"/><ellipse cx="44" cy="120" rx="22" ry="27" fill="${BLUE}"/><ellipse cx="318" cy="140" rx="18" ry="22" fill="${PAPER}"/></g>`,

  club: `
<rect width="400" height="300" fill="${BLUE}"/>${dots('.22')}
<g style="mix-blend-mode:screen" opacity=".9"><path d="M200 120L60 300H180Z" fill="${PINK}"/><path d="M200 120L250 300H340Z" fill="${YELLOW}"/><path d="M200 120L330 70L400 150Z" fill="${PINK}" opacity=".7"/><path d="M200 120L70 60L0 150Z" fill="${TEAL}" opacity=".8"/></g>
<path d="M200 0v62" stroke="${INK}" stroke-width="5"/>
<defs><clipPath id="b"><circle cx="200" cy="112" r="58"/></clipPath></defs>
<circle cx="200" cy="112" r="58" fill="${PAPER}"/>
<g clip-path="url(#b)" fill="none" stroke="${INK}" stroke-width="3"><path d="M142 112h116M148 82h104M148 142h104M160 56h80M160 168h80"/><ellipse cx="200" cy="112" rx="22" ry="58"/><ellipse cx="200" cy="112" rx="44" ry="58"/><path d="M200 54v116"/></g>
<circle cx="175" cy="90" r="22" fill="${YELLOW}" ${MULT}/>
<circle cx="200" cy="112" r="58" fill="none" stroke="${INK}" stroke-width="5"/>
<rect y="244" width="400" height="56" fill="${PAPER}" stroke="${INK}" stroke-width="3"/>
<g fill="${PINK}"><rect y="244" width="50" height="28"/><rect x="100" y="244" width="50" height="28"/><rect x="200" y="244" width="50" height="28"/><rect x="300" y="244" width="50" height="28"/><rect x="50" y="272" width="50" height="28"/><rect x="150" y="272" width="50" height="28"/><rect x="250" y="272" width="50" height="28"/><rect x="350" y="272" width="50" height="28"/></g>
<g fill="${PAPER}"><path d="M54 36l5 14 14 5-14 5-5 14-5-14-14-5 14-5z"/><path d="M340 200l4 10 10 4-10 4-4 10-4-10-10-4 10-4z"/><path d="M360 40l3 8 8 3-8 3-3 8-3-8-8-3 8-3z"/></g>`,

  pub: `
<rect width="400" height="300" fill="${ORANGE}"/>
<g stroke="${INK}" stroke-opacity=".28" stroke-width="3"><path d="M50 0v300M130 0v300M210 0v300M290 0v300M370 0v300"/></g>${dots('.15')}
<g transform="rotate(12 300 200)"><rect x="248" y="110" width="84" height="130" rx="10" fill="${YELLOW}" stroke="${INK}" stroke-width="5"/><path d="M248 105a14 14 0 0 1 20-8 18 18 0 0 1 34-2 16 16 0 0 1 30 8v12h-84z" fill="${PAPER}" stroke="${INK}" stroke-width="4"/><path d="M332 140h20a22 22 0 0 1 0 66h-20" fill="none" stroke="${INK}" stroke-width="16"/><path d="M332 140h20a22 22 0 0 1 0 66h-20" fill="none" stroke="${PAPER}" stroke-width="7"/></g>
<g transform="rotate(-10 130 200)"><rect x="70" y="100" width="100" height="150" rx="10" fill="${YELLOW}" stroke="${INK}" stroke-width="5"/><path d="M70 95a16 16 0 0 1 22-10 20 20 0 0 1 38-2 18 18 0 0 1 40 10v12H70z" fill="${PAPER}" stroke="${INK}" stroke-width="4"/><path d="M70 140H46a24 24 0 0 0 0 70h24" fill="none" stroke="${INK}" stroke-width="16"/><path d="M70 140H46a24 24 0 0 0 0 70h24" fill="none" stroke="${PAPER}" stroke-width="7"/><g fill="${PAPER}" opacity=".8"><circle cx="100" cy="160" r="5"/><circle cx="130" cy="190" r="4"/><circle cx="112" cy="220" r="6"/><circle cx="140" cy="150" r="3"/></g></g>
<path d="M200 40l6 14 15 2-11 10 3 15-13-8-13 8 3-15-11-10 15-2z" fill="${BLUE}" stroke="${INK}" stroke-width="3"/>
<g fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"><path d="M196 140l-6-18M210 138l4-20M222 148l14-14"/></g>`,

  restaurant: `
<rect width="400" height="300" fill="#bfe9df"/>
<defs><pattern id="c" width="40" height="40" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="${PINK}"/><rect x="20" y="20" width="20" height="20" fill="${PINK}"/></pattern></defs>
<rect y="140" width="400" height="160" fill="url(#c)" ${MULT}/><path d="M0 140h400" stroke="${INK}" stroke-width="5"/>
<ellipse cx="200" cy="205" rx="130" ry="68" fill="${PAPER}" stroke="${INK}" stroke-width="5"/>
<ellipse cx="200" cy="205" rx="92" ry="46" fill="none" stroke="${INK}" stroke-width="3" stroke-dasharray="2 8" stroke-linecap="round"/>
<g ${MULT}><circle cx="190" cy="190" r="44" fill="${YELLOW}"/><circle cx="224" cy="200" r="26" fill="${PINK}"/><circle cx="166" cy="210" r="18" fill="${TEAL}"/></g>
<g fill="none" stroke="${INK}" stroke-width="4"><circle cx="190" cy="190" r="44"/><circle cx="224" cy="200" r="26"/><circle cx="166" cy="210" r="18"/></g>
<g fill="none" stroke="${BLUE}" stroke-width="7" stroke-linecap="round"><path d="M170 120q-14-18 0-34t0-30"/><path d="M205 120q14-18 0-34t0-30"/><path d="M240 120q-14-18 0-34t0-30"/></g>
<g stroke="${INK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"><path d="M40 90v40q0 12 12 12t12-12V90M52 90v36" fill="${PAPER}"/><path d="M52 142v128" stroke-width="12" stroke="${PAPER}"/><path d="M350 80c28 20 18 80 0 80z" fill="${PAPER}"/><path d="M350 160v110" stroke-width="12" stroke="${PAPER}"/></g>`,

  supermarket: `
<rect width="400" height="300" fill="#9fb4ff"/>
<g ${MULT}><rect y="42" width="400" height="8" fill="${INK}" opacity=".5"/><rect y="112" width="400" height="8" fill="${INK}" opacity=".5"/>
<g><rect x="14" y="12" width="26" height="30" fill="${PINK}"/><rect x="46" y="12" width="26" height="30" fill="${YELLOW}"/><rect x="78" y="12" width="26" height="30" fill="${TEAL}"/><rect x="110" y="12" width="26" height="30" fill="${PINK}"/><rect x="142" y="12" width="26" height="30" fill="${YELLOW}"/><rect x="236" y="12" width="26" height="30" fill="${TEAL}"/><rect x="268" y="12" width="26" height="30" fill="${PINK}"/><rect x="300" y="12" width="26" height="30" fill="${YELLOW}"/><rect x="332" y="12" width="26" height="30" fill="${TEAL}"/><rect x="364" y="12" width="26" height="30" fill="${PINK}"/></g>
<g><rect x="14" y="82" width="26" height="30" fill="${YELLOW}"/><rect x="46" y="82" width="26" height="30" fill="${PINK}"/><rect x="78" y="82" width="26" height="30" fill="${BLUE}"/><rect x="268" y="82" width="26" height="30" fill="${YELLOW}"/><rect x="300" y="82" width="26" height="30" fill="${BLUE}"/><rect x="332" y="82" width="26" height="30" fill="${PINK}"/><rect x="364" y="82" width="26" height="30" fill="${TEAL}"/></g></g>
<rect y="272" width="400" height="28" fill="${PAPER}" stroke="${INK}" stroke-width="4"/>
<path d="M44 130h46l34 118h168l34-92H108" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M104 156h244l-26 88H128z" fill="${PAPER}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
<g stroke="${INK}" stroke-width="3"><circle cx="150" cy="150" r="26" fill="${PINK}"/><rect x="198" y="96" width="34" height="68" rx="8" fill="${BLUE}"/><rect x="204" y="84" width="22" height="16" rx="4" fill="${INK}"/><circle cx="270" cy="148" r="24" fill="${TEAL}"/><rect x="290" y="100" width="22" height="70" rx="11" fill="${YELLOW}" transform="rotate(24 300 135)"/></g>
<g fill="${INK}" stroke="${PAPER}" stroke-width="4"><circle cx="150" cy="262" r="16"/><circle cx="296" cy="262" r="16"/></g>`,
}

mkdirSync('public/scenes', { recursive: true })
for (const [id, body] of Object.entries(scenes)) {
  writeFileSync(`public/scenes/${id}.svg`, head + body.replace(/\n/g, '') + tail)
}
