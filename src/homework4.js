export const kolobok = (person) => {
  switch (person) {
    case 'бабушка':
      return 'Я от бабушки ушел!'
    case 'дедушка':
      return 'Я от дедушки ушел!'
    case 'заяц':
      return 'Я от зайца ушел!'
    case 'волк':
      return 'Я от волка ушел!'
    case 'лиса':
      return 'А лиса меня слопала!'
    default:
      return 'Не знаем такую сказу =)'
  }
}

export const newYear = (person) => {
  if (person === 'Дед Мороз' || person === 'Снегурочка') {
    return `${person}! ${person}! ${person}!`
  } else return 'Неизвестный персонаж!'
}
