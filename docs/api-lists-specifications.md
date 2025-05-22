# API Endpoints Specifications

## Listes

### `GET /lists`

Retourne le tableau des **Listes**, triées par `position` croissante.

#### Success (200)

```json
[{
  "id": 1,
  "name": "XXXXXX",
  "position": 1,
  "created_at": "XXXX",
  "updated_at": "XXXX"
}, {
  "id": 2,
  "name": "XXXXXX",
  "position": 2,
  "created_at": "XXXX",
  "updated_at": "XXXX"
}]
```

#### Errors

| Code  | Body                                                              | Reason                                    |
|-------|-------------------------------------------------------------------|-------------------------------------------|
| `500` | `{ "error": "Unexpected server error. Please try again later." }` | Une erreur a lieu avec la base de données |

---

### `GET /lists/:id`

Retourne une **Liste** en fonction de son ID

#### Success (200)

```json
{
  "id": 1,
  "title": "XXXXXX",
  "position": 1,
  "created_at": "XXXX",
  "updated_at": "XXXX"
}
```

#### Errors

| Code  | Body                                                              | Reason                                                 |
|-------|-------------------------------------------------------------------|--------------------------------------------------------|
| `500` | `{ "error": "Unexpected server error. Please try again later." }` | Une erreur a lieu avec la base de données              |
| `404` | `{ "error": "List not found. Please verify the provided ID." }`   | L'ID passé en paramètre n'est pas présent dans la base |

---

### `POST /lists`

Crée et retourne une nouvelle **Liste**.

> **NOTE**
>
> - le paramètre `title` est obligatoire (`string`) :
> - le paramètre `position` est optionnel (`number`). Par défaut, la position de la nouvelle carte sera 1.

#### Requête

- en-tête (_headers_) : `Content-Type: application/json`
- corps (_body_) :

  ```json
  {
    "title": "Nom de la liste",
    "position": 3
  }
  ```

#### Success (201)

```json
{
  "id": 1,
  "title": "Nom de la liste",
  "position": 3,
  "created_at": "XXXX",
  "updated_at": "XXXX"
}
```

#### Errors

| Code  | Body                                                              | Reason                                                    |
|-------|-------------------------------------------------------------------|-----------------------------------------------------------|
| `500` | `{ "error": "Unexpected server error. Please try again later." }` | Une erreur a lieu avec la base de données                 |
| `400` | `{ "error": "Missing body parameter: 'title'." }`                 | Le paramètre `title` est absent de la requête             |
| `400` | `{ "error": "Invalid type: 'position' should be a number." }`     | Le paramètre `position` fourni n'est pas un nombre entier |

---

### `PATCH /lists/:id`

Modifie partiellement la liste dont l'ID est précisé dans le chemin, et renvoie la ressource.

> **NOTE**
>
> - paramètres possibles pour le corps de la requête : `title` (`string`) ET/OU `position` (`number`) ;
> - la date de modification `updated_at` doit être modifiée.

#### Requête

- en-tête (_headers_) : `Content-Type: application/json`
- corps (_body_) :

  ```json
  {
    "title": "Nouveau titre pour la liste"
  }
  ```

#### Success (200)

```json
{
  "id": 3,
  "name": "Nouveau titre pour la liste",
  "position": 3,
  "created_at": "XXXX",
  "updated_at": "XXXX"
}
```

> **NOTE** dans la norme HTTP, une requête [PATCH](https://developer.mozilla.org/fr/docs/Web/HTTP/Methods/PATCH) n'a normalement pas de _response body_.
> Le statut de la réponse est normalement `204 (No content)`. Ici on « simplifie » pour s'éviter une requête complémentaire la semaine prochaine.
> Ce n'est pas la première ni la dernière fois que vous verrez des libertés prises vis-à-vis de la norme REST.

#### Errors

| Code  | Body                                                              | Reason                                                                        |
|-------|-------------------------------------------------------------------|-------------------------------------------------------------------------------|
| `500` | `{ "error": "Unexpected server error. Please try again later." }` | Une erreur a lieu avec la base de données                                     |
| `404` | `{ "error": "List not found. Please verify the provided ID." }`   | L'ID passé en paramètre n'est pas présent dans la base                        |
| `400` | `{ "error": "Invalid type: 'title' should be a string." }`        | Le paramètre `title` fourni n'est pas une chaine de caractères valide         |
| `400` | `{ "error": "Invalid type: 'position' should be a number." }`     | Le paramètre `position` fourni n'est pas un nombre entier                     |
| `400` | `{ "error": "Invalid body: should provide at least a 'title' or a 'position' property." }` | Le corps de la requête n'est pas précisé ou est vide |

---

### `DELETE /lists/:id`

Supprime la **Liste** et toutes les cartes associées à celle-ci.

> **NOTE** la réponse n'a pas de corps.

#### Success (204)

Pas de corps (_NO CONTENT_).

#### Errors

| Code  | Body                                                              | Reason                                                 |
|-------|-------------------------------------------------------------------|--------------------------------------------------------|
| `500` | `{ "error": "Unexpected server error. Please try again later." }` | Une erreur a lieu avec la base de données              |
| `404` | `{ "error": "List not found. Please verify the provided ID." }`   | L'ID passé en paramètre n'est pas présent dans la base |
