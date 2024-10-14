import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "./firebaseConfig"; // Firebase yapılandırmasını içe aktar
import "./App.css";
import { FaTimes, FaSun, FaMoon  } from "react-icons/fa"; // FaTimes ve FaRegStar, Font Awesome'dan "X" ve boş yıldız ikonları
import { TiTick } from "react-icons/ti";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [companies, setCompanies] = useState([]);

  // Firebase'den şirket isimlerini al
  useEffect(() => {
    const companiesRef = ref(database, "companies");
    onValue(companiesRef, (snapshot) => {
      const data = snapshot.val();
      // Firebase'den gelen veriyi uygun formatta ayarlama
      const companyList = data ? Object.values(data) : [];
      setCompanies(companyList);
    });
  }, []);

  // Arama çubuğundaki değere göre listeyi filtrele
  const filteredCompanies = companies.filter((company) =>
    company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tema değişim durumu ve localStorage'dan alma
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedTheme);
    if (savedTheme) {
      document.body.classList.add("dark-mode");
    }
  }, []);

  // Tema değiştirme fonksiyonu
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.body.classList.toggle("dark-mode", newDarkMode);
    localStorage.setItem("darkMode", newDarkMode); // Temayı localStorage'a kaydet
  };

  return (
    <>
      <div className="title-container">
        <button
          onClick={toggleDarkMode}
          className="theme-toggle-button"
          style={{ visibility: "hidden" }}
        >
          {darkMode ? (
            <FaSun className="theme-icon" />
          ) : (
            <FaMoon className="theme-icon" />
          )}
        </button>
        <h1>Olumsuz İş başvurularına yanıt vermeyen şirketler listesi</h1>

        <button onClick={toggleDarkMode} className="theme-toggle-button">
          {darkMode ? (
            <FaSun className="theme-icon" />
          ) : (
            <FaMoon className="theme-icon" />
          )}
        </button>
      </div>
      <div className="title-container">
        <input
          type="text"
          placeholder="Şirket Ara Örn: Microsoft, Yemeksepeti, Getir..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      {/* Tema değiştirme butonu */}

      {/* Filtrelenmiş liste */}
      <div className="companies-container">
        {filteredCompanies.length > 0 ? (
          filteredCompanies.map((company, index) => (
            <div key={index} className="company-container">
              <FaTimes className="times-icon" />
              <span>{company}</span>
            </div>
          ))
        ) : (
          <div className="company-container">
            <TiTick className="tick-icon" />
            <span>
              Aradığınız Firma Veritabanımızda yok! Muhtemelen dönüş
              yapabiliyordur.
            </span>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
