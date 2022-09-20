import { calcSum } from '../src/homework7'

const correctObject = {
  Olga: 10,
  Ivan: 20,
  Petr: 15,
  Elena: 25,
  Andrey: 19
}

const incorrectFieldInObject = {
  Olga: 10,
  Ivan: 20,
  Petr: 'fff',
  Elena: 25,
  Andrey: 19
}

const emptyObject = {}

const undefinedObject = undefined

const nullObject = null

describe('Тестируем функцию calcSum', () => {
  test('Функция успешно импортирована', () => {
    expect(typeof calcSum).toBe('function')
  })

  test('Корректно суммирует оценки в объекте', () => {
    expect(calcSum(correctObject)).toBe(89)
  })

  test('Корректно обрабатывает объект с неправильными данными', () => {
    expect(calcSum(incorrectFieldInObject)).toBe(
      'Некорректное количество баллов для студента Petr. Процесс остановлен.'
    )
  })

  test('Корректно обрабатывает пустой объект', () => {
    expect(calcSum(emptyObject)).toBe('Переданный объект имеет некорректные данные или формат')
  })

  test('Корректно обрабатывает undefined', () => {
    expect(calcSum(undefinedObject)).toBe('Переданный объект имеет некорректные данные или формат')
  })

  test('Корректно обрабатывает null', () => {
    expect(calcSum(nullObject)).toBe('Переданный объект имеет некорректные данные или формат')
  })
})
