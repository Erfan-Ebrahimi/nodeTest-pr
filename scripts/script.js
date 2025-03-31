console.log("hello - world");

fetch('https://node-test-pr.vercel.app/api/users')
  .then(res => res.json())
  .then(data => console.log(data));


  const btnElem = document.getElementById("btnn");


  btnElem.addEventListener("click" , () => {
  
  const NameUser = String(prompt("enter name"));

  if(NameUser != ""){

      fetch('https://node-test-pr.vercel.app/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: NameUser })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            console.log(`کاربر با نام ${NameUser} اضافه شد`)
        });
    }
  })
