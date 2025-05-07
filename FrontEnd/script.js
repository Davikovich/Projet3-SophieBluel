/*
Faites l’appel à l’API avec fetch afin de récupérer dynamiquement les projets de l’architecte.
Utilisez JavaScript pour ajouter à la galerie les travaux de l’architecte que vous avez récupéré.
Supprimez du HTML les travaux qui étaient présents. Il ne doit vous rester que le contenu que vous avez ajouté dynamiquement grâce à JavaScript.
*/

// variable globale
let works = [];
let categories = [];

/**
 * FONCTION ASYNCHRONE , RÉCUPÉRE LES WORKS DEPUIS L'API
 *
 * @returns{Promise} - promesse qui se résout avec les données JSON
 *
 */
const getWorks = async () => {
  const reponse = await fetch("http://localhost:5678/api/works");
  const works = await reponse.json(); // variable locale
  return works;
};

/**
 * Alimentation de la galerie avec les données issues de l'API
 */
const insertWorksInTheDom = (worksToInsert = works) => {
  console.log(worksToInsert); // affichage des données issues de l'API
  const gallery = document.querySelector(".gallery"); // récupération de l'élément du DOM avec la classe gallery
  gallery.innerHTML = ""; // on vide le contenu de la galerie

  // Boucle foreach pour ajouter dynamiquement les travaux de l'architecte au DOM (gallery)
  worksToInsert.forEach((work) => {
    console.log(work);
    // création structure DOM
    const figure = document.createElement("figure"); // création élément figure
    const img = document.createElement("img"); // création élément image
    const figcaption = document.createElement("figcaption"); // création élément figcaption

    // ajout des éléments enfants au DOM
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);

    // alimentation du DOM avec les données issues de l'API pour un Objet
    img.src = work.imageUrl;
    img.alt = work.title;
    figcaption.textContent = work.title;
  });
  // fin de la boucle foreach
  // console.log(gallery);
};

/**
 * FONCTION ASYNCHRONE , RÉCUPÉRE LES CATÉGORIES DEPUIS L'API
 *
 * @returns{Promise} - promesse qui se résout avec les données JSON
 *
 */
const getCategories = async () => {
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json(); // variable locale
  return categories;
};

const insertCategoriesInTheDom = () => {
  const filtersContainer = document.querySelector(".filters"); // Assurez-vous d'avoir un conteneur avec cette classe dans le HTML
  filtersContainer.innerHTML = ""; // Vider les anciens boutons si relancé

  const setActiveButton = (button) => {
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    button.classList.add("active");
  };

  // Ajouter un bouton "Tous"
  const allBtn = document.createElement("button");
  allBtn.textContent = "Tous";
  allBtn.classList.add("filter-btn");
  allBtn.addEventListener("click", () => {
    insertWorksInTheDom();
    setActiveButton(allBtn); // Affiche tous les travaux
  });
  filtersContainer.appendChild(allBtn);

  // Ajouter un bouton pour chaque catégorie
  categories.forEach((category) => {
    const btn = document.createElement("button");
    btn.textContent = category.name;
    btn.classList.add("filter-btn");

    btn.addEventListener("click", () => {
      const filteredWorks = works.filter(
        (work) => work.categoryId === category.id
      );
      insertWorksInTheDom(filteredWorks);
      setActiveButton(btn);
    });

    filtersContainer.appendChild(btn);
  });

  setActiveButton(allBtn);
};

(async () => {
  works = await getWorks();
  categories = await getCategories();
  insertWorksInTheDom();
  insertCategoriesInTheDom();
})();
