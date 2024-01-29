const checkOutButton = document.getElementById('checkOut-btn');

async function makeOrder(amount){
    try {
        const response = await axios({
            method: 'post',
            url: '/order',
            data: {
             amount
            },
            headers: {'X-Requested-With': 'XMLHttpRequest'},
          });
          
        //   console.log(response.data);
          const { order } = response.data;

          const options = {
            "key": "rzp_test_AwAILm1qNyGO98", // Enter the Key ID generated from the Dashboard
            "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "E-commerce",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": order.id , //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": "http://localhost:5000/payment-verify",
            // "prefill": {
            //     "name": "Gaurav Kumar",
            //     "email": "gaurav.kumar@example.com",
            //     "contact": "9000090000"
            // },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        const rzp1 = new Razorpay(options);
            rzp1.open();
    } 
    catch (error) {
        // console.log(error);
        window.location.replace('/login');
    }
}

checkOutButton.addEventListener('click', (e)=>{
    const amount = document.querySelector('#totalAmount').innerText.split(' ').pop();
    makeOrder(amount);
})