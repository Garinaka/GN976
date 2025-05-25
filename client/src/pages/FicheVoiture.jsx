import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function FicheVoiture() {
  const { id } = useParams();
  const [voiture, setVoiture] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/voitures/${id}`)
      .then((res) => setVoiture(res.data))
      .catch((err) => console.error('Erreur chargement voiture', err));
  }, [id]);

  if (!voiture) return <p>Chargement...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{voiture.marque} {voiture.modele}</h2>

      {voiture.images?.length > 0 && (
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          style={{ width: '100%', maxWidth: '600px', marginBottom: '2rem' }}
        >
          {voiture.images.map((url, index) => (
            <SwiperSlide key={index}>
              <img
                src={url}
                alt={`img-${index}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  objectFit: 'cover',
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <p><strong>Localisation :</strong> {voiture.localisation}</p>
      <p><strong>Année :</strong> {voiture.annee}</p>
      <p><strong>Catégorie :</strong> {voiture.categorie}</p>
      <p><strong>Valeur estimée :</strong> {voiture.valeur} €</p>
      <p><strong>Tarif :</strong> {voiture.tarif} € / jour</p>
    </div>
  );
}

export default FicheVoiture;
