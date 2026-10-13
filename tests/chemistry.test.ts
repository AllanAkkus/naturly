import { describe, expect, it } from 'vitest'
import {
  chargeLabel,
  configurationString,
  describeAtom,
  electronsInIon,
  explainChange,
  groupOf,
  gridPosition,
  hasNobleGasConfiguration,
  ionNotation,
  isotopeNotation,
  massNumber,
  netCharge,
  neutronCount,
  parseIsotope,
  periodOf,
  shellDistribution,
  shortConfigurationString,
  typicalIonCharge,
  valenceElectrons,
} from '@/lib/chemistry'
import { ELEMENTS } from '@/data/elements'

describe('grundläggande räkning', () => {
  it('masstal = protoner + neutroner', () => {
    expect(massNumber(4, 5)).toBe(9)
    expect(massNumber(6, 8)).toBe(14)
  })
  it('laddning = protoner − elektroner', () => {
    expect(netCharge(4, 4)).toBe(0)
    expect(netCharge(4, 2)).toBe(2)
    expect(netCharge(16, 18)).toBe(-2)
  })
  it('neutroner = masstal − atomnummer', () => {
    expect(neutronCount(9, 4)).toBe(5)
    expect(neutronCount(35, 17)).toBe(18)
    expect(neutronCount(238, 92)).toBe(146)
  })
  it('elektroner i jon', () => {
    expect(electronsInIon(11, 1)).toBe(10)
    expect(electronsInIon(17, -1)).toBe(18)
    expect(electronsInIon(38, 2)).toBe(36)
  })
})

describe('notation', () => {
  it('jonbeteckningar', () => {
    expect(ionNotation('Be', 2)).toBe('Be²⁺')
    expect(ionNotation('Na', 1)).toBe('Na⁺')
    expect(ionNotation('Cl', -1)).toBe('Cl⁻')
    expect(ionNotation('S', -2)).toBe('S²⁻')
    expect(ionNotation('Al', 3)).toBe('Al³⁺')
    expect(ionNotation('O', 0)).toBe('O')
  })
  it('laddningsetiketter', () => {
    expect(chargeLabel(2)).toBe('2+')
    expect(chargeLabel(-1)).toBe('−')
    expect(chargeLabel(-3)).toBe('3−')
    expect(chargeLabel(0)).toBe('')
  })
  it('isotopbeteckningar', () => {
    expect(isotopeNotation('Be', 9)).toBe('⁹Be')
    expect(isotopeNotation('C', 14)).toBe('¹⁴C')
  })
  it('tolkar isotopskrivsätt', () => {
    expect(parseIsotope('9Be')).toEqual({ z: 4, massNumber: 9 })
    expect(parseIsotope('⁹Be')).toEqual({ z: 4, massNumber: 9 })
    expect(parseIsotope('Be-9')).toEqual({ z: 4, massNumber: 9 })
    expect(parseIsotope('kol-14')).toEqual({ z: 6, massNumber: 14 })
    expect(parseIsotope('xx')).toBeNull()
  })
})

describe('elektronkonfiguration', () => {
  it('skalfördelning för lätta ämnen', () => {
    expect(shellDistribution(1)).toEqual([1])
    expect(shellDistribution(8)).toEqual([2, 6])
    expect(shellDistribution(11)).toEqual([2, 8, 1])
    expect(shellDistribution(18)).toEqual([2, 8, 8])
    expect(shellDistribution(20)).toEqual([2, 8, 8, 2])
  })
  it('skalfördelning för tyngre ämnen', () => {
    expect(shellDistribution(26)).toEqual([2, 8, 14, 2])
    expect(shellDistribution(36)).toEqual([2, 8, 18, 8])
    expect(shellDistribution(38)).toEqual([2, 8, 18, 8, 2])
    expect(shellDistribution(46)).toEqual([2, 8, 18, 18])
    expect(shellDistribution(79)).toEqual([2, 8, 18, 32, 18, 1])
  })
  it('summan av elektronerna stämmer för alla 118 ämnen', () => {
    for (const el of ELEMENTS) {
      expect(shellDistribution(el.z).reduce((a, b) => a + b, 0)).toBe(el.z)
    }
  })
  it('konfigurationssträngar inklusive undantag', () => {
    expect(configurationString(11)).toBe('1s² 2s² 2p⁶ 3s¹')
    expect(shortConfigurationString(26)).toBe('[Ar] 4s² 3d⁶')
    expect(shortConfigurationString(24)).toBe('[Ar] 4s¹ 3d⁵')
    expect(shortConfigurationString(29)).toBe('[Ar] 4s¹ 3d¹⁰')
  })
  it('joner', () => {
    expect(shellDistribution(11, 10)).toEqual([2, 8])
    expect(shellDistribution(17, 18)).toEqual([2, 8, 8])
    expect(shellDistribution(16, 18)).toEqual([2, 8, 8])
    // Fe²⁺ tappar 4s-elektronerna först
    expect(shortConfigurationString(26, 24)).toBe('[Ar] 3d⁶')
  })
  it('ädelgasstruktur', () => {
    expect(hasNobleGasConfiguration(10)).toBe(true)
    expect(hasNobleGasConfiguration(11, 10)).toBe(true)
    expect(hasNobleGasConfiguration(17, 18)).toBe(true)
    expect(hasNobleGasConfiguration(11)).toBe(false)
    expect(hasNobleGasConfiguration(30, 28)).toBe(false)
  })
})

describe('periodiska systemet', () => {
  it('perioder', () => {
    expect(periodOf(1)).toBe(1)
    expect(periodOf(11)).toBe(3)
    expect(periodOf(38)).toBe(5)
    expect(periodOf(118)).toBe(7)
  })
  it('grupper', () => {
    expect(groupOf(1)).toBe(1)
    expect(groupOf(2)).toBe(18)
    expect(groupOf(6)).toBe(14)
    expect(groupOf(17)).toBe(17)
    expect(groupOf(26)).toBe(8)
    expect(groupOf(38)).toBe(2)
    expect(groupOf(58)).toBeNull()
    expect(groupOf(72)).toBe(4)
    expect(groupOf(86)).toBe(18)
    expect(groupOf(118)).toBe(18)
  })
  it('alla rutor är unika', () => {
    const keys = new Set(ELEMENTS.map((e) => JSON.stringify(gridPosition(e.z))))
    expect(keys.size).toBe(118)
  })
  it('valenselektroner och typiska joner', () => {
    expect(valenceElectrons(16)).toBe(6)
    expect(valenceElectrons(38)).toBe(2)
    expect(valenceElectrons(26)).toBeNull()
    expect(typicalIonCharge(38)).toBe(2)
    expect(typicalIonCharge(16)).toBe(-2)
    expect(typicalIonCharge(13)).toBe(3)
    expect(typicalIonCharge(7)).toBe(-3)
    expect(typicalIonCharge(18)).toBeNull()
    expect(typicalIonCharge(6)).toBeNull()
  })
})

describe('atomsimulatorn', () => {
  it('4 p + 5 n + 4 e = neutral beryllium-9', () => {
    const d = describeAtom(4, 5, 4)
    expect(d.element?.symbol).toBe('Be')
    expect(d.massNumber).toBe(9)
    expect(d.charge).toBe(0)
    expect(d.kind).toBe('neutral atom')
    expect(d.notation).toBe('⁹Be')
    expect(d.knownIsotope).toBe(true)
  })
  it('ta bort 2 elektroner → Be²⁺', () => {
    const d = describeAtom(4, 5, 2)
    expect(d.charge).toBe(2)
    expect(d.kind).toBe('positiv jon')
    expect(d.notation).toBe('⁹Be²⁺')
    expect(d.nobleGas).toBe(true)
  })
  it('lägg till en proton → nytt grundämne', () => {
    const before = describeAtom(4, 5, 4)
    const after = describeAtom(5, 5, 4)
    expect(after.element?.symbol).toBe('B')
    expect(after.charge).toBe(1)
    expect(explainChange(before, after)).toMatch(/bor/)
  })
  it('okänd isotop flaggas', () => {
    expect(describeAtom(4, 1, 4).knownIsotope).toBe(false)
    expect(explainChange(describeAtom(4, 5, 4), describeAtom(4, 1, 4))).toMatch(/inte i naturen/)
  })
  it('9F är inte samma sak som 9Be', () => {
    expect(describeAtom(9, 0, 9).element?.symbol).toBe('F')
    expect(describeAtom(4, 5, 4).element?.symbol).toBe('Be')
  })
})

describe('grundämnesdata', () => {
  it('innehåller 118 unika ämnen i ordning', () => {
    expect(ELEMENTS).toHaveLength(118)
    ELEMENTS.forEach((e, i) => expect(e.z).toBe(i + 1))
    expect(new Set(ELEMENTS.map((e) => e.symbol)).size).toBe(118)
  })
  it('varje ämne har minst en isotop med fler nukleoner än protoner (utom väte-1)', () => {
    for (const e of ELEMENTS) {
      expect(e.isotopes.length).toBeGreaterThan(0)
      for (const iso of e.isotopes) expect(iso.massNumber).toBeGreaterThanOrEqual(e.z)
    }
  })
  it('atommassan är inte alltid lika med masstalet', () => {
    const cl = ELEMENTS[16]
    expect(cl.mass).toBeCloseTo(35.45)
    expect(Number.isInteger(cl.mass)).toBe(false)
  })
})
