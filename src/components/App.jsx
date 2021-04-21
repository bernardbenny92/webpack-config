import '../styles/index.scss'
import React from 'react'
import Recipes from './Recipes'
import sword from "../images/swc-sword.png";

function App() {
    return (
        <div>
            <section className="hero"></section>
            <main>
                <section>
                    <h1>Oh Hero, React.</h1>
                    <img src={sword} alt="sword" width="250" />
                </section>
            </main>
            <Recipes />
        </div>
    )
}

export default App
