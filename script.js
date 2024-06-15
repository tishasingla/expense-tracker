const state={
    earnings:0,
    expense:0,
    net:0,
    transactions:[
        // {
        //     id:5,
        //     text:"Demo",
        //     amount:500,
        //     type:"credit",
        // },
        // {
        //     id:5,
        //     text:"Demo",
        //     amount:400,
        //     type:"debit",
        // }
    ]
}



const transactionFormEl=document.getElementById('transactionForm')
const renderTransactions=()=>{
    const transactionContainerEl=document.querySelector('.transactions')
    const netAmountEl=document.getElementById("netAmount")
    const earningEl=document.getElementById("earning")
    const expenseEl=document.getElementById("expense")
    const transactions=state.transactions
    let earning=0
    let expense=0
    let net=0
    transactionContainerEl.innerHTML=''
    transactions.forEach((transaction)=>{
        const{id,amount,text,type}=transaction
        const isCredit=type==="credit"?true:false
        const sign=isCredit?"+":"-"
        const transactionEl=
        `<div class="transaction" id="${id}">
        <div class="left">
          <p>${text}</p>
          <p>${sign}$${amount}</p>
        </div>
        <div class="status ${isCredit?"credit":"debit"}">${isCredit?"C":"D"}</div>
      </div>`
      earning+=isCredit?amount:0
      expense+=!isCredit?amount:0
      net=earning-expense
      transactionContainerEl.insertAdjacentHTML('afterbegin',transactionEl)//to add transaction above
      
    })
    netAmountEl.innerHTML=`$ ${net}`
      earningEl.innerHTML=`$ ${earning}`
      expenseEl.innerHTML=`$ ${expense}`
 
     
}
const addTransaction=(e)=>{
    e.preventDefault()//prevents the form submission
    const isEarn=e.submitter.id==='earnBtn'?true:false
    console.log(e.submitter.id)
    const formData=new FormData(transactionFormEl) //to access the form data
    const tData={}//will hold the data extracted from the 'FormData'
    formData.forEach((value,key)=>{
        tData[key]=value; //iterate over each entry in the 'formData' object.the 'key' parameter represents the na,e of the form field and the 'value' paramenter represents the corresponding value
        

    })
    const {text,amount}=tData
    const transaction={
        id:Math.floor(Math.random()*1000),
        text:text,
        amount:+amount,
        type:isEarn?"credit":"debit"
    }
    state.transactions.push(transaction)
    renderTransactions()
    transactionFormEl.reset();
    console.log(state)
    console.log({tData})

}
transactionFormEl.addEventListener('submit',addTransaction)