const  searchInputv=document.getElementById('searchInput');
const  searchbutton=document.getElementById('searchButton');
const  resultcontainer=document.getElementById('result-container');
const  wordtit=document.getElementById('wordtitle');
const  worDdescription=document.getElementById('worddescription');
const  audioButtons=document.getElementById('audioButton');

searchbutton.addEventListener("click",()=>{
search();
});

searchInputv.addEventListener("keyup",(event)=>{
	if(event.key==="Enter"){
		search();
	}
});

function search(){

	const searchterm=searchInputv.value.trim();
	if(searchterm===''){
		alert('plear enter the word to search');
		return;
	}
	fetchdictionarydata(searchterm);
}
async function fetchdictionarydata(searchterm){
	try{

       const response=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchterm}`);
       if(!response.ok){
          throw new Error('failde to featch bhai');
       }
       const data =await response.json();
       display(data);
       
	}catch(error){
		console.log(error);
		alert('an error')
	}
}

function display(data){
resultcontainer.style.display='block';
const wordData=data[0]
wordtit.textContent=wordData.word;
worDdescription.innerHTML=`
<ul>
${wordData.meanings.map(meaning=>`
	<li>
	   <p><strong>part of speech:</strong>${meaning.partOfSpeech}</p>
	   <p><strong>defination:</strong>${meaning.definitions[0].definition}</p>

	</li>

	`).join('\n')}

</ul>

`;

}
audioButtons.addEventListener("click",()=>{

	const searchterm=searchInputv.value.trim();
	if(searchterm===''){
		alert('Please enter the word');
		return;
	}
	speak(searchterm);
});

function speak(word){

	const speech=new SpeechSynthesisUtterance(word);
	speech.lan='hi-IN';
	speech.volume=2;
	speech.rate=1;
	speech.pitch=1;
	window.speechSynthesis.speak(speech);
}