import React from 'react';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from "recoil"


const sleep = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 3000)
  })
}
const textState = atom({
  key: "textState",
  default: ""
})
const asyncSelector = selector({
  key: "charCountState",
  get: async ({get}: any) => {
    await sleep()
    return 12
  }
})

const throwExceptionSelector = selector({
  key: "throwExceptionSelector",
  get: async ({get}: any) => {
    throw Error("error")
  }
})

function CharacterCount() {
  const count  = useRecoilValue(throwExceptionSelector)
  return <>Count: {count}</>
}

function TextInput() {
  const [text, setText] = useRecoilState(textState)
  const onChange = (e: any) => {
    setText(e.target.value)
  }
  return <input onChange={onChange} value={text}></input>
}

function CharacterCounter() {
  return (
    <div>
      <TextInput />
      <React.Suspense fallback={<div>Loading</div>}>
        <CharacterCount />
      </React.Suspense>
    </div>
  )
}

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <CharacterCounter />   
      </div>
    </RecoilRoot>
  );
}

export default App;
