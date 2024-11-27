class Utilisateur {
    constructor(nom, publications = [], groupes = []) {
        this.nom = nom;
        this.publications = publications;
        this.groupes = groupes;
    }
    publier(contenu){
        try{
            if(!contenu){
                throw new Error("Erreur : Impossible Publier. Contenu vide");
            }
            if(contenu.includes("fck") || contenu.includes("fcked")){
                throw new Error("Erreur : Contenu inapproprié détecté.");
            }
            if(typeof contenu === "string"){
                let publication = new Publication(this.nom,contenu);
                this.publications.push(publication);
                console.log(`${this.nom} a publié : ${contenu}`);
            }
        }catch(err){
            console.error(err.message);
        }
    }
    rejoindreGroupe(groupe){
        try{
            if(groupe.membres.includes(this.nom)){
                throw new Error(`Ajout de Membre Echoue Pour ${groupe.nom} : Cet utilisateur est dejá membre du groupe`);
            } else {
                this.groupes += groupe.nom;
            }
        }catch(err){
            console.error(err.message);
        }
    }
}

class Publication {
    constructor(auteur, contenu, commentaires = []) {
        this.auteur = auteur;
        this.contenu = contenu;
        this.commentaires = commentaires;
    }
    ajouterCommentaire(commentaire){
        try{
            if(!commentaire.contenu){
                throw new Error("No content in comment");
            } else {
                this.commentaires.push(commentaire);
                console.log(`Le ${commentaire.auteur} à commenté : ${commentaire.contenu}`);
            }
        }catch(err){
            console.error(err.message);
        }
    }
}

class Commentaire {
    constructor(auteur, contenu) {
        this.auteur = auteur;
        this.contenu = contenu;
    }
}

class Groupe {
    constructor(nom, membres = [], estPrive){
        this.nom = nom;
        this.membres = membres;
        this.estPrive = estPrive;
    }
    ajouterMembre(user){
        try{
            if(!user){
                throw new Error("No user selected");
            }
            if(user.groupes.includes(this.nom)){
                throw new Error(`Ajout de Membre Echoue Pour ${objet.nom} : Cet utilisateur est dejá membre du groupe`);
            } else {
                this.membres += user.nom;
            }
        }catch(err){
            console.error(err.message);
        }
    }
    afficherContenu(user){
        try{
            if(!user){
                throw new Error("No user selected");
            }
            if(!this.membres.includes(user.nom) && this.estPrive === true){
                throw new Error("Erreur : Vous n'avez pas accès à ce groupe.");
            } else {
                console.log("Showing the group now...")
            }
        }catch(err){
            console.error(err.message);
        }
    }
}

try {
    //! Creation d'utilisateurs
    const utilisateur1 = new Utilisateur("Alice");
    const utilisateur2 = new Utilisateur("Bob");
    const amandine38 = new Utilisateur("Amandine du 38");
    //! Création de groupes
    const groupePublic = new Groupe("Voyageurs", false);
    const groupePrivé = new Groupe("Investisseurs", true);

    //! Scénario FAIL : on essaie d'afficher  le contenu d'un groupe privé à Charlie
    // Mais charlie n'est pas membre de ce groupe donc erreur
    const justiceLeague = new Groupe("La Justice League", true);
    const charlie = new Utilisateur("Charlie");
    justiceLeague.afficherContenu(charlie); // Cela devrait déclencher l'erreur on affiche pas le contenu privé à charlie

    //! Scénario FAIL : Amandine est dans un groupe privé 
    // Mais elle essaie quand meme de rejoindre ce groupe donc erreur 
    // vous etes déjà dans ce groupe (ca évite les doublons)
    groupePrivé.ajouterMembre(amandine38);
    amandine38.rejoindreGroupe(groupePrivé);

    utilisateur1.rejoindreGroupe(groupePublic);
    utilisateur2.rejoindreGroupe(groupePrivé);

    const publication = utilisateur1.publier("Bienvenue  dans mon réseau social !");
    const publicationInvalide = utilisateur2.publier("Bienvenue  dans mon réseau social fcked!");
    if (publication) {
        console.log(`${utilisateur1.nom} a publié : "${publication.contenu}"`);
    }
    if (publicationInvalide) {
        console.log(`${utilisateur1.nom} a publié : "${publication.contenu}"`);
    }

    const commentaireValide = new Commentaire(utilisateur2, "Super publication !");
    if (publication) publication.ajouterCommentaire(commentaireValide);

    const commentaireInsultant = new Commentaire(utilisateur2, "C'est stupide !");
    if (publication) publication.ajouterCommentaire(commentaireInsultant);
} catch (error) {
    console.error(`Erreur globale : ${error.message}`);
}