# HOMEPOINT

Homepoint est une application web imaginé par l’entreprise de services du numérique Onepoint. 

## L'équipe

Cette application a été développée par Marina, Aniya, Kandane et Cédric
lors de leur formation à la Wild code school Bordeaux

## Presentation

L’objectif est d’améliorer la gestion des collaborateurs lors de la répartition des missions.
L’application calcule pour chaque personne, la durée de trajet entre leur domicile et le client en fonction de leur moyen de transport privilégié. 
De plus elle tient compte du trafic.
Elle permet également de gérer la disponibilité et les compétences de chaque collaborateurs 

tech utilisées: 
		HTML5, CSS3
		JavaScript, ReactJS
		Node, Mysql
        
## Installation :

- Dezipper le fichier dans le dossier de travail
- installer la base de donnée db_hompoint
- npm install dans les deux dossiers « /back » et « /front »
- nom start dans les deux dossiers « /back » et « /front »

## Quick start:

1 - Sélectionner un client dans la base de donnée ou saisir directement son adresse
2 - Sélectionner une compétence
3 - Lancer la recherche

Une liste de collaborateurs triés en fonction de leur disponibilité et de la durée de trajet domicile-client s’affichent. En cliquant sur les marqueurs de la carte, le détail de chaque collaborateur apparait.

Les pages de gestion permettent d’ajouter, de modifier et de supprimer les collaborateurs, clients, utilisateurs et compétences.


## Liste de bugs:

- entête des requêtes axios pour l’api google map
- possibilité d’ajouter plusieurs collaborateurs, compétences, utilisateurs et clients identiques en base de données
- si ajout (ou modification) d'un collaborateur sans la sélection d'au moins une compétnce, celui-ci n'apparaitra pas dans la liste. 


## Améliorations

- Création d’une page de connexion avec identifiant et mot de passe
- Gestion des mots de passe
- Affichage du menu d’administration en fonction du statut de l’utilisateur connecté
- Ajouter un scroll sur la liste de collaborateurs, page "gérer les collaborateurs"
- Gestion des erreurs dans le back-end

