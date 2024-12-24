import "./styles.css";
import { IBook, IGenre } from "./types/types/data";
import { genres } from "./data";
import Collection from "a-local-database";

const myCollection = new Collection();
if (!myCollection.get<IBook[]>("books")) {
  myCollection.set({ books: [] });
}

const genreItemTemplate = document.querySelector<HTMLTemplateElement>(
  "#genre-item-template"
);

function resetActive() {
  const buttons =
    document.querySelectorAll<HTMLButtonElement>(".todo-item-button");
  buttons.forEach((item) => {
    item.classList.remove("active");
  });
}

const genreList = document.querySelector<HTMLUListElement>(".genre-list");
const form = document.querySelector<HTMLFormElement>(".add-book-form");
function renderGenreList(item: IGenre) {
  let genre = genreItemTemplate.content.firstElementChild.cloneNode(
    true
  ) as HTMLLIElement;

  const genreButton =
    genre.querySelector<HTMLButtonElement>(".todo-item-button");
  genreButton.textContent = item.name;
  if (item.active) genreButton.classList.add("active");

  return genre;
}

genres.forEach((item) => {
  let genre = renderGenreList(item);
  genreList.append(genre);
});

const bookItemTemplate = document.querySelector<HTMLTemplateElement>(
  "#book-item-template"
);

const booksList = document.querySelector<HTMLUListElement>(".book-list");
function renderBookList(item: IBook) {
  let book = bookItemTemplate.content.firstElementChild.cloneNode(
    true
  ) as HTMLLIElement;
  const bookName = book.querySelector<HTMLHeadingElement>(".book-name");
  const genre = book.querySelector<HTMLParagraphElement>(".genre");
  const author = book.querySelector<HTMLParagraphElement>(".author");
  bookName.textContent = item.name;
  author.textContent = item.author;
  genre.textContent = item.genre;
  return book;
}

function renderBooks(arrBooks: IBook[]) {
  arrBooks.forEach((item) => {
    let book = renderBookList(item);
    booksList.append(book);
  });
}

renderBooks(myCollection.get<IBook[]>("books"));

function renderOptions() {
  const genreSelect = document.querySelector<HTMLSelectElement>("select");
  genres.forEach((item) => {
    if (item.id !== "all") {
      const option = document.createElement("option");
      option.value = item.name;
      option.textContent = item.name;
      genreSelect.append(option);
    }
  });
}

renderOptions();

function addBook(name: string, author: string, genre: string) {
  const booksBase = myCollection.get<IBook[]>("books");
  const newId = Math.max(0, ...booksBase.map((item) => item.id)) + 1;
  const newBook = renderBookList({ id: newId, name, author, genre });
  booksBase.push({ id: newId, name, author, genre });
  myCollection.set({ books: booksBase });
  booksList.append(newBook);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get("bookName") as string;

  const author = formData.get("author") as string;
  const genre = formData.get("genre") as string;
  addBook(name, author, genre);
  form.reset();
});

genreList.addEventListener("click", (event) => {
  if (event.target instanceof HTMLButtonElement) {
    const genre = event.target.textContent;

    resetActive();

    event.target.classList.add("active");

    booksList.innerHTML = "";
    if (genre === "Все жанры") {
      renderBooks(myCollection.get<IBook[]>("books"));
    }

    renderBooks(
      myCollection.get<IBook[]>("books").filter((item) => item.genre === genre)
    );
  }
});
