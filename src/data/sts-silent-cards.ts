export interface StsSilentCard {
  name: string
  wiki: string
  rarity: 'Starter' | 'Common' | 'Uncommon' | 'Rare'
  type: 'Attack' | 'Skill' | 'Power'
  cost: string
  effectZh?: string
  effect: string
  score?: number
}

export interface StsSilentCardGroup {
  rarity: 'Starter' | 'Common' | 'Uncommon' | 'Rare'
  title: string
  cards: StsSilentCard[]
}

function toZhEffect(effect: string): string {
  const replacements: Array<[string, string]> = [
    ['to ALL enemies', '对所有敌人'],
    ['ALL enemies', '所有敌人'],
    ['Draw cards until you have', '抽牌直到你手牌达到'],
    ['Draw 2 more cards next turn', '下回合额外抽 2 张牌'],
    ['Draw 1 card', '抽 1 张牌'],
    ['Draw 2 cards', '抽 2 张牌'],
    ['Draw 3(4) cards', '抽 3(4) 张牌'],
    ['Discard your hand, then draw that many cards', '弃掉你的手牌，然后抽等量张牌'],
    ['Discard your hand', '弃掉你的手牌'],
    ['Discard all non-Attack cards in your hand', '弃掉你手中所有非攻击牌'],
    ['Discard 1 card at random', '随机弃 1 张牌'],
    ['Discard 1 card', '弃 1 张牌'],
    ['Discard 3(2) cards', '弃 3(2) 张牌'],
    ['Deal 4(6) damage to ALL enemies twice', '对所有敌人造成 4(6) 点伤害 2 次'],
    ['Deal 7(9) damage. Apply 1(2) Weak', '造成 7(9) 点伤害。施加 1(2) 层虚弱'],
    ['Deal 3(4) damage. Apply 1(2) Weak', '造成 3(4) 点伤害。施加 1(2) 层虚弱'],
    ['Deal', '造成'],
    ['damage', '点伤害'],
    ['Gain', '获得'],
    ['Block', '格挡'],
    ['Weak', '虚弱'],
    ['Vulnerable', '易伤'],
    ['Poison', '中毒'],
    ['Strength', '力量'],
    ['Dexterity', '敏捷'],
    ['Energy', '能量'],
    ['Exhaust', '消耗'],
    ['Innate', '固有'],
    ['Intangible', '虚无'],
    ['Unplayable', '无法打出'],
    ['Retain', '保留'],
    ['At the start of your turn', '在你的回合开始时'],
    ['At the end of your turn', '在你的回合结束时'],
    ['Next turn', '下回合'],
    ['this turn', '本回合'],
    ['for each', '每'],
    ['costs 0 this turn', '本回合费用变为 0'],
    ['random enemy', '随机敌人'],
    ['enemy', '敌人'],
    ['Attacks', '攻击牌'],
    ['Attack', '攻击牌'],
    ['Skill', '技能牌'],
    ['Power', '能力牌'],
    ['Shiv', '小刀'],
    ['card(s)', '张牌'],
    ['card', '张牌']
  ]

  let zh = effect
  for (const [from, to] of replacements) {
    zh = zh.replaceAll(from, to)
  }
  return zh
}

export const stsSilentCards: StsSilentCard[] = [
  {
    name: 'Defend',
    wiki: 'Defend_(Silent)',
    rarity: 'Starter',
    type: 'Skill',
    cost: '1',
    effect: 'Gain 5(8) Block.'
  },
  {
    name: 'Neutralize',
    wiki: 'Neutralize',
    rarity: 'Starter',
    type: 'Attack',
    cost: '0',
    effect: 'Deal 3(4) damage. Apply 1(2) Weak.'
  },
  {
    name: 'Strike',
    wiki: 'Strike_(Silent)',
    rarity: 'Starter',
    type: 'Attack',
    cost: '1',
    effect: 'Deal 6(9) damage.'
  },
  {
    name: 'Survivor',
    wiki: 'Survivor',
    rarity: 'Starter',
    type: 'Skill',
    cost: '1',
    effect: 'Gain 8(11) Block. Discard a card.'
  },

  {
    name: 'Acrobatics',
    wiki: 'Acrobatics',
    rarity: 'Common',
    type: 'Skill',
    cost: '1',
    effect: 'Draw 3(4) cards. Discard 1 card.'
  },
  {
    name: 'Backflip',
    wiki: 'Backflip',
    rarity: 'Common',
    type: 'Skill',
    cost: '1',
    effect: 'Gain 5(8) Block. Draw 2 cards.'
  },
  {
    name: 'Bane',
    wiki: 'Bane',
    rarity: 'Common',
    type: 'Attack',
    cost: '1',
    effect: 'Deal 7(10) damage. If the enemy is Poison, deal 7(10) damage again.'
  },
  {
    name: 'Blade Dance',
    wiki: 'Blade_Dance',
    rarity: 'Common',
    type: 'Skill',
    cost: '1',
    effect: 'Add 3(4) Shiv to your hand.'
  },
  {
    name: 'Cloak And Dagger',
    wiki: 'Cloak_And_Dagger',
    rarity: 'Common',
    type: 'Skill',
    cost: '1',
    effect: 'Gain 6 Block. Add 1(2) Shiv to your hand.'
  },
  {
    name: 'Dagger Spray',
    wiki: 'Dagger_Spray',
    rarity: 'Common',
    type: 'Attack',
    cost: '1',
    effect: 'Deal 4(6) damage to ALL enemies twice.'
  },
  {
    name: 'Dagger Throw',
    wiki: 'Dagger_Throw',
    rarity: 'Common',
    type: 'Attack',
    cost: '1',
    effect: 'Deal 9(12) damage. Draw 1 card. Discard 1 card.'
  },
  {
    name: 'Deadly Poison',
    wiki: 'Deadly_Poison',
    rarity: 'Common',
    type: 'Skill',
    cost: '1',
    effect: 'Apply 5(7) Poison.'
  },
  {
    name: 'Deflect',
    wiki: 'Deflect',
    rarity: 'Common',
    type: 'Skill',
    cost: '0',
    effect: 'Gain 4(7) Block.'
  },
  {
    name: 'Dodge and Roll',
    wiki: 'Dodge_and_Roll',
    rarity: 'Common',
    type: 'Skill',
    cost: '1',
    effect: 'Gain 4(6) Block. Next turn, gain 4(6) Block.'
  },
  {
    name: 'Flying Knee',
    wiki: 'Flying_Knee',
    rarity: 'Common',
    type: 'Attack',
    cost: '1',
    effect: 'Deal 8(11) damage. Next turn, gain 1 Energy.'
  },
  {
    name: 'Outmaneuver',
    wiki: 'Outmaneuver',
    rarity: 'Common',
    type: 'Skill',
    cost: '1',
    effect: 'Next turn, gain 2(3) Energy.'
  },
  {
    name: 'Piercing Wail',
    wiki: 'Piercing_Wail',
    rarity: 'Common',
    type: 'Skill',
    cost: '1',
    effect: 'ALL enemies lose 6(8) Strength for 1 turn. Exhaust.'
  },
  {
    name: 'Poisoned Stab',
    wiki: 'Poisoned_Stab',
    rarity: 'Common',
    type: 'Attack',
    cost: '1',
    effect: 'Deal 6(8) damage. Apply 3(4) Poison.'
  },
  {
    name: 'Prepared',
    wiki: 'Prepared',
    rarity: 'Common',
    type: 'Skill',
    cost: '0',
    effect: 'Draw 1(2) card(s). Discard 1(2) card(s).'
  },
  {
    name: 'Quick Slash',
    wiki: 'Quick_Slash',
    rarity: 'Common',
    type: 'Attack',
    cost: '1',
    effect: 'Deal 8(12) damage. Draw 1 card.'
  },
  {
    name: 'Slice',
    wiki: 'Slice',
    rarity: 'Common',
    type: 'Attack',
    cost: '0',
    effect: 'Deal 6(9) damage.'
  },
  {
    name: 'Sneaky Strike',
    wiki: 'Sneaky_Strike',
    rarity: 'Common',
    type: 'Attack',
    cost: '2',
    effect: 'Deal 12(16) damage. If you have discarded a card this turn, gain 2 Energy.'
  },
  {
    name: 'Sucker Punch',
    wiki: 'Sucker_Punch',
    rarity: 'Common',
    type: 'Attack',
    cost: '1',
    effect: 'Deal 7(9) damage. Apply 1(2) Weak.'
  },

  {
    name: 'Accuracy',
    wiki: 'Accuracy',
    rarity: 'Uncommon',
    type: 'Power',
    cost: '1',
    effect: 'Shiv deal 4(6) additional damage.'
  },
  {
    name: 'All-Out Attack',
    wiki: 'All-Out_Attack',
    rarity: 'Uncommon',
    type: 'Attack',
    cost: '1',
    effect: 'Deal 10(14) damage to ALL enemies. Discard 1 card at random.'
  },
  {
    name: 'Backstab',
    wiki: 'Backstab',
    rarity: 'Uncommon',
    type: 'Attack',
    cost: '0',
    effect: 'Deal 11(15) damage. Innate. Exhaust.'
  },
  {
    name: 'Blur',
    wiki: 'Blur',
    rarity: 'Uncommon',
    type: 'Skill',
    cost: '1',
    effect: 'Gain 5(8) Block. Block is not removed at the start of your next turn.'
  },
  {
    name: 'Bouncing Flask',
    wiki: 'Bouncing_Flask',
    rarity: 'Uncommon',
    type: 'Skill',
    cost: '2',
    effect: 'Apply 3 Poison to a random enemy 3(4) times.'
  },
  {
    name: 'Calculated Gamble',
    wiki: 'Calculated_Gamble',
    rarity: 'Uncommon',
    type: 'Skill',
    cost: '0',
    effect: "Discard your hand, then draw that many cards. Exhaust. (Don't exhaust when upgraded.)"
  },
  {
    name: 'Caltrops',
    wiki: 'Caltrops',
    rarity: 'Uncommon',
    type: 'Power',
    cost: '1',
    effect: 'Whenever you are attacked, deal 3(5) damage back.'
  },
  {
    name: 'Catalyst',
    wiki: 'Catalyst',
    rarity: 'Uncommon',
    type: 'Skill',
    cost: '1',
    effect: "Double(Triple) an enemy's Poison. Exhaust."
  },
  {
    name: 'Choke',
    wiki: 'Choke',
    rarity: 'Uncommon',
    type: 'Attack',
    cost: '2',
    effect: 'Deal 12 damage. Whenever you play a card this turn, the targeted enemy loses 3(5) HP.'
  },
  {
    name: 'Concentrate',
    wiki: 'Concentrate',
    rarity: 'Uncommon',
    type: 'Skill',
    cost: '0',
    effect: 'Discard 3(2) cards. Gain 2 Energy.'
  },
  {
    name: 'Crippling Cloud',
    wiki: 'Crippling_Cloud',
    rarity: 'Uncommon',
    type: 'Skill',
    cost: '2',
    effect: 'Apply 4(7) Poison and 2 Weak to ALL enemies. Exhaust.'
  },
  {
    name: 'Dash',
    wiki: 'Dash',
    rarity: 'Uncommon',
    type: 'Attack',
    cost: '2',
    effect: 'Gain 10(13) Block. Deal 10(13) damage.'
  },
  {
    name: 'Distraction',
    wiki: 'Distraction',
    rarity: 'Uncommon',
    type: 'Skill',
    cost: '1(0)',
    effect: 'Add a random Skill to your hand. It costs 0 this turn. Exhaust.'
  },
  {
    name: 'Endless Agony',
    wiki: 'Endless_Agony',
    rarity: 'Uncommon',
    type: 'Attack',
    cost: '0',
    effect: 'Whenever you draw this card, add a copy of it to your hand. Deal 4(6) damage. Exhaust.'
  },
  {
    name: 'Escape Plan',
    wiki: 'Escape_Plan',
    rarity: 'Uncommon',
    type: 'Skill',
    cost: '0',
    effect: 'Draw 1 card. If you draw a Skill, gain 3(5) Block.'
  },
  {
    name: 'Eviscerate',
    wiki: 'Eviscerate',
    rarity: 'Uncommon',
    type: 'Attack',
    cost: '3',
    effect: 'Costs 1 less Energy for each card discarded this turn. Deal 7(9) damage three times.'
  },
  {
    name: 'Expertise',
    wiki: 'Expertise',
    rarity: 'Uncommon',
    type: 'Skill',
    cost: '1',
    effect: 'Draw cards until you have 6(7) in your hand.'
  },
  {
    name: 'Finisher',
    wiki: 'Finisher',
    rarity: 'Uncommon',
    type: 'Attack',
    cost: '1',
    effect: 'Deal 6(8) damage for each Attack played this turn.'
  },
  {
    name: 'Flechettes',
    wiki: 'Flechettes',
    rarity: 'Uncommon',
    type: 'Attack',
    cost: '1',
    effect: 'Deal 4(6) damage for each Skill in your hand.'
  },
  {
    name: 'Footwork',
    wiki: 'Footwork',
    rarity: 'Uncommon',
    type: 'Power',
    cost: '1',
    effect: 'Gain 2(3) Dexterity.'
  },
  {
    name: 'Heel Hook',
    wiki: 'Heel_Hook',
    rarity: 'Uncommon',
    type: 'Attack',
    cost: '1',
    effect: 'Deal 5(8) damage. If the enemy is Weak, gain 1 Energy and draw 1 card.'
  },
  {
    name: 'Infinite Blades',
    wiki: 'Infinite_Blades',
    rarity: 'Uncommon',
    type: 'Power',
    cost: '1',
    effect: '(Innate when upgraded.) At the start of your turn, add a Shiv to your hand.'
  },
  {
    name: 'Leg Sweep',
    wiki: 'Leg_Sweep',
    rarity: 'Uncommon',
    type: 'Skill',
    cost: '2',
    effect: 'Apply 2(3) Weak. Gain 11(14) Block.'
  },
  {
    name: 'Masterful Stab',
    wiki: 'Masterful_Stab',
    rarity: 'Uncommon',
    type: 'Attack',
    cost: '0',
    effect: 'Costs 1 additional Energy for each time you lose HP this combat. Deal 12(16) damage.'
  },
  {
    name: 'Noxious Fumes',
    wiki: 'Noxious_Fumes',
    rarity: 'Uncommon',
    type: 'Power',
    cost: '1',
    effect: 'At the start of your turn, apply 2(3) Poison to ALL enemies.'
  },
  {
    name: 'Predator',
    wiki: 'Predator',
    rarity: 'Uncommon',
    type: 'Attack',
    cost: '2',
    effect: 'Deal 15(20) damage. Draw 2 more cards next turn.'
  },
  {
    name: 'Reflex',
    wiki: 'Reflex',
    rarity: 'Uncommon',
    type: 'Skill',
    cost: 'Unplayable',
    effect: 'If this card is discarded from your hand, draw 2(3) cards.'
  },
  {
    name: 'Riddle With Holes',
    wiki: 'Riddle_With_Holes',
    rarity: 'Uncommon',
    type: 'Attack',
    cost: '2',
    effect: 'Deal 3(4) damage 5 times.'
  },
  {
    name: 'Setup',
    wiki: 'Setup',
    rarity: 'Uncommon',
    type: 'Skill',
    cost: '1(0)',
    effect: 'Place a card in your hand on top of your draw pile. It costs 0 until it is played.'
  },
  {
    name: 'Skewer',
    wiki: 'Skewer',
    rarity: 'Uncommon',
    type: 'Attack',
    cost: 'X',
    effect: 'Deal 7(10) damage X times.'
  },
  {
    name: 'Tactician',
    wiki: 'Tactician',
    rarity: 'Uncommon',
    type: 'Skill',
    cost: 'Unplayable',
    effect: 'If this card is discarded from your hand, gain 1(2) Energy.'
  },
  {
    name: 'Terror',
    wiki: 'Terror',
    rarity: 'Uncommon',
    type: 'Skill',
    cost: '1(0)',
    effect: 'Apply 99 Vulnerable. Exhaust.'
  },
  {
    name: 'Well-Laid Plans',
    wiki: 'Well-Laid_Plans',
    rarity: 'Uncommon',
    type: 'Power',
    cost: '1',
    effect: 'At the end of your turn, Retain up to 1(2) card(s).'
  },

  {
    name: 'A Thousand Cuts',
    wiki: 'A_Thousand_Cuts',
    rarity: 'Rare',
    type: 'Power',
    cost: '2',
    effect: 'Whenever you play a card, deal 1(2) damage to ALL enemies.'
  },
  {
    name: 'Adrenaline',
    wiki: 'Adrenaline',
    rarity: 'Rare',
    type: 'Skill',
    cost: '0',
    effect: 'Gain 1(2) Energy. Draw 2 cards. Exhaust.'
  },
  {
    name: 'After Image',
    wiki: 'After_Image',
    rarity: 'Rare',
    type: 'Power',
    cost: '1',
    effect: '(Innate when upgraded.) Whenever you play a card, gain 1 Block.'
  },
  {
    name: 'Alchemize',
    wiki: 'Alchemize',
    rarity: 'Rare',
    type: 'Skill',
    cost: '1(0)',
    effect: 'Obtain a random potion. Exhaust.'
  },
  {
    name: 'Bullet Time',
    wiki: 'Bullet_Time',
    rarity: 'Rare',
    type: 'Skill',
    cost: '3(2)',
    effect:
      'You cannot draw additional cards this turn. Reduce the cost of all cards in your hand to 0 this turn.'
  },
  {
    name: 'Burst',
    wiki: 'Burst',
    rarity: 'Rare',
    type: 'Skill',
    cost: '1',
    effect: 'This turn, your next 1(2) Skill(s) is(are) played twice.'
  },
  {
    name: 'Corpse Explosion',
    wiki: 'Corpse_Explosion',
    rarity: 'Rare',
    type: 'Skill',
    cost: '2',
    effect:
      'Apply 6(9) Poison. When the enemy dies, deal damage equal to its max HP to ALL enemies.'
  },
  {
    name: 'Die Die Die',
    wiki: 'Die_Die_Die',
    rarity: 'Rare',
    type: 'Attack',
    cost: '1',
    effect: 'Deal 13(17) damage to ALL enemies. Exhaust.'
  },
  {
    name: 'Doppelganger',
    wiki: 'Doppelganger',
    rarity: 'Rare',
    type: 'Skill',
    cost: 'X',
    effect: 'Next turn, draw X(+1) cards and gain X(+1) Energy.'
  },
  {
    name: 'Envenom',
    wiki: 'Envenom',
    rarity: 'Rare',
    type: 'Power',
    cost: '2(1)',
    effect: 'Whenever an attack deals unblocked damage, apply 1 Poison.'
  },
  {
    name: 'Glass Knife',
    wiki: 'Glass_Knife',
    rarity: 'Rare',
    type: 'Attack',
    cost: '1',
    effect: 'Deal 8(12) damage twice. Decrease the damage of this card by 2 this combat.'
  },
  {
    name: 'Grand Finale',
    wiki: 'Grand_Finale',
    rarity: 'Rare',
    type: 'Attack',
    cost: '0',
    effect:
      'Can only be played if there are no cards in your draw pile. Deal 50(60) damage to ALL enemies.'
  },
  {
    name: 'Malaise',
    wiki: 'Malaise',
    rarity: 'Rare',
    type: 'Skill',
    cost: 'X',
    effect: 'Enemy loses X(+1) Strength. Apply X(+1) Weak. Exhaust.'
  },
  {
    name: 'Nightmare',
    wiki: 'Nightmare',
    rarity: 'Rare',
    type: 'Skill',
    cost: '3(2)',
    effect: 'Choose a card. Next turn, add 3 copies of that card into your hand. Exhaust.'
  },
  {
    name: 'Phantasmal Killer',
    wiki: 'Phantasmal_Killer',
    rarity: 'Rare',
    type: 'Skill',
    cost: '1(0)',
    effect: 'On your next turn, your Attacks deal double damage.'
  },
  {
    name: 'Storm of Steel',
    wiki: 'Storm_of_Steel',
    rarity: 'Rare',
    type: 'Skill',
    cost: '1',
    effect: 'Discard your hand. Add 1 Shiv into your hand for each card discarded.'
  },
  {
    name: 'Tools of the Trade',
    wiki: 'Tools_of_the_Trade',
    rarity: 'Rare',
    type: 'Power',
    cost: '1(0)',
    effect: 'At the start of your turn, draw 1 card and discard 1 card.'
  },
  {
    name: 'Unload',
    wiki: 'Unload',
    rarity: 'Rare',
    type: 'Attack',
    cost: '1',
    effect: 'Deal 14(18) damage. Discard all non-Attack cards in your hand.'
  },
  {
    name: 'Wraith Form',
    wiki: 'Wraith_Form',
    rarity: 'Rare',
    type: 'Power',
    cost: '3',
    effect: 'Gain 2(3) Intangible. At the end of your turn, lose 1 Dexterity.'
  }
]

const rarityOrder: StsSilentCardGroup['rarity'][] = ['Starter', 'Common', 'Uncommon', 'Rare']

const rarityTitle: Record<StsSilentCardGroup['rarity'], string> = {
  Starter: '起始卡 Starter Cards',
  Common: '普通卡 Common Cards',
  Uncommon: '罕见卡 Uncommon Cards',
  Rare: '稀有卡 Rare Cards'
}

const stsSilentCardsBilingual: StsSilentCard[] = stsSilentCards.map((card) => ({
  ...card,
  effectZh: card.effectZh || toZhEffect(card.effect)
}))

export const stsSilentCardGroups: StsSilentCardGroup[] = rarityOrder.map((rarity) => ({
  rarity,
  title: rarityTitle[rarity],
  cards: stsSilentCardsBilingual.filter((card) => card.rarity === rarity)
}))
