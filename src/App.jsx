import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Item from "./components/Item";

function App() {
  const [income,setIncome] = useState(0)
  const [expense,setExpense] = useState(0)
  const [edit,setEdit] = useState(false)
  const [editData,setEditData] = useState({})

  const [data,setdata] = useState([])



  useEffect(()=>{
    fetch('https://expense-tracker-1-o1qn.onrender.com/getdata').then((res)=>{
      res.json().then((data)=>{
        setdata(data)
      })

    })
    console.log(data)
  },[])

  const handleDelete=(value)=>{
    // const updatedData = data.filter(data=>data.id != value.id)
    // setdata(updatedData)
    // if(value.amount > 0){
    //   setIncome(income-Number(value.amount))
    // }
    // else{
    //   setExpense(expense-Number(value.amount))
    // }
    const updatedData = data.filter(data=>data._id != value._id)
    fetch(`https://expense-tracker-1-o1qn.onrender.com/delete/${value._id}`,{
      method: 'DELETE'
    }).then((res)=>{
      setdata(updatedData)
    })
  }

  const handleEdit=(value)=>{
    // console.log(value)
    setEditData(value)
    setEdit(true)
  }

  useEffect(()=>{
    data.map((data,index)=>{
      if(data.amount > 0){
        setIncome((income)=>income+data.amount)
      }
      else{
        setExpense((expense)=>expense+data.amount)
      }
    })
  },[])
  return (
    <>
      <div>
        <h1>Expense Tracker</h1>
        <div className="income-expense-container">
          <div className="income">
            <div className="title">Income</div>
            <div>{income}</div>
          </div>
          <div className="block"></div>
          <div className="expense">
            <div className="title">Expense</div>
            <div>{expense}</div>
          </div>
        </div>
        <Form handleClick={
          (value)=>{
            if(edit){ 
              console.log(value)
              fetch(`https://expense-tracker-1-o1qn.onrender.com/edit/${value.id}`,{
                method: 'PATCH',
                headers: {
                  'content-type': 'application/json'
                },
                body: JSON.stringify({
                  amount: value.amount,
                  catagory:value.catagory,
                  date:value.date
                })
              })
              const update = data.map((data,index)=>{
                if(data._id === value.id){
                  data.catagory = value.catagory
                  data.amount = value.amount
                  data.date = value.date
                }
                return data
              })
              setdata(update)
              setEditData({})
              setEdit(false)  
            }
            else{
              // if(value.amount > 0){
              //   setIncome(income+Number(value.amount))
              // }
              // else{
              //   setExpense(expense+Number(value.amount))
              // }
              // let id = data[data.length-1].id + 1
              // setdata([...data,{...value,id}])
              console.log(value)
              fetch('https://expense-tracker-1-o1qn.onrender.com/add',{
                method: 'POST',
                headers: {
                  'content-type': 'application/json'
                },
                body: JSON.stringify({
                  amount: value.amount,
                  catagory:value.catagory,
                  date:value.date
                })
              }).then((res)=>{
                res.json().then((val)=>{
                  setdata([...data,value])
                  console.log(val)
                })
              })
            }
            }
        }  isEdit={edit} editData={editData} />
        {
          data.map((data,index)=>{
            return <Item data = {data} key={index} delete={(value)=>handleDelete(value)} edit={(value)=>handleEdit(value)} />
          })
        }
      </div>
    </>
  );
}

export default App;