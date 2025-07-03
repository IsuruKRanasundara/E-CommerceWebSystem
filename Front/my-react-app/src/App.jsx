import React from "react";
import './App.css'

import ModernNavbar from "./component/navBar.jsx";
import MainNavRoute from "./routes/routes.jsx";
function App() {

  return (
      <>



                    <header>
                        <ModernNavbar/>
                    </header>
                   <section>
                       <MainNavRoute/>
                   </section>

            </>
          )
          }

          export default App
