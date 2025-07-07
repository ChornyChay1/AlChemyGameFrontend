import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../css/common/common-app.css';
import GreetingsMain from "./GreetingsPage/GreetingsMain";
import HelpPage from "./Letters/HelpPage";
import Registration from "./RegistrationEnter/Registration";
import Enter from "./RegistrationEnter/Enter";
import LetterPage from "./Letters/LetterPage";
import HistoryBook from "./Letters/HistoryBook";
import Profile from "./Profile/Profile";
import Rating from "./Rating/Rating";
import Theory from "./Theory/Theory";
import Progress from "./Progress/Progress";
import Adventure from "./Adventure/Adventure";
import Topic from "./Topic/Topic";
import DonePage from "./Letters/DonePage";


function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* eslint-disable-next-line react/jsx-pascal-case */}
                    {/* eslint-disable-next-line react/jsx-pascal-case */}
                    {/*<Route path="/person_cabinet" element={<PersonCabinetMain />} />*/}
                    <Route path="/" element={<GreetingsMain />} />
                    <Route path="/help" element={<HelpPage />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/enter" element={<Enter />} />
                    <Route path="/history" element={<HistoryBook />} />
                    <Route path="/letter" element={<LetterPage />} />
                    <Route path="/profile" element={< Profile/>} />
                    <Route path="/rating" element={< Rating/>} />
                    <Route path="/theory" element={< Theory/>} />
                    <Route path="/progress" element={< Progress/>} />
                    <Route path="/adventure" element={< Adventure/>} />
                    <Route path="/adventure/topic" element={< Topic/>} />
                    <Route path="/adventure/done" element={< DonePage/>} />



                </Routes>
            </div>
        </Router>
    );
}



export default App;
