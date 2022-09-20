// написали функцию, которая складывает кол-во баллов всех учеников из объекта
export const calcSum = (scores) => {
  if (scores === null || scores === undefined || Object.keys(scores).length === 0) {
    return 'Переданный объект имеет некорректные данные или формат'
  } else {
    let result = 0
    for (let student in scores) {
      if (typeof scores[student] === 'number') {
        result += scores[student]
      } else return `Некорректное количество баллов для студента ${student}. Процесс остановлен.`
    }
    return result
  }
}
