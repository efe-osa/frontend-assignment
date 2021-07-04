import React, { useState } from "react";
import logo from "../images/logo.svg";
import search from "../images/search.svg";
import Movies from "./Movies";
import styles from "./App.module.css";

const App = () => {
  const [searchItem, setSearchItem] = useState("");

  function handleSearchInput({ target: { value } }) {
    setSearchItem(value);
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <img src={logo} alt="Timescale" />
        <label htmlFor="search" className={styles.label}>
          <img src={search} alt="search" className={styles.searchIcon} />
          <input
            data-testid="search"
            value={searchItem}
            id="search"
            name="search"
            placeholder="Search for a movie"
            type="search"
            onChange={handleSearchInput}
            className={styles.input}
          />
        </label>
      </header>
        <Movies searchItem={searchItem} />
    </main>
  );
};

export default App;
