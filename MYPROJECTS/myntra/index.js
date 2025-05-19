let bagitems;
onlode();
function onlode(){
	let bagitemstr=localStorage.getItem('bagitems');
	bagitems=bagitemstr?JSON.parse(bagitemstr):[];
	displayitemsonhomepage();
	displaybagitemcount();
}

function addtobag(itemid){
	bagitems.push(itemid);
	localStorage.setItem('bagitems',JSON.stringify(bagitems));
	displaybagitemcount();
}

function displaybagitemcount(){

	let bagitemcount=document.querySelector('.bag-item-count');

	if (bagitems.length > 0){
		bagitemcount.style.visibility='visible';
		bagitemcount.innerText=bagitems.length;
	}else{
		bagitemcount.style.visibility='hidden';	
	}
	
}

function displayitemsonhomepage(){
	let itemContainerElement=document.querySelector('.items-container');

	let innerHtml='';
	items.forEach(item =>{
		innerHtml +=`<div class="item-container">
		<img class="item-image" src="${item.item_image}" alt="item mimage" >
		<div class="rating">
		${item.ratings.stars}|${item.ratings.noreviwe}
		</div>
		<div class="company-name">${item.company_name}</div>
		<div class="item-name">${item.item_name}</div>
		<div class="price">
		<span class="current-price">${item.current_price}</span>
		<span class="orignal-price">${item.orignal_price}</span>
		<span class="classdiscount">(${item.discount_percentage}%OF)</span>

		</div>
		<button class="add-to-bag" onclick="addtobag(${item.id})">AddToBag</button>

		</div>`
	});

	itemContainerElement.innerHTML=innerHtml;
}

