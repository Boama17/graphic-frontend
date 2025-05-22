import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Books from './pages/books'
import Branches from './pages/branches';
import Events from './pages/events.tsx'
import Gallery from './pages/gallery'
import Testimony from './pages/testimony'
import Layout from './components/layout';
import TeamMembers from './pages/team';
import SignInPage from './(auth)/sign-in/page.tsx'
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
function App() {
    return (
        <>
            <Router>
                <AuthProvider>
                <Routes>
                    <Route path="/sign-in" element={<SignInPage/>}/>
                    <Route path="/*" element={

                        <Layout>
                            <PrivateRoute>
                            <Routes>
                                <Route path="/" element={<Events/>}/>
                                <Route path="/events" element={<Events/>}/>
                                <Route path="/testimony" element={<Testimony/>}/>
                                <Route path="/branches" element={<Branches/>}/>
                                <Route path="/gallery" element={<Gallery/>}/>
                                <Route path="/books" element={<Books/>}/>
                                <Route path="/team" element={<TeamMembers/>}/>
                            </Routes>
                            </PrivateRoute>
                        </Layout>

                    }/>
                </Routes>
                    </AuthProvider>
            </Router>
        </>
    );
}

export default App;