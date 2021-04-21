import '../styles/index.scss'
import React from 'react'
import Recipes from './Recipes'

function App() {
    return (
        <div>
            <section className="hero"></section>
            <main>
                <section>
                    <h1>Oh Hero, React.</h1>
                </section>
            </main>
            <Recipes />
        </div>
    )
}

export default App
