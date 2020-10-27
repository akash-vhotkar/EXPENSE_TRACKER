const btn = document.querySelector('.btn');
btn.addEventListener('click', () => {
    const text = document.querySelector('.mytext').value;
    const amount = document.querySelector('.myamount').value;
    const totalamount = document.querySelector('.totalbalance');
    const totalincome = document.querySelector('.totalincome');
    const totalexpense = document.querySelector('.totalexpense');


    var ta = parseInt(totalamount.textContent);
    var ti = parseInt(totalincome.textContent);
    var te = parseInt(totalexpense.textContent);

    const div = document.createElement('div');
    const maindiv = document.querySelector('.history');
    if (amount < 0) {
        div.innerHTML = `
        <p>${text}</p>
        <div class ="indiv" style ="display:flex"><p>-RS ${Math.abs(amount)}</p>  <span onclick="removerow(this)">
        <i class="fa fa-times" style="padding-left:20px"></i>
   </span></div>`
        div.style.borderRight = '6px solid red'
        totalamount.innerHTML = parseInt(ta - Math.abs(amount)) + '.00';
        totalexpense.innerHTML = parseInt(te + Math.abs(amount)) + '.00';

    }
    else {
        div.innerHTML = `
        <p>${text}</p>
        <div class ="indiv" style ="display:flex"><p>RS ${amount}</p>  <span onclick="removerow(this)">
        <i class="fa fa-times" style="padding-left:20px"></i>
   </span></div>`
        div.style.borderRight = '6px solid gold'
        totalamount.innerHTML = ta + parseInt(amount) + '.00';
        totalincome.innerHTML = ti + parseInt(amount) + '.00';

    }
    div.classList.add('stylediv');
    maindiv.appendChild(div);


})

function removerow(e) {
    e.parentElement.parentElement.remove();
}
