import React, { useEffect, useState } from 'react'

const Form = (props) => {

    const [error,setError] = useState({})
    const [catagory,setCatagory] = useState('')
    const [amount,setAmount] = useState(0)
    const [date,setDate] = useState('')

    const HandleSubmit = (e)=>{
        e.preventDefault()
        if(catagory === ''){
            setError({...error,title:"sample"})
        }
        else if(amount === 0){
            setError({...error,amount:"sample"})
        }
        else{
            if(props.isEdit){
                props.handleClick({catagory,amount,date,id:props.editData._id})
            }
            else{
                console.log(catagory,amount,date)
                props.handleClick({catagory,amount,date})
            }
            setCatagory('')
            setAmount(0)
            setDate('')
        }
    }

    function changeTitle(e){
        setCatagory(e.target.value)
    }

    function changeAmount(e){
        setAmount(e.target.value)
    }

    function changeDate(e){
        setDate(e.target.value)
    }

    useEffect(()=>{
        if(props.isEdit){
            setCatagory(props.editData.catagory)
            setAmount(props.editData.amount)
            setDate(props.editData.date)
        }
    },[props.isEdit])

  return (
    <form className='form' onSubmit={HandleSubmit}>
        <div className='input-container'>
            <h2>Title</h2>
            <input type='text' className='input' onChange={changeTitle} value={catagory}></input>
            {error.title && <div className='error'>Title not defined</div>}
            <h2>Amount</h2>
            <input type='number' className='input' onChange={changeAmount} value={amount}></input>
            {error.amount && <div className='error'>Amount not defined</div>}
            <h2>Date</h2>
            <input type='date' className='input' onChange={changeDate} value={date}></input>
            {/* {error.date && <div className='error'>Amount not defined</div>} */}
            <button type='submit'>Add Transaction</button>
        </div>
    </form>
  )
}

export default Form