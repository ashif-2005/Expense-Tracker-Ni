import React from "react";

const Item = (props) => {
  return (
    <>
        <div className="expense-item-container">
            <div className={`expense-item ${props.data.amount>0?"positive":"negative"}`}>
                <div>{props.data.catagory}</div>
                <div>{props.data.amount}</div>
              </div>
            <button onClick={()=>{
              props.delete(props.data)
            }} className="delete-btn">delete</button>
            <button onClick={()=>{
              props.edit(props.data)
            }} className="delete-btn">edit</button>
        </div>
    </>
  );
};

export default Item