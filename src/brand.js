// Paths into the brand asset drop in /public. Folder names use spaces,
// file names use underscores — these helpers bridge the two.
const COLOR_DIRS = {
  sand: 'sand',
  beige: 'beige',
  clay: 'clay',
  moss: 'moss',
  leather: 'canyon leathern',
  canyon: 'deep canyon',
}

export function logo(kind, color) {
  const dir = COLOR_DIRS[color]
  return encodeURI(
    `/Logo Suite 2/Web - RGB/${kind}/${dir}/samaya_${kind.replaceAll(' ', '_')}_${dir.replaceAll(' ', '_')}_rgb.svg`,
  )
}

export function illo(name, color) {
  const dir = COLOR_DIRS[color]
  return encodeURI(
    `/Illustrations - RGB/${name}/${dir}/samaya_${name}_${dir.replaceAll(' ', '_')}_rgb.svg`,
  )
}

export const PATTERN = encodeURI(
  '/Patterns/Web - RGB/Full/deep canyon/samaya_mountain_pattern_deep_canyon_rgb.svg',
)

// viewBox ratio of the combination lockup, needed for the CSS-mask nav logo
export const COMBINATION_RATIO = 1000 / 336.3253
