import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import validation from 'Utils/Validation/Validation'
import Toast from 'Components/Toast/Toast'
import useToast from 'Utils/Hooks/useToast'
import { useInput } from 'Utils/Hooks/useInput'
import { usePopup } from 'Pages/Signup/usePopup'
import { FlexDiv, Input, InputTitle, LongButton } from 'Pages/Signup/Signup'

export default function CardPopup(props) {
  const { isShow, message, toast } = useToast()

  const cardInput1 = useRef(null)
  const cardInput2 = useRef(null)
  const cardInput3 = useRef(null)
  const cardInput4 = useRef(null)
  const cardInputs = [null, cardInput1, cardInput2, cardInput3, cardInput4]

  const [inputs, setInputs] = useState({
    card1: '',
    card2: '',
    card3: '',
    card4: '',
  })
  const { card1, card2, card3, card4 } = inputs

  const onChange = (event) => {
    const { name, value } = event.target
    let currentCardNum = Number(name[name.length - 1])
    //카드 정보 입력 (숫자인지 확인 && 4글자 까지만 입력 가능)
    if (!validation.isNumeric(value)) {
      toast('숫자만 입력하세요')
    } else if (value.length <= 4) {
      setInputs({
        ...inputs,
        [name]: value,
      })
    }

    //4글자를 다 치면 다음 칸 focuss
    if (value.length === 4) {
      if (currentCardNum < 4) {
        cardInputs[currentCardNum + 1].current.focus()
      }
    }
  } //onChange

  const resetInput = (event) => {
    const { name } = event.target
    setInputs({ ...inputs, [name]: '' })
  }

  const SubmitCardInfo = () => {
    if (card1 === '' || card2 === '' || card3 === '' || card4 === '') {
      alert('카드 정보를 모두 입력해주세요!')
      return
    }
    const cardNum = card1 + '-' + card2 + '-' + card3 + '-' + card4
    props.onSubmit(cardNum, false)
  }

  return (
    <>
      <Wrapper>
        <InputTitle>카드 정보를 입력해주세요</InputTitle>
        <FlexDiv>
          <CardInput
            type="text"
            name="card1"
            ref={cardInput1}
            value={card1}
            onChange={onChange}
            onClick={resetInput}
          />
          <CardInput
            type="text"
            name="card2"
            ref={cardInput2}
            value={card2}
            onChange={onChange}
            onClick={resetInput}
          />
          <CardInput
            type="text"
            name="card3"
            ref={cardInput3}
            value={card3}
            onChange={onChange}
            onClick={resetInput}
          />
          <CardInput
            type="text"
            name="card4"
            ref={cardInput4}
            value={card4}
            onChange={onChange}
            onClick={resetInput}
          />
        </FlexDiv>
        <LongButton clickHandler={SubmitCardInfo}>입력하기</LongButton>
        <Toast message={message} isShow={isShow} />
      </Wrapper>
    </>
  )
}

const CardInput = styled.input`
  margin: 0 0.5rem;
  text-align: center;
  width: 5rem;
  height: 5rem;
  border: 1px solid black;
`

// const CardInput = styled(Input)`
//   margin: 0 0.5rem;
//   text-align: center;
// `

const Wrapper = styled.div`
  width: 40rem;
  position: fixed;
  top: 40%;
  left: calc(50% - (40rem / 2));
  text-align: center;
  background-color: white;
  box-shadow: 0 0rem 2.5rem -0.8rem rgba(0, 0, 0, 0.5);
  font-size: 2rem;
  padding: 2rem;
  z-index: 999;
`
