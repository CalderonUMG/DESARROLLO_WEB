import Navbar from '../../components/Navbar/Navbar';
import NewsCard from '../../components/NewsCard/NewsCard';
import './Home.scss';

const Home = () => {
  return (
    <section className="home">
      <h2>NOTICIAS RELEVANTES</h2>
      <div className="news-container">
        <NewsCard
          title="CIG INFORMA"
          subtitle="1° Feria del Empleo"
          important
        />
        <NewsCard
          title="#CIGINFORMA"
          subtitle="Convocatoria Asamblea General Extraordinaria"
        />
        <NewsCard
          title="CIG"
          subtitle="Calculadora de Timbres"
        />
      </div>
    </section>
  );
};

export default Home;
