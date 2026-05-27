export type Item = {
    id: string
    name: string
    emoji: string
    weight: number
}

export const items: Item[] = [
    {id: 'ant', name: 'あり', emoji: '🐜', weight: 1},
    {id: 'feather', name: 'はね', emoji: '🪶', weight: 1},
    {id: 'balloon', name: 'ふうせん', emoji: '🎈', weight: 1},

    {id: 'pencil', name: 'えんぴつ', emoji: '✏️', weight: 2},
    {id: 'grape', name: 'ぶどう', emoji: '🍇', weight: 2},

    {id: 'apple', name: 'りんご', emoji: '🍎', weight: 3},
    {id: 'ball', name: 'ボール', emoji: '⚽', weight: 3},

    {id: 'banana', name: 'バナナ', emoji: '🍌', weight: 4},
    {id: 'rabbit', name: 'うさぎ', emoji: '🐰', weight: 4},

    {id: 'book', name: 'ほん', emoji: '📚', weight: 5},
    {id: 'cat', name: 'ねこ', emoji: '🐱', weight: 5},

    {id: 'pineapple', name: 'パイナップル', emoji: '🍍', weight: 6},
    {id: 'bicycle', name: 'じてんしゃ', emoji: '🚲', weight: 6},

    {id: 'watermelon', name: 'すいか', emoji: '🍉', weight: 7},
    {id: 'dog', name: 'いぬ', emoji: '🐶', weight: 7},

    {id: 'backpack', name: 'ランドセル', emoji: '🎒', weight: 8},
    {id: 'stone', name: 'いし', emoji: '🪨', weight: 8},

    {id: 'bear', name: 'くま', emoji: '🐻', weight: 10},
    {id: 'horse', name: 'うま', emoji: '🐴', weight: 15},

    {id: 'car', name: 'くるま', emoji: '🚗', weight: 20},

    {id: 'elephant', name: 'ぞう', emoji: '🐘', weight: 30},

    {id: 'bus', name: 'バス', emoji: '🚌', weight: 40},

    {id: 'rocket', name: 'ロケット', emoji: '🚀', weight: 100},
]
