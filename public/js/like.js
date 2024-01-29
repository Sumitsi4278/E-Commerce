async function likeButton(productId, btn){
   try {
    const response = await axios({
        method: 'post',
        url: `/API/V1/products/${productId}/like`,
        // url: `http://localhost:5000/API/V1/products/${productId}/like`,
        headers: {'X-Requested-With': 'XMLHttpRequest'},
      });

      if(btn.classList.contains('far')){
        btn.classList.add('fas');
        btn.classList.remove('far');
      }
      else{
        btn.classList.add('far');
        btn.classList.remove('fas');
      }
    //   console.log(response); 
   } 
   catch (e) {
    console.log(e);
    window.location.replace('/login');
   }
}



window.document.addEventListener('click', (e)=>{
    const btn = e.target;
    if(btn.classList.contains('product-like-button')){
        const productId = btn.getAttribute('product-id');
        likeButton(productId, btn);
    }
})