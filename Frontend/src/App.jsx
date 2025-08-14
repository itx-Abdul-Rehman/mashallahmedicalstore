import React, { useState } from 'react';
import MedicineCard from './components/MedicineCard';
import Navbar from './components/Navbar';
import { Search } from 'lucide-react';
import SearchBar from './components/SearchBar';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';

const medicines = [
  {
    name: "Panadol",
    description: "A painkiller and fever reducer, used for mild aches, headaches, and flu symptoms.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Panadol_tablets.jpg/640px-Panadol_tablets.jpg"
  },
  {
    name: "Dicloran",
    description: "Diclofenac Sodium-based analgesic, used for pain relief and inflammation.",
    image: "https://www.sehat.com.pk/wp-content/uploads/2020/06/dicloran.jpg"
  },
  {
    name: "Nuberol Forte",
    description: "Combination of Orphenadrine and Paracetamol for muscle pain and tension.",
    image: "https://www.sehat.com.pk/wp-content/uploads/2020/06/nuberol-forte.jpg"
  },
  {
    name: "Myolax",
    description: "Muscle relaxant for spasms and strains, containing Thiocolchicoside.",
    image: "https://medex.com.pk/images/medicines/myolax.jpg"
  },
  {
    name: "Azomax",
    description: "Azithromycin antibiotic used for treating bacterial infections.",
    image: "https://www.sehat.com.pk/wp-content/uploads/2020/06/azomax.jpg"
  },
];


function App() {
 

  return (
    <div className="min-h-screen animated-bg bg-gradient-to-br from-blue-200 via-green-200 to-yellow-100 p-6">
  <Navbar />
  <SearchBar />
  <main className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
    {medicines.map((med, idx) => (
      <MedicineCard
        key={idx}
        name={med.name}
        image={med.image}
        description={med.description}
      />
    ))}
  </main>
  <AboutUs />
  <Footer />
</div>

  );
}

export default App;