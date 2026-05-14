// 🎨 Base colors
const dmgColorMap = {
  Physical: 'text-red-400',
  Magic: 'text-purple-400',
  Quantum: 'text-purple-400',
  Artificial: 'text-cyan-300',
  Sharp: 'text-red-700',
  Flame: 'text-red-500',
  Frost: 'text-blue-300',
  Volte: 'text-amber-300',
  Tide: 'text-blue-600',
  Gale: 'text-green-300',
  Destruction: 'text-white'
}

const defaultTrueGradient =
  'font-bold bg-gradient-to-br from-pink-300 to-indigo-300 bg-clip-text text-transparent'

const trueGradientMap = {
  Flame: 'from-red-300 to-red-600',
  Frost: 'from-blue-200 to-blue-500',
  Volte: 'from-amber-200 to-amber-500',
  Tide: 'from-blue-400 to-blue-700',
  Gale: 'from-green-200 to-green-500',
  Physical: 'from-red-300 to-red-500',
  Magic: 'from-purple-300 to-purple-600',
  Quantum: 'from-purple-300 to-purple-700',
  Artificial: 'from-cyan-200 to-cyan-500',
  Sharp: 'from-red-500 to-red-800',
  Destruction: 'from-gray-200 to-white'
}


// 📦 Dictionary (PRIORITY ORDER = IMPORTANT)
const dictionary = [
  // 🔥 MOST SPECIFIC FIRST

  // Bonuses
  ...[
    'Destruction DMG Bonus',
    'Quantum DMG Bonus',
    'Artificial DMG Bonus',
    'Sharp DMG Bonus',
    'Flame DMG Bonus',
    'Frost DMG Bonus',
    'Volte DMG Bonus',
    'Tide DMG Bonus',
    'Gale DMG Bonus'
  ].map(name => ({
    type: 'bonus',
    value: name,
    className: 'font-semibold ' + (dmgColorMap[name.split(' ')[0]] || 'text-white')
  })),

  // Stats
  { type: 'stat', value: 'Physical ATK', className: 'text-orange-400 font-semibold' },
  { type: 'stat', value: 'Magic PWR', className: 'text-purple-500 font-semibold' },
  { type: 'res', value: 'DEF', className: 'text-red-400 font-semibold'},

  // RES / DEF
  { type: 'res', value: 'Physical RES', className: 'text-red-400' },
  { type: 'res', value: 'Magic RES', className: 'text-purple-400' },
  { type: 'res', value: 'Destruction RES', className: 'text-white font-semibold' },
  { type: 'res', value: 'Quantum RES', className: 'text-purple-400' },
  { type: 'res', value: 'Artificial RES', className: 'text-cyan-300' },
  { type: 'res', value: 'Sharp RES', className: 'text-red-700' },
  { type: 'res', value: 'Flame RES', className: 'text-red-500' },
  { type: 'res', value: 'Frost RES', className: 'text-blue-300' },
  { type: 'res', value: 'Volte RES', className: 'text-amber-300' },
  { type: 'res', value: 'Tide RES', className: 'text-blue-600' },
  { type: 'res', value: 'Gale RES', className: 'text-green-300' }
]

// 🔢 Regex tokens
const numberRegex = /^\d+(\.\d+)?%?/
const paramRegex = /^\[\$_(\d+),\s*([\d.]+)\](%)?/
const relicParamRegex = /^\[\$_(\d+)\](%)?/

// 🔥 Complex DMG matcher
const matchComplexDmg = (text) => {
  // =========================
  // 🔥 1. FUSED DMG
  // =========================
  const fusedRegex =
    /^(Follow-Up\s+)?(True\s+)?(Flame|Frost|Volte|Tide|Gale)-Fused\s+DMG/

  const fusedMatch = text.match(fusedRegex)

  if (fusedMatch) {
    const [full, , trueTag, type] = fusedMatch

    let className = ''

    if (trueTag) {
      const gradient = trueGradientMap[type]

      className = gradient
        ? `font-bold bg-gradient-to-br ${gradient} bg-clip-text text-transparent`
        : defaultTrueGradient
    } else {
      className = `font-bold ${dmgColorMap[type]}`
    }

    return {
      length: full.length,
      html: `<span class="${className}">${full}</span>`
    }
  }

  // =========================
  // ⚡ 2. NORMAL + PURE TRUE DMG
  // =========================
  const normalRegex =
    /^(Follow-Up\s+)?(True\s+)?(?:(Physical|Magic|Quantum|Artificial|Sharp|Flame|Frost|Volte|Tide|Gale|Destruction)\s+)?DMG/

  const normalMatch = text.match(normalRegex)

  if (normalMatch) {
    const [full, , trueTag, type] = normalMatch

    let className = ''

    if (trueTag) {
      // 🎯 TRUE DMG LOGIC
      if (type) {
        // True Flame DMG
        const gradient = trueGradientMap[type]

        className = gradient
          ? `font-bold bg-gradient-to-br ${gradient} bg-clip-text text-transparent`
          : defaultTrueGradient
      } else {
        // True DMG (pure)
        className = defaultTrueGradient
      }
    } else {
      // Normal DMG
      className = `font-bold ${dmgColorMap[type] || 'text-white'}`
    }

    return {
      length: full.length,
      html: `<span class="${className}">${full}</span>`
    }
  }
  return null
}

// 🧩 MAIN PARSER
export const formatDescription = (input, level, multipliers) => {
  let text = input

  // Optional normalization
  text = text.replace(/FLame/g, 'Flame')

  let i = 0
  let result = ''

  while (i < text.length) {
    const remaining = text.slice(i)

    // =========================
    // 🟡 1. DICTIONARY (TOP PRIORITY)
    // =========================
    let matched = false

    for (const entry of dictionary) {
      if (remaining.startsWith(entry.value)) {
        result += `<span class="${entry.className}">${entry.value}</span>`
        i += entry.value.length
        matched = true
        break
      }
    }

    if (matched) continue

    // =========================
    // 🔥 2. COMPLEX DMG
    // =========================
    const dmgMatch = matchComplexDmg(remaining)
    if (dmgMatch) {
      result += dmgMatch.html
      i += dmgMatch.length
      continue
    }

    // =========================
    // 🆕 3a. RELIC PARAM [$_n] ONLY (2D multipliers)
    // =========================
    const relicMatch = remaining.match(relicParamRegex)

    if (relicMatch) {
      const [full, nStr, isPercent] = relicMatch
      const n = Number(nStr)

      // Step 1: get sub-array from multipliers
      const subArray = multipliers?.[n - 1] ?? []

      // Step 2: get value for current level
      const value = subArray?.[level - 1] ?? 0

      result += `<span class="text-cyan-400 font-bold">${value}${isPercent ?? ''}</span>`
      i += full.length
      continue
    }

    // =========================
    // 🆕 3b. PARAMETERS [$_n, X.XX] OR [$_n, XXX]
    // =========================
    const paramMatch = remaining.match(paramRegex)

    if (paramMatch) {
      const [full, index, base, isPercent] = paramMatch
      const baseNum = Number(base)

      const multiplier = multipliers?.[index - 1] ?? 0
      const lvl = level - 1

      let value = 0

      if (isPercent) {
        // % formula
        value = ((baseNum + (multiplier * lvl)) * 100).toFixed(2) + '%'
      } else {
        // flat formula
        value = Math.round(baseNum + (multiplier * lvl))
      }

      result += `<span class="text-cyan-400 font-bold">${value}</span>`
      i += full.length
      continue
    }

    // =========================
    // 🔢 4. NUMBERS
    // =========================
    const numMatch = remaining.match(numberRegex)
    if (numMatch) {
      result += `<span class="text-cyan-500 font-bold">${numMatch[0]}</span>`
      i += numMatch[0].length
      continue
    }

    // =========================
    // ✍️ 5. DEFAULT
    // =========================
    result += text[i]
    i++
  }

  return result
}
