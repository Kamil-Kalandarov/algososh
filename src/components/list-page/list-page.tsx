import React, { FC, FormEvent, useState } from "react"
import styles from './list.module.css'
import { Input } from "../ui/input/input"
import { SolutionLayout } from "../ui/solution-layout/solution-layout"
import { Circle } from "../ui/circle/circle"
import { ArrowIcon } from "../ui/icons/arrow-icon"
import { Button } from "../ui/button/button"
import { TCircle } from "../../types/dataTypes"
import { ElementStates } from "../../types/element-states"
import { LinkedList } from "./utils"
import { delay } from "../../utils/utils"
import { DELAY_IN_MS } from "../../constants/delays"

export const ListPage: FC = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [inputIndex, setIndexValueInput] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [addToHeadOperation, setAddToHeadOperation] = useState<boolean>(false)
  const [addToTailOperation, setAddToTailOperation] = useState<boolean>(false)
  const [deleteHeadOperation, setDeleteHeadOperation] = useState<boolean>(false)
  const [deleteTailOperation, setDeleteTailOperation] = useState<boolean>(false)
  const [addByindexOperation, setAddByindexOperation] = useState<boolean>(false)
  const [deleteByindexOperation, setDeleteByindexOperation] = useState<boolean>(false)
  const [inputValueindex, setInputValueindex] = useState<number>()
  const [smalCircle, setSmalCircle] = useState<string>('')
  const [isAddingToHead, setIsAddingToHead] = useState<boolean>(false);
  const [isAddingToTail, setIsAddingTotail] = useState<boolean>(false);
  const [isAddingByIndex, setIsAddingByIndex] = useState<boolean>(false);
  const [isDeletingHead, setIsDeletingHead] = useState<boolean>(false);
  const [isDeletingTail, setIsDeletingTail] = useState<boolean>(false);
  const [isDeletingByIndex, setIsDeletingByIndex] = useState<boolean>(false);
 
  /* Создание  рандомного массива */
  const randomInteger = (min: number, max: number) => {
    let rand = min + Math.random() * (max + 1 - min)
    return Math.floor(rand)
  };

  /* Создание экземпляра класса LinkedList и передачеа ему дефолтного значения в виде массива случайных чисел */
  const [list] = useState(() => new LinkedList<string>(
    Array.from({ length: 4 }, () => (randomInteger(0, 99).toString()))
  ));

  /* Стейт элементов для рендера */
  const [listArray, setListArray] = useState<TCircle[]>(list.getArrWithColor());

  /* Хендлер изменения значения инпута */
  const handleInputValue = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setInputValue(value)
  };
  /* Хендлер изменения значения инпута для индекса */
  const handleInputIndex = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setIndexValueInput(value)
  };

  /* Отмена перезагрузки страницы при клике по кнопке */
  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault()
  }
  
  /* Функция добавления элемента в начало массива */
  const addToHead = async () => {
    if(listArray.length < 12) {
      /* Поставить тип операции AddToHead */
      setIsAddingToHead(true)
      /* Включить лоадер */
      setIsLoading(true)
      /* Установить индекс 0 для новго элемента */
      setInputValueindex(0)
      /* Установить флаг начала операции AddToHead */
      setAddToHeadOperation(true)
      /* Задержка для анимации */
      await delay(DELAY_IN_MS)
      /* Вызов метода prepend и передача ему в аргументы значение инпута */
      list.prepend(inputValue)
      /* установить флаг завершения операции AddToHead */
      setAddToHeadOperation(false)
      /* создание нового массива при помощи метода getArrWithColor */
      const newArray = list.getArrWithColor()
      /* Присовение цвета элементу по 0 индесом элементу */
      newArray[0].color = ElementStates.Modified
      /* обновление стейта */
      setListArray(newArray)
      /* Задержка для анимации */
      await delay(DELAY_IN_MS)
      /* Присовение цвета элементу по 0 индесом элементу */
      newArray[0].color = ElementStates.Default
      /* обновление стейта */
      setListArray(newArray)
    }
    /* обнуление инпута */
    setInputValue('')
    /* отклбчение лоадера */
    setIsLoading(false)
    /* обнуления типа операции */
    setIsAddingToHead(false)
  };

  /* Функция добавления элемента в конец массива */
  const addToTail = async () => {
    if(list.listLength < 12) {
      /* поставить тип операции AddToTail */
      setIsAddingTotail(true)
      /* Включить лоадер */
      setIsLoading(true)
      /* Установить индекс последнего элемента массива  для новго элемента */
      setInputValueindex(list.listLength - 1)
      /* Установить флаг начала операции AddToTail */
      setAddToTailOperation(true)
      /* Задержка для анимации */
      await delay(DELAY_IN_MS)
      /* Вызов метода append и передача ему в аргументы значение инпута */
      list.append(inputValue)
      /* установить флаг завершения операции AddToTail */
      setAddToTailOperation(false)
      /* создание нового массива при помощи метода getArrWithColor */
      const newArr = list.getArrWithColor()
      /* Присовение цвета последнему элементу */
      newArr[newArr.length - 1].color = ElementStates.Modified
      /* обновление стейта */
      setListArray(newArr)
      /* Задержка для анимации */
      await delay(DELAY_IN_MS)
      /* Присовение цвета последнему элементу */
      newArr[newArr.length - 1].color = ElementStates.Default
      /* Обновление стейта */
      setListArray(newArr)
    }
    /* Обнуление инпута */
    setInputValue('')
    /* Отклбчение лоадера */
    setIsLoading(false)
    /* Обнуления типа операции */
    setIsAddingTotail(false)
  };

  /* Функция удаления элемента из начала массива */
  const deleteHead = async () => {
    /* Если длинна массива больше 0, то изменить следующие состояния */
    if (list.listLength > 0) {
      /* Создание нового массива при помощи метода getArrWithColor */
      const newArr = list.getArrWithColor()
      /* Присвоение значения для маленького кружочка */
      setSmalCircle(newArr[0].value)
      /* поставить тип операции deleteHead */
      setIsDeletingHead(true)
      /* Включение лоадера */
      setIsLoading(true)
      /* Установить флаг начала операции deleteHead */
      setDeleteHeadOperation(true)
      /* Установить индекс 0 для удалямого элемента */
      setInputValueindex(0)
      /* Обнуление значения для элемента под 0 индексом */
      newArr[0].value = ''
      /* Обновление стейта */
      setListArray(newArr)
      /* Задержка для анимации */
      await delay(DELAY_IN_MS)
      /* Вызов метода удаления элемента deleteHead */
      list.deleteHead()
      /* Установить флаг окончания операции deleteHead */
      setDeleteHeadOperation(false)
      /* Обновление стейта после удаления первого элемента массива */
      setListArray(list.getArrWithColor())
    }
    /* Отключение лоадера */
    setIsLoading(false)
    /* Обнуление типа операции */
    setIsDeletingHead(false)
  };

  /* Функция удаления элемента из конца массива */
  const deleteTail = async () => {
    /* Если длинна массива больше 0, то изменить следующие состояния */
    if (list.listLength > 0) {
      /* Создание нового массива при помощи метода getArrWithColor */
      const newArr = list.getArrWithColor()
      /* Присвоение значения для маленького кружочка */
      setSmalCircle(newArr[newArr.length - 1].value)
      /* Поставить тип операции DeleteTail */
      setIsDeletingTail(true)
      /* Включение лоадера */
      setIsLoading(true)
      /* Установить флаг начала операции DeleteTail */
      setDeleteTailOperation(true)
      /* Присвоение индекса последнему элементу   */
      setInputValueindex(list.listLength - 1)
      /* Обнуление значения для элемента под последним индексом индексом */
      newArr[newArr.length - 1].value = ''
      /* Обновление стейта */
      setListArray(newArr)
      /* Задержка для анимации */
      await delay(DELAY_IN_MS)
      /* Вызов метода удаления элемента deleteTail */
      list.deleteTail()
      /* Установить флаг окончания операции deleteTail */
      setDeleteTailOperation(false)
      /* Обновление стейта после удаления последнего элемента массива */
      setListArray(list.getArrWithColor())
    }
    /* Отключение лоадера */
    setIsLoading(false)
    /* Обнуление типа операции */
    setIsDeletingTail(false)
  };

  /* Функция добавления элемента по индексу */
  const addByindex = async () => {
    /* Если есть значение инпута, то */
    if (Number(inputIndex) < 11 && list.listLength < 12) {
      /* Поставить тип операции AddByindex */
      setIsAddingByIndex(true)
      /* Включить лоадер */
      setIsLoading(true)
      /* Установить флаг начала операции addByindex */
      setAddByindexOperation(true)
      /* Создание нового массива при помощи метода getArrWithColor */
      const newArr = list.getArrWithColor()
      /* До тех пор пока индекс текущего элемент меньше или равен значения индекса в инпуте, 
      пирсваивать в InputValueindex индекс текущего элемента */
      for (let i = 0; i <= Number(inputIndex); i++) {
        setInputValueindex(i)
        /* Задержка для анимации */
        await delay(DELAY_IN_MS)
        /* Если индекс текущего элемент меньше значения индекса в инпуте, то присваивать ему зеленый цвет */
        if (i < Number(inputIndex)) {
          newArr[i].color = ElementStates.Changing
          /* Обновить стейт */
          setListArray(newArr)
        }
      }
      /* Установить флаг окончания операции addByindex */
      setAddByindexOperation(false)
      /* Добавить элемент в массив методом addByIndex */
      list.addByIndex(inputValue, Number(inputIndex))
      /* Создание нового массива при помощи метода getArrWithColor */
      const finalArr = list.getArrWithColor()
      /* Изменить цвет нового элемента */
      finalArr[Number(inputIndex)].color = ElementStates.Modified
      /* Обновить стейт */
      setListArray(finalArr)
      /* Задержка для анимации */
      await delay(DELAY_IN_MS)
      /* Изменить цвет элемента */
      finalArr[Number(inputIndex)].color = ElementStates.Default
      /* Обновить стейт */
      setListArray(finalArr)
    }
    /* Отключить лоадер */
    setIsLoading(false)
    /* Обнулить значения инпутов */
    setIndexValueInput('')
    setInputValue('')
    /* Обнулить тип операции */
    setIsAddingByIndex(false)
    /* setIsAddingToHeadByIndex(false) */
  };

  /* Функция удаления элемента по индексу */
  const deleteByindex = async () => {
    /* Если есть значение инпута, то */
    if (Number(inputIndex) < list.listLength) {
      /* Поставить тип операции deleteByindex */
      setIsDeletingByIndex(true)
      /* Включить лоадер */
      setIsLoading(true)
      /* Создание нового массива при помощи метода getArrWithColor */
      const newArr = list.getArrWithColor()
      /* До тех пор пока индекс текущего элемент меньше или равен значению индекса в инпуте, 
      делать задержку для анимации и присваивать элементу фиолетовый цвет и обновлять состояние стейта */
      for (let i = 0; i <= Number(inputIndex); i++) {
        newArr[i].color = ElementStates.Changing
        await delay(DELAY_IN_MS)
        setListArray([...newArr])
      }
      /* Задержка для анимации */
      await delay(DELAY_IN_MS)
      /* Присвоение значения для маленького кружочка */
      setSmalCircle(newArr[Number(inputIndex)].value)
      newArr[Number(inputIndex)].value = ''
      setDeleteByindexOperation(true)
      newArr[Number(inputIndex)].color = ElementStates.Default
      setInputValueindex(Number(inputIndex))
      /* Задержка для анимации */
      await delay(DELAY_IN_MS)
      /* Удаление элемента методом deleteByIndex */
      list.deleteByIndex(Number(inputIndex))
      /* Обновление стейта с элементами */
      setListArray(list.getArrWithColor())
      /* Утсановка флага окончания операции setDeleteByindexOperation */
      setDeleteByindexOperation(false)
      /* Отключение лоадера */
      setIsLoading(false)
      /* Обнуление типа операции */
      setIsDeletingByIndex(false)
      /* Обнуление инпута */
      setIndexValueInput('')
    }
  };

  /* Функция присвоения надписи head над первым элементом */
  const getHead = (index: number) => {
    if (index === 0 && !addToHeadOperation && !addByindexOperation) {
      return 'head'
    } else if (index === 0 && addByindexOperation && inputValueindex !== 0) {
      return 'head'
    } else {
      return ''
    }
  };

  /* Функция присвоения надписи tail над последним элементом */
  const getTail = (index: number) => {
    if (index === listArray.length - 1 && !deleteTailOperation && !deleteByindexOperation) {
      return 'tail'
    } else if (listArray.length === 1) {
      return ''
    } else if (deleteByindexOperation && index === listArray.length - 1) {
      return ''
    } else {
      return ''
    }
  };

  /* Рендер элементов */
  const elements = listArray.map((item: any, index: number) => {
    return (
    <li className={styles.list__listItem} key={index}>
      {isLoading === true && (addToHeadOperation === true || addToTailOperation === true || addByindexOperation === true) 
        && index === inputValueindex &&
        <div className={styles.list__smallTopElement}>
          <Circle 
            isSmall={true} 
            letter={inputValue} 
            state={ElementStates.Changing} 
          />
        </div>
      }
      {listArray.length - 1 !== index &&
        <div className={styles.list__arrow}>
          <ArrowIcon />
        </div>}
      <div className={styles.list__element}>
        <Circle
          index={index}
          head={getHead(index)}
          tail={getTail(index)}
          letter={item.value}
          state={item.color}
        />
      </div>
      {isLoading === true && (deleteHeadOperation === true || deleteTailOperation === true || deleteByindexOperation === true) 
        && index === inputValueindex &&
        <div className={styles.list__smallBottomElement}>
          <Circle 
            isSmall={true} 
            letter={smalCircle} 
            state={ElementStates.Changing} 
          />
        </div>
      }
    </li>
    )
  });

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.list}>
        <div>
          <div className={styles.list__navContainer}>
            <form className={styles.list__form} onSubmit={handleSubmit}>
              <div className={styles.list__inputContainer}>
                <Input 
                  placeholder='Введите занчение'
                  maxLength={4}
                  isLimitText={true} 
                  value={inputValue}
                  onChange={handleInputValue}
                />
              </div>
              <div className={styles.list__btnsContainer}>
                <Button 
                  text='Добавить в head' 
                  onClick={addToHead} 
                  disabled={listArray.length === 12 || !inputValue || isAddingToTail || isAddingByIndex || 
                    isDeletingHead || isDeletingTail || isDeletingByIndex}
                  isLoader={isAddingToHead}
                />
                <Button 
                  text='Добавить в tail'   
                  onClick={addToTail}
                  disabled={listArray.length === 12 || !inputValue || isAddingToHead || isAddingByIndex || 
                    isDeletingHead || isDeletingTail || isDeletingByIndex}
                  isLoader={isAddingToTail}
                />
                <Button 
                  text='Удалить из head' 
                  onClick={deleteHead} 
                  disabled={isAddingToHead || listArray.length === 0 || isAddingByIndex || isAddingToTail || 
                    isDeletingTail || isDeletingByIndex}
                  isLoader={isDeletingHead}
                />
                <Button 
                  text='Удалить из tail' 
                  onClick={deleteTail} 
                  disabled={isAddingToHead || listArray.length === 0 || isAddingByIndex || isAddingToTail || 
                    isDeletingHead || isDeletingByIndex}
                  isLoader={isDeletingTail}
                />
              </div>
            </form>
          </div> 
          <div className={styles.list__navContainer}>
            <form className={styles.list__form} onSubmit={handleSubmit}>
              <div className={styles.list__inputContainer}>
                <Input 
                  placeholder='Введите индекс'
                  value={inputIndex}
                  maxLength={2}
                  max={11}
                  isLimitText={true} 
                  onChange={handleInputIndex}
                  type='number'
                />
              </div>
              <div className={styles.list__btnsContainer}>
                <Button 
                  text='Добавить по индексу'
                  extraClass={styles.list__button}
                  onClick={addByindex}
                  disabled={listArray.length === 12 || !listArray || !inputValue || !inputIndex || isAddingToTail || 
                    isAddingToHead || isDeletingHead || isDeletingTail || isDeletingByIndex}
                  isLoader={isAddingByIndex}
                />
                <Button 
                  text='Удалить по индексу'
                  extraClass={styles.list__button}
                  onClick={deleteByindex}
                  disabled={listArray.length === 0 || Number(inputIndex) > 11 || !inputIndex || isAddingToTail || isAddingToHead || 
                    isDeletingHead || isDeletingTail || isAddingByIndex}
                  isLoader={isDeletingByIndex}
                />
              </div>
            </form>
          </div>
        </div>
        <div className={styles.list__elementsContainer}>
          {elements}
        </div>
      </div>
    </SolutionLayout>
  )
}
