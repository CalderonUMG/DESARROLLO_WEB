import './NewsCard.scss';

interface NewsCardProps {
  title: string;
  subtitle: string;
  image?: string;
  important?: boolean;
}

const NewsCard = ({ title, subtitle, image, important }: NewsCardProps) => {
  return (
    <div className={`news-card ${important ? 'important' : ''}`}>
      <h3>{title}</h3>
      <p>{subtitle}</p>
      {image && <img src={image} alt={title} />}
      <button>Ver más →</button>
    </div>
  );
};

export default NewsCard;
