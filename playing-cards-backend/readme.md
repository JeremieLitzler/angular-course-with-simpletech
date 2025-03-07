# Playing Card Backend

Ce backend delivre un API simple d'authentification. Attention à ne pas l'utiliser en production. Cette API sert uniquement d'example afin d'illustrer la vidéo Youtube sur l'intégration d'une API de login dans Angular.

## Prérequis

Avant d'utiliser cette API il faudra que vous ayez Python3, pip et virtualenv installé sur votre machine. Sous Ubuntu vous pouvez les installer dans le terminal de la manière suivante:

`sudo apt update`

`sudo apt install python3 python3-pi`

`pip install virtualenv`

## Création et activation d'un environment virtuel avec virtualenv 

Maintenant vous devez créer un environment virtuel et l'activer. Pour cela tapez les commandes suivantes dans votre terminal:

`cd /le/dossier/ou/vous/avez/telecharge/ce/projet`

`virtualenv .venv`

`source .venv/bin/activate`

## Installation des dépendances

`pip install -r requirements.txt`

## Initialisation de la DB Création d'un administrateur qui pourra se connecter via l'API

Tapez la commande suivante et suivez les instructions à l'écran:

`./manage.py migrate`

`./manage.py createsuperuser`

Si manage.py n'est pas executable, changez les droits du fichier et rééssayez:

`chmod a+x manage.py`

`./manage.py migrate`

`./manage.py createsuperuser`

## Executer le serveur

`./manage.py runserver 0.0.0.0:8000`


## Voir le swagger et tester le server

Vous pouvez vous rendre à la page suivante pour voir le swagger:

http://localhost:8000/api/swagger-ui/

et pour accéder à l'interface d'administration de Django:

http://localhost:8000/admin 

vous devrez utiliser l'utilisateur créé plus haut pour vous connecter.

