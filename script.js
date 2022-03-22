  //Déclaration des constantes nécessaires au devoir:
  const LoupeCht = document.querySelector('#loader');
  const forSearch = document.querySelector('#search-form');
  const apiURL = 'https://api.lyrics.ovh';
  const submit = document.querySelector('input[type="submit"]');
  const lyrics = document.getElementById("lyrics");



   //Désactiver la loupe
   LoupeCht.style.display = 'none'; 

   //Ecoute de l'évènement de l'envoi du formulaire
   forSearch.addEventListener('submit', event =>  {

   //Désactivation de la redirection du formulaire 
   event.preventDefault(); 
   result.innerHTML = ''; 

   //activer le bouton:
    submit.disabled=true;
    lyrics.disabled=true; 
        
  
    //activer la loupe et supprimer 
    LoupeCht.style.display = 'initial';
    lyrics.style.display="none";        
     
     
    //Récupération des données envoyées.     
    const formData = new FormData(forSearch);
    const dataOfForm = Object.fromEntries(formData); 

    //console.log(dataOfForm pour test):
    console.log("artiste: "+ dataOfForm.artist.value);
    console.log("title: "+ dataOfForm.title.value);
    
    //condition si l'enregistrement dans le formulaire est nul:
    if(dataOfForm.artist === "" || dataOfForm.title === ""){
      result.innerHTML ="<strong>Please enter an artist and title please!</strong>";
      LoupeCht.style.display = 'none';
    }else {      
    //Afficher les données récupérées de l'API:
      getLyrics(dataOfForm.artist, dataOfForm.title)     
    }
    //Réactivation du bouton d'envoi:
    submit.disabled=false;

 });
    
    //fonction de récupération des données du formulaire et appel / réponse vers API:
    async function getLyrics(artist, songTitle) {
    const response = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await response.json();
    LoupeCht.style.display ="none";    
    more.innerHTML = '';

    //activer le bouton d'envoi et désactiver le texte:
    submit.disabled=false;
    lyrics.display="none";
    
    //Condition si les données du formulaire ne sont pas connues ou fausses:    
    if(data.lyrics===undefined){
    result.innerHTML = "<strong>The music you are looking for can't be found...</strong>";
    submit.disabled=false; 
    //Si non, afficher le résultat de l'API:
    }else{
      const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');   
    result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
    <span>${lyrics}</span>`;
    }
    //Reset du formulaire.
    forSearch.reset();
 };

       
    

     
     
    
    

    
